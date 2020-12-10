const jwt = require('jsonwebtoken');

function generateJWT(user) {
  const pcJWT = jwt.sign({ id: user.id }, "AUTH-SECRET", { expiresIn: 60*60*24*60 });

  return pcJWT
};

module.exports = function (app, models) {
  // Sign Up GET
  app.get('/sign-up', (req, res) => {
    res.render('auth-signup', {});
  })

  // Login GET
  app.get('/login', (req, res) => {
    res.render('auth-login', {});
  })

  //Sign Up POST
  app.post('/sign-up', (req, res) => {
    models.User.create(req.body).then(user => {
      const pcJWT = generateJWT(user)
      console.log("Req.Body:", req.body);
      res.cookie("pcJWT", pcJWT)
      res.redirect('/');
    }).catch((err) => {
      console.log(err)
    });
  })

  //Login POST
  app.post('/login', (req, res, next) => {
    console.log(req.body)
    models.User.findOne({ where: { email: req.body.email } }).then(user => {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) {
          console.log(err);
        }
        if (!isMatch) {
          return res.redirect('/login');
        } else {
        const pcJWT = generateJWT(user);
        res.cookie("pcJWT", pcJWT)
        res.redirect('/')
        }
      })
    }).catch(err => {
      console.log(err);
      return res.redirect('/login');
    });
  });

  // LOGOUT
  app.get('/logout', (req, res, next) => {
    res.clearCookie('pcJWT');

    // req.session.sessionFlash = { type: 'success', message: 'Successfully logged out!' }
    return res.redirect('/');
  });
}
