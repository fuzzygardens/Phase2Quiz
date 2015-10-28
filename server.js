var fs =require('fs');

var express = require('express');
var app = express();
app.use('/Use', express.static(__dirname + '/Use'));

app.get('/', function (req, res) {
  var content = fs.readFileSync("Use/index.html", 'utf8');
  res.send(content);
});

app.get('/quiz', function (req, res) {
  res.send('Hello World! New Stuff!');
});

var server = app.listen(3000 || process.env.PORT);