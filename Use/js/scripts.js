/* 
Program: Dynamic Quiz, Phase 1
Author: Conor Yuen
Date: 10/9/15
Notes: Functions for the pie chart was due in part to the functions provided on
	   http://www.wickedlysmart.com/how-to-make-a-pie-chart-with-html5s-canvas/
	   Because of formatting issues with the pie chart and time constraints, I ran
	   into an issue with the pie graph where there seemed to be a third component. 
	   If I had more time, I would have tried to solve this problem
*/
var radioButton = ""; //radio button variable
var storedAnswers = []; // array of saved answers
var count = 0; // count variable used for checking the particular question
var user = ""; //username variable

$(document).ready(function(){ // initates the javascript code
	$("#start").click(function() { //when the submit button is pushed
		user=$("#refresh").val(); //saves the username that was input
		if ($("#refresh").val()==null | $("#refresh").val()==""){ //if user did not input name
			alert("Please enter your username!");
		}
		else{
			$("#hold").empty(); //empty the page
			$("#hold").append("<h2>" + user + ", " + Quiz.questions[0].text + "</h2>").hide().fadeIn(750); //add the question 
			for(var i = 0; i < Quiz.questions[0].answers.length; i++){ //number of radio buttons according to the number of answers in the question
				$("#hold").append("<input type=\"radio\" name=\"answer\"> " + Quiz.questions[0].answers[i] + "<br>"); 
			}
			$("#hold").append("<br>");//add a break
			$("#hold").append("<input id=\"forward\" type=\"button\" value=\"Next\"></input>"); //next button
		}
	});


	//several lines of code below are identitcal to the block above, did not comment for them
	$("#hold").on("click", "#forward",function() { //when next button is pressed
		if (count<Quiz.questions.length-2){ //if it is not the last question
			if(checkAnswer() == false){ //if user did not check an answer and pressed next
				alert("Please choose an answer");
			}
			else if (checkAnswer() == true) { // if user checked an answer and pressed next
				trackAnswer(); // stores answer in array
				count++; // go to next question
				$("#hold").empty();
				$("#hold").append("<h2>" + user + ", " + Quiz.questions[count].text + "</h2>").hide().fadeIn(750); //question according to count
				for(var i = 0; i < Quiz.questions[count].answers.length; i++){
					if (storedAnswers[count] == i){
						$("#hold").append("<input type=\"radio\" name=\"answer\" checked = \"checked\" > " + Quiz.questions[count].answers[i] + "<br>"); 
					}
					else{
						$("#hold").append("<input type=\"radio\" name=\"answer\"> " + Quiz.questions[count].answers[i] + "<br>");
					} 
				}
				$("#hold").append("<br>");
				$("#hold").append("<input id=\"backward\" type=\"button\" value=\"Back\"></input>"); // back button
				$("#hold").append("<input id=\"forward\" type=\"button\" value=\"Next\"></input>"); 
			}
		}
		else { //if it is the last question
			trackAnswer(); // stores answer in array
			count++;
			$("#hold").empty();
			$("#hold").append("<h2>" + user + ", " + Quiz.questions[count].text + "</h2>").hide().fadeIn(750); 
			for(var i = 0; i < Quiz.questions[count].answers.length; i++){
				$("#hold").append("<input type=\"radio\" name=\"answer\"> " + Quiz.questions[count].answers[i] + "<br>"); 
			}
			$("#hold").append("<br>");
			$("#hold").append("<input id=\"backward\" type=\"button\" value=\"Back\"></input>"); 
			$("#hold").append("<input id=\"result\" type=\"button\" value=\"End Quiz!\"></input>"); //Go to pie chart
		}
	});

$("#hold").on("click", "#backward",function() { 
		trackAnswer(); //stores answer in array
		count--; // go back to last question
		$("#hold").empty();
		$("#hold").append("<h2>" + user + ", " + Quiz.questions[count].text + "</h2>").hide().fadeIn(750); 
		for(var i = 0; i < Quiz.questions[count].answers.length; i++){
			if (storedAnswers[count] == i){
				$("#hold").append("<input type=\"radio\" name=\"answer\" checked = \"checked\" > " + Quiz.questions[count].answers[i] + "<br>"); 
			}
			else{
				$("#hold").append("<input type=\"radio\" name=\"answer\"> " + Quiz.questions[count].answers[i] + "<br>");
			} 
		}
		$("#hold").append("<br>");
		if (count>0){
			$("#hold").append("<input id=\"backward\" type=\"button\" value=\"Back\"></input>"); // if not the first question, add a back button
		}
		$("#hold").append("<input id=\"forward\" type=\"button\" value=\"Next\"></input>"); 
	});

	$("#hold").on("click", "#result", function(){ //grading function (occurs when submit is pressed in the last question)
		trackAnswer(); //stores answer in array
        var score = quizResult(); //calls quizResult function, gets the number of right answers
        $("#hold").empty();
        $("#hold").append("<h2>" + user + ", " + " You got " + score + " out of " + (Quiz.questions.length) + " correct.</h2>").hide().fadeIn(750); // displays the number of questions answered correctly 

        var data = [((score)/(Quiz.questions.length))*360, ((score - Quiz.questions.length)/(Quiz.questions.length))*360]; //calculates data for format of pie chart
        var chartNames = ["correct", "incorrect"]; // pie chart chartNames
        var colors = ["#228B22","#FF6347"]; // pie chart colors
        $("#hold").append("<br><br><br><center><canvas id=\"piechart\" width=\"250\" height=\"250\"> </canvas><center>"); // creates pie chart
        canvas = document.getElementById("piechart"); //canvas is equivalent to pie chart id
        var context = canvas.getContext("2d"); // two dimensional object 
        for (var i = 0; i < data.length; i++) { //creates pie chart
        	drawSegment(canvas, context, i, data, colors, chartNames);
        }

    });
});

	function checkAnswer(){ // Makes sure an answer is selected 
		if ($("input[name='answer']").is(':checked')){
			return true;
		}
		else {
			return false;
		}
	}

	function trackAnswer(){ //stores answers into storedAnswers[] array
		var tempArray = $("input[name='answer']").toArray();
		for(var x = 0; x < $("input[name='answer']").length; x++) {
			if (tempArray[x].checked == true) {
				storedAnswers[count] = x;
			}
		}
	}

	function drawSegment(canvas, context, i, data, colors, chartNames) { // create pie chart
		context.save();
		var centerX = Math.floor(canvas.width / 2);
		var centerY = Math.floor(canvas.height / 2);
		radius = Math.floor(canvas.width / 2);

		var startingAngle = degreesToRadians(sumTo(data, i));
		var arcSize = degreesToRadians(data[i]);
		var endingAngle = startingAngle + arcSize;

		context.beginPath();
		context.moveTo(centerX, centerY);
		context.arc(centerX, centerY, radius, 
			startingAngle, endingAngle, false);
		context.closePath();

		context.fillStyle = colors[i];
		context.fill();

		context.restore();

		drawSegmentLabel(canvas, context, i, chartNames, data);
	}
	function degreesToRadians(degrees) { //converts degrees to radians
		return (degrees * Math.PI)/180;
	}
	function sumTo(a, i) { // adding function
		var sum = 0;
		for (var j = 0; j < i; j++) {
			sum += a[j];
		}
		return sum;
	}
	function drawSegmentLabel(canvas, context, i, chartNames, data) { //draws segment label
		context.save();
		var x = Math.floor(canvas.width / 2);
		var y = Math.floor(canvas.height / 2);
		var angle = degreesToRadians(sumTo(data, i));

		context.translate(x, y);
		context.rotate(angle);
		var dx = Math.floor(canvas.width * 0.5) - 10;
		var dy = Math.floor(canvas.height * 0.05);

		context.textAlign = "right";
		var fontSize = Math.floor(canvas.height / 25);
		context.font = fontSize + "pt Helvetica";

		context.fillText(chartNames[i], dx, dy);

		context.restore();
	}


	function quizResult() { //compares the answer array to json's correct answers.
	var questionsRight = 0;
	for (var x = 0; x < storedAnswers.length; x++) {
		if (storedAnswers[x] == Quiz.questions[x]["correct_answer"]){
			questionsRight++;
			console.log(storedAnswers[x]);
		}
	}
	return questionsRight;
}

