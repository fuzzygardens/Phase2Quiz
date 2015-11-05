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
  var content = fs.readFileSync("Data/ConorQuiz.json", 'utf8');
  res.send(content);
});

app.post('/quiz', function (req, res) {
  console.log(req.body);
  var newQuiz = JSON.stringify(req.body, null, 4);
  fs.writeFileSync('Data/ConorQuiz.json', newQuiz);
  res.send('POST Quiz!');
});