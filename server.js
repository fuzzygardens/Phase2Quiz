/*var fs =require('fs');

var express = require('express');
var app = express();
app.use('/Use', express.static(__dirname + '/Use'));
app.use(express.static("./Use"));

app.get('/', function (req, res) {
  var content = fs.readFileSync("Use/index.html", 'utf8');
  res.send(content);
});

app.get('/quiz', function (req, res) {
  res.send('Hello World! New Stuff!');
});

var server = app.listen(process.env.PORT || 3000);*/

var fs = require("fs");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');  

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.listen(process.env.PORT || 3000);


app.get('/', function (req, res) {
  var content = fs.readFileSync("public/index.html", 'utf8');
  res.send(content);
});

app.get('/quiz', function (req, res) {
  var content = fs.readFileSync("public/ConorQuiz.json", 'utf8');
  res.send(content);
});

app.post('/quiz', function (req, res) {
  console.log(req.body);
  res.send('POST Quiz!');
});