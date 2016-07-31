var express = require("express");
var compression = require("compression");
var favicon = require("serve-favicon");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

// Mock data.
var questions = [
  {
    type: "multiple choice",
    question: "What is a good example of a function?",
    qid: 1,
    answers: ["Only adding 1 + 1", "Returning 1 when called", "Adding some numbers 'a' and 'b'", "Functions are useless"],
    time: 43
  },
  {
    type: "multiple choice",
    question: "Test Question 2",
    qid: 2,
    answers: ["sol1", "sol2", "sol3", "sol4"],
    time: 20
  },
  {
    type: "multiple choice",
    question: "Test Question 3",
    qid: 3,
    answers: ["sol1", "sol2", "sol3", "sol4"],
    time: 2
  }
];

var videoId = "qO4ZN5uZSVg";

// Set the port.
var port = process.env.PORT || 8080;

/*
  Gzip Request.
*/
app.use(compression());

/*
  Make public folders available.
*/
app.use(express.static("public/", {maxAge: "1w"}));

/*
  Send Favicon.
*/
app.use(favicon(path.join(__dirname, "/public/favicon.ico")));

app.all("/*", function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post("/getQuestions", function(request, response) {
  // TODO query database for questions based on assignment id
  // Potential Schema:
  // Assignment(assignmentid, videoid)
  // AssignmentQuestion(assignmentid, qid)
  // Question(qid, question, type)
  // Option(qid, choices)
  // ==> [qid, question, choice]
  var assignmentId = request.body.assignmentId;
  var questionData = {questions: questions};
  console.log("[ QUESTIONS ] " + JSON.stringify(questionData));
  response.send(questionData);
});

app.post("/getVideoId", function(request, response) {
  var assignmentId = request.body.assignmentId;
  var videoData = {videoId: videoId};
  console.log("[ VIDEO ] " + JSON.stringify(videoData));
  response.send(videoData);
});

app.listen(port, function(error) {
  if (error) {
    console.log("[ ERROR ] " + error);
  } else {
    console.log("[ STATUS ] Webserver is LIVE. " + port);
  }
});
