const express = require('express');
      mongoose = require('mongoose');
      morgan = require('morgan');
      bodyParser = require('body-parser');
      methodOverride = require('method-override');

const app = express();

mongoose.connect('mongodb://todoangular:BlahBlah@ds157298.mlab.com:57298/todoangular');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
//app.use(methodOverride);

const Todo = mongoose.model('Todo', {
  text : String
});

app.get('/api/todos', (req,res) => {
  Todo.find((err, todos) => {
    if(err) {
      res.send(err);
    };
    res.json(todos);
  });
});

app.post('/api/todos', (req,res) => {
  Todo.create({
    text: req.body.text,
    done: false
  }, (err, todo) => {
    if(err) {
      res.send(err);
    };
    Todo.find((err, todos) => {
      if(err) {
        res.send(err);
      };
      res.json(todos);
    });
  });
});

app.delete('/api/todos/:todo_id', (req, res) => {
  Todo.remove({
    _id: req.params.todo_id
  }, (err, todo) => {
      if(err) {
        res.send(err);
      };
      Todo.find((err, todos) => {
        if(err) {
          res.send(err);
        }
        res.json(todos);
      });
  });
});

app.get('*', (req,res)=>{
  res.sendfile('./public/index.html');
});

app.listen(8080);
console.log('App listening on port 8080');
