require('dotenv').config();

const express = require('express');
      port = process.env.PORT;
      sessionSecret = process.env.SESSION_SECRET;
      mongoose = require('mongoose');
      passport = require('passport');
      flash = require('connect-flash');
      morgan = require('morgan');
      cookieParser = require('cookie-parser');
      bodyParser = require('body-parser');
      session = require('express-session');
      methodOverride = require('method-override');
      database = require('./config/database');

const app = express();

mongoose.connect(database.url);

// require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.set('view engine', 'ejs');

app.use(session({ secret: sessionSecret, cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes')(app, passport);

app.listen(port);
console.log('App listening on ' + port);
