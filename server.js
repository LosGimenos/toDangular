require('dotenv').config();

const port = process.env.PORT;
const sessionSecret = process.env.SESSION_SECRET;

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const database = require('./config/database');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(database.url);

require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ 'extended': 'true' }));
// app.use(bodyParser.json());
// app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.set('view engine', 'ejs');

app.use(session({ secret: sessionSecret,
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes')(app, passport);

app.listen(port);
console.log('App listening on ' + port);
