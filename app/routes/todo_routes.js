// routes/todo_routes.js

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {



// GET /todos  => []  

 app.get('/todos', (req, res) => {
    const id = req.params.id;
    db.collection('todos').find().toArray( (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });
 
// GET /todos/:id  => {}  

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


// Post /todos  => {}  

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


//Deleted /todos  => {} 

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('todos').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('TODO ' + id + ' deleted!');
      } 
    });
  });


//Path /todos/:id =>id

app.patch('/todos/:id', function (req, res) {
    var updateObject = req.body; // {last_name : "smith", age: 44}
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('todos').update(details, {$set: updateObject}, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
       		db.collection('todos').findOne(details, (err, item) => {
      			if (err) {
       				 res.send({'error':'An error has occurred'});
      			} else {
        			res.send(item);
     			} 
    		});
      	} 
    });
});

};
