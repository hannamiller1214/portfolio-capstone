module.exports = (app, models) => {

  // NEW
  app.get('/artworks/:artworkId/inquiries/new', (req, res) => {
    models.Artwork.findByPk(req.params.artworkId).then(artwork => {
      res.render('inquiries-new', { artwork: artwork });
    });
  });

  // CREATE
  app.post('/artworks/:artworkId/inquiries', (req, res) => {
    req.body.ArtworkId = req.params.artworkId;
    models.Inquiry.create(req.body).then(inquiry => {
      res.redirect(`/artworks/${req.params.artworkId}`);
    }).catch((err) => {
        console.log(err)
    });
  });

  // DELETE
  app.delete('/artworks/:artworkId/inquiries/:id', (req, res) => {
      models.Inquiry.findByPk(req.params.id).then(inquiry => {
          inquiry.destroy();
          res.redirect(`/artworks/${req.params.artworkId}`);
      }).catch((err) => {
          console.log(err);
      });
  });
}
