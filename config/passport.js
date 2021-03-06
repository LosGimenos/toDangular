const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/user');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallBack: true,
  },
  (password, email, done) => {
    process.nextTick(() => {
      User.findOne({ 'local.email': email }, (err, user) => {
        // console.log(arguments);
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        }
        const newUser = new User();
        newUser.local.email = email;
        newUser.local.password = newUser.generateHash(password);

        newUser.save(() => {
          if (err) {
            throw err;
          }
          return done(null, newUser);
        });
      });
    });
  }));
};

// module.exports = passportExport;
