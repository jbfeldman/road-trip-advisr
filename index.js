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

//setup jquery
require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }

    var $ = require("jquery")(window);
});

 server.listen(process.env.PORT, function(){
 	console.log("server running");
 });


app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');	
app.set('view engine', 'ejs');

app.get("./", function(request, response){
	response.sendFile(path.join(__dirname + "/public/" +"home.html"));
});

app.post("./attractions", function(request, response){
	var lat = request.body.lat.toString;
	var lng = request.body.lng.toString;
	var url = "http://api.tripadvisor.com/api/partner/2.0/map/" + lat + "," + lng + "/attractions/?key=9f5acbc1-6233-4162-8a68-31d4e9b6f1c5"

	$.get(url, function(data){

		//data parser, maybe
		response.send(JSON.stringify(data));
	})

	/* alternatively */

	var fname = "attr" + lat + lng + ".json"

	var fs = require('fs');
	var obj;
	fs.readFile('fname', 'utf8', function (err, data) {
  	
  		/*data parser, maybe
  		obj = JSON.parse(data); <---make it an object so its easier to manipulate*/
  		response.send(data);
  		
	});

});

app.post("./restaurants", function(request, response){
	var lat = request.body.lat.toString;
	var lng = request.body.lng.toString;
	var url = "http://api.tripadvisor.com/api/partner/2.0/map/" + lat + "," + lng + "/restaurants/?key=9f5acbc1-6233-4162-8a68-31d4e9b6f1c5"

	//acceses tripadvisor url
	$.get(url, function(data){

		//data parser, maybe
		 response.send(JSON.stringify(data));
	})

	/* alternatively, for reading in local files */

	var fname = "rest" + lat + lng + ".json"

	var fs = require('fs');
	var obj;
	fs.readFile('fname', 'utf8', function (err, data) {
  	
  		/*data parser, maybe
  		obj = JSON;.parse(data); <---make it an object so its easier to manipulate*/
  		response.send(data);
  		
	});


})