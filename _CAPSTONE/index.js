const express = require('express')
const app = express()
const port = 8000

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "capstone"
});

app.use(express.static('public'))

app.listen(port, () => console.log(`Capstone app listening on port ${port}!`))

app.get('/api', function(req, res) {
  res.send('hello world')
})

// respond with "hello world" when a GET request is made to the homepage
app.get('/api', function (req, res) {
 res.send('hello world')
})

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to Server");
});
