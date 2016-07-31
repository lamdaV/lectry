var express = require("express");
var compression = require("compression");
var favicon = require("serve-favicon");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

// Set the port.
var port = process.env.PORT || 8080;

var authentication = {
  client_id: "1IHf7uJePIPOUw",
  client_secret: "bNs3ZapWrhxWlLGNsuQamZpho_g",
  username: "react-reddit-dev",
  password: "g0dd3sS500"
};

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

app.get("/test", function(request, response) {
  response.send("testing");
});

app.post("/getAuthentication", function(request, response) {
  console.log("[ POST ] getAuthentication request...");
  response.send(authentication);
  console.log("[ POST ] getAuthentication completed");
});

app.listen(port, function(error) {
  if (error) {
    console.log("[ ERROR ] " + error);
  } else {
    console.log("[ STATUS ] Webserver is LIVE. " + port);
  }
});
