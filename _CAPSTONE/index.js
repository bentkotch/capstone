const express = require('express')
const app = express()
const port = 80

var mysql = require('promise-mysql');

//var mysql = require('mysql');
//var con = mysql.createConnection({
//  user: "root",
//  password: "capstone",
//  database: "capstone"
//});

// Connect to server
//con.connect(function(err) {
//  if (err) throw err;
//  console.log("Connected to Server");
//});

app.use(express.static('public'))

// respond with json from maps table when a GET request is made to the /api/maps
//app.get('/api/maps', function (req, res) {
//  con.query("SELECT * FROM maps", function (err, result, fields) {
//    if (err) throw err;
//    console.log(result);
//    res.json(result);
//  });
//})

app.get('/api/maps/:map_id', function (req, res) {
  var connection;
  mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "capstone",
    database: "capstone"
  }).then(function(conn){
      connection = conn;
      var map = connection.query('SELECT * FROM maps WHERE map_id = ?', [req.params.map_id]);
      return map;
  //}).then(function(){
    //  var result = connection.query('SELECT * FROM data_points WHERE map_id = ?', [req.params.map_id]);
    //  connection.end();
    //  return result;
  }).then(function(rows){
      console.log("function(rows) result: ");
      console.log(rows);

      res.sendJson;
  }).catch(function(error){
      if (connection && connection.end) connection.end();
      //logs out the error
      console.log(error);
  });
})

//sets app to listen on port
app.listen(port, () => console.log(`Capstone app listening on port ${port}!`))
