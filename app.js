const express = require('express')
const methodOverride = require('method-override')
const app = express()

const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyParser = require('body-parser');
const models = require('./db/models');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.engine('handlebars', exphbs({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(cookieParser());

app.use(function authenticateToken(req, res, next) {
  const token = req.cookies.pcJWT;

  if (token) {
    jwt.verify(token, "AUTH-SECRET", (err, user) => {
      if (err) {
        console.log(err)
        res.redirect('/login')
      }
      req.user = user
      next();
    })
  } else {
    next();
  }
});

app.use(function (req, res, next) {
  // console.log("lookingUpUser:", req.user);
  if (req.user) {
    // console.log("Req.User:", req.user);
    models.User.findByPk(req.user.id).then(currentUser => {
      // console.log("currentUser:", currentUser);
      res.locals.currentUser = currentUser;
      next();
    }).catch(err => {
      console.log(err);
    })
  } else {
    next();
  }
});

require('./controllers/artworks')(app, models);
require('./controllers/inquiries')(app, models);
require('./controllers/auth')(app, models);

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})
