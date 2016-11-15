var express = require('express');
var router = express.Router();
var passport = require('passport');

var credentials;
try {
  credentials = require('../credentials');
} catch(err) {
  if(err.code === 'MODULE_NOT_FOUND'){
    credentials = {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
    };
  }
}

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

router.use(passport.initialize());

/* Serializes the login session to a cookie */
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: credentials.GOOGLE_CLIENT_ID,
    clientSecret: credentials.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/private/"
  },
  function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));

router.get('/',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'], failureRedirect: 'http://127.0.0.1:3000/' }),
  function(req, res) {
    req.session.user = { id: req.user.id, name: req.user.displayName };
  	res.send(`<h3>Hello ${req.user.displayName}</h3>`);
});

module.exports = router;
