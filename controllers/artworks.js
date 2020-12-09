module.exports = function (app, models) {

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
        models.Artwork.findByPk(req.params.id, { include: [{ model: models.Inquiry }] }).then(artwork => {
            res.render('artworks-show', { artwork: artwork });
        }).catch((err) => {
            console.log(err.message);
        })
    });

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

    // DELETE
    app.delete('/artworks/:id', (req, res) => {
      models.Artwork.findByPk(req.params.id).then(artwork => {
        artwork.destroy();
        res.redirect(`/`);
      }).catch((err) => {
        console.log(err);
      });
    })
}
