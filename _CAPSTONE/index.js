const express = require('express')
const app = express()
const port = 80

var mysql = require('promise-mysql');

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
  var map = null;
  mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "capstone",
    database: "capstone"
  }).then(function(conn){
      connection = conn;
      return connection.query('SELECT * FROM maps WHERE map_id = ?', [req.params.map_id]);
  }).then(function(rows){
      console.log("Map rows result: ");
      console.log(JSON.stringify(rows[0]));
      map = JSON.parse(JSON.stringify(rows[0]));
  }).then(function(){
      return connection.query('SELECT * FROM data_points WHERE map_id = ?', [req.params.map_id]);
  }).then(function(rows){
      connection.end();
      console.log("Data_points rows result: ");
      console.log(JSON.stringify(rows));
      map["data_points"] = JSON.parse(JSON.stringify(rows));
      console.log("map with data points amended onto it: "+JSON.stringify(map));
      res.send(map);
  }).catch(function(error){
      if (connection && connection.end) connection.end();
      //logs the error
      console.log(error);
  }).finally(function() {});
})

//sets app to listen on port
app.listen(port, () => console.log(`Capstone app listening on port ${port}!`))
