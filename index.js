/*
 * Jonah Feldman, 10-13-17
 * index.js
 * Server file for our road trip advisor
 */

var express = require('express')
  , http = require('http');

var app = express();
var server = http.createServer(app);

//sets up socket.io
var io = require('socket.io').listen(server);

var path = require('path');


var bodyParser = require('body-parser'); 
var validator = require('validator');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set up mongodb database
var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/nodemongoexample';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
});


 server.listen(process.env.PORT, function(){
 	console.log("server running");
 });


app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');	
app.set('view engine', 'ejs');

app.get("./", function(){
	response.sendFile(path.join(__dirname + "/public/" +"home.html"));
})