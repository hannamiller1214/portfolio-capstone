// Initialize express
const express = require('express')
const methodOverride = require('method-override')
const app = express()

// require handlebars
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyParser = require('body-parser');
const models = require('./db/models');

// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
// Use handlebars to render
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

// OUR MOCK ARRAY OF PROJECTS
var artworks = [
  { title: "I am your first artwork", desc: "A great artwork that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
  { title: "I am your second artwork", desc: "A great artwork that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
  { title: "I am your third artwork", desc: "A great artwork that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" }
]

// INDEX
app.get('/', (req, res) => {
  models.Artwork.findAll({ order: [['createdAt', 'DESC']] }).then(artworks => {
    res.render('artworks-index', { artworks: artworks });
  })
})

// NEW
app.get('/artworks/new', (req, res) => {
  res.render('artworks-new', {});
})

// CREATE
app.post('/artworks', (req, res) => {
  models.Artwork.create(req.body).then(artwork => {
    res.redirect(`/artworks/${artwork.id}`)
  }).catch((err) => {
    console.log(err)
  });
})

// SHOW
app.get('/artworks/:id', (req, res) => {
  models.Artwork.findByPk(req.params.id).then((artwork) => {
    res.render('artworks-show', { artwork: artwork })
  }).catch((err) => {
    console.log(err.message);
  })
})

// EDIT
app.get('/artworks/:id/edit', (req, res) => {
  models.Artwork.findByPk(req.params.id).then((artwork) => {
    res.render('artworks-edit', { artwork: artwork });
  }).catch((err) => {
    console.log(err.message);
  })
});

// UPDATE
app.put('/artworks/:id', (req, res) => {
  models.Artwork.findByPk(req.params.id).then(artwork => {
    artwork.update(req.body).then(artwork => {
      res.redirect(`/artworks/${req.params.id}`);
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
});

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})
