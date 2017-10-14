/*
 * Jonah Feldman, 10-13-17
 * index.js
 * Server file for our road trip advisor
 */

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


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


 var fetch = require('node-fetch');

//adds CORS--for testing purposes only, REMOVE LATER
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');	
app.set('view engine', 'ejs');

app.get("/", function(request, response){

	response.sendFile(path.join(__dirname +"home.html"));
});

app.post("/attractions", function(request, response){
	console.log("I am a goddamn 3impanzee");
	var lat = request.body.lat;
	var lng = request.body.lng;
	var url = "http://api.tripadvisor.com/api/partner/2.0/map/" + lat + "," + lng + "/attractions/?key=9f5acbc1-6233-4162-8a68-31d4e9b6f1c5";


	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json)  {
		response.send(json);
	});


	/* alternatively */

	// var fname = "./attr" + lat + lng + ".json"
	// console.log("fname is " + fname);

	// var fs = require('fs');
	// var obj;
	// fs.readFile('attr11.json', 'utf8', function (err, data) {
 //  		console.log(data);
 //  		if (err){
 //  			console.log("was an error");
 //  		}
 //  		/*data parser, maybe */
 //  	//	obj = JSON.parse(data); 
 //  		response.send(data);
  		
	// });

});

app.post("/restaurants", function(request, response){
	var lat = request.body.lat;
	var lng = request.body.lng;
	var url = "http://api.tripadvisor.com/api/partner/2.0/map/" + lat + "," + lng + "/restaurants/?key=9f5acbc1-6233-4162-8a68-31d4e9b6f1c5"

fetch(url).then(function(response) {
		return response.json();
	}).then(function(json)  {
		response.send(json);
	});


	// var fname = "rest" + lat + lng + ".json"

	// var fs = require('fs');
	// var obj;
	// fs.readFile('fname', 'utf8', function (err, data) {
  	
 //  		/*data parser, maybe
 //  		obj = JSON;.parse(data); <---make it an object so its easier to manipulate*/
 //  		response.send(data);
  		
	// });


})