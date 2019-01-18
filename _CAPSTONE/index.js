const express = require('express')
const app = express()
const port = 80

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "capstone",
  database: "capstone"
});

// Connect to server
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to Server");
});

app.use(express.static('public'))

// respond with json from maps table when a GET request is made to the /api/maps
app.get('/api/maps', function (req, res) {
  con.query("SELECT * FROM maps", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
})

app.get('/api/maps/:map_id', function (req, res) {
  con.query("SELECT * FROM maps WHERE map_id = ?", [req.params.map_id], function (err, result, fields) {
    if (err) throw err;
    console.log(result[0]);
    res.json(result[0]); //removes JSON object from array
  });
})

//sets app to listen on port
app.listen(port, () => console.log(`Capstone app listening on port ${port}!`))
