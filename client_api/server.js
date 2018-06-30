const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/miru';

app.listen(3000, function() {
  console.log('listening on 3000')
});

app.get('/', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('miru');
    dbo.collection('history').find().toArray((err, result) => {
      res.send(JSON.stringify(result));
      db.close();
    });
  });
});