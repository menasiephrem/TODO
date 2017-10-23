// routes/todo_routes.js

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('todos').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });


 


app.post('/todos', (req, res) => {
    const note = { task: req.body.task, date: req.body.date , completetd: req.body.completed };
    db.collection('todos').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });


};
