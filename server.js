const express = require('express');
      mongoose = require('mongoose');
      morgan = require('morgan');
      bodyParser = require('body-parser');
      methodOverride = require('method-override');
      database = require('./config/database');

const app = express();

mongoose.connect(database.url);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
//app.use(methodOverride);

require('./app/routes')(app);

app.listen(8080);
console.log('App listening on port 8080');
