const Todo = require('./models/todo');

module.exports = function(app) {

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
}
