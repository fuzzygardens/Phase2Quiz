var fs = require("fs");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');  

var ejs = require('ejs');

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.set('view engine', 'ejs'); //don't have to use the .js file extension

app.listen(process.env.PORT || 3000);


app.get('/', function (req, res) {

  var jsonList = {titles:[],id:[]};
  var quizzes = require("./Data/AllQuiz.json");

  for(var x=0; x<quizzes.length; x++){
    jsonList.titles.push(quizzes[x].title);
    jsonList.id.push(quizzes[x].ID);
  }

  res.render('index.ejs', {characters: jsonList});
 

});

app.get('/quiz', function (req, res) { //access json
  var content = fs.readFileSync("Data/ConorQuiz.json", 'utf8');
  res.send(content);
});

app.post('/quiz', function (req, res) { //post JSON
  console.log(req.body);
  var newQuiz = JSON.stringify(req.body, null, 4);
  fs.writeFileSync('Data/ConorQuiz.json', newQuiz);
  res.send('POST Quiz!');
});

/*app.get('/quiz/:id', function (req, res, next) {
	var quizID = req.params.id;
	res.end(req.params.id);
});*/