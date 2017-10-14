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

app.use('/src', express.static(__dirname + '/src'));


// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/", function(request, response){
	response.sendFile(path.join(__dirname +"/home.html"));
});

app.post("/attractions", function(request, response){
	var start_lat = parseFloat(request.body.start_lat);
	var start_lng = parseFloat(request.body.start_lng);
	var end_lat = parseFloat(request.body.end_lat);
	var end_lng = parseFloat(request.body.end_lng);

	var cent_lat = (start_lat + end_lat) / 2;
	var cent_lng = (start_lng + end_lng) / 2;
	var q_lat = (start_lat + cent_lat) / 2;
	var q_lng = (start_lng + cent_lng) / 2;
	var threeq_lat = (end_lat + cent_lat) / 2;
	var threeq_lng = (end_lng + cent_lng) / 2;
	var url = "http://api.tripadvisor.com/api/partner/2.0/map/" + cent_lat + "," + cent_lng + "/attractions/?key=9f5acbc1-6233-4162-8a68-31d4e9b6f1c5";
	var return_val;

	console.log(start_lng)
	console.log(start_lat)
	console.log(end_lat);
	console.log(end_lng);


	//posts to the TripAdvisor API
	fetch(url)
    .then(function(response) {
		return response.json();
	}).then(function(json)  {
		 url = "http://api.tripadvisor.com/api/partner/2.0/map/" + q_lat + "," + q_lng + "/attractions/?key=9f5acbc1-6233-4162-8a68-31d4e9b6f1c5";

		 return_val = JSON.stringify(json.data);
		fetch(url)
    	.then(function(response) {
				return response.json();
		}).then(function(json)  {
			 url = "http://api.tripadvisor.com/api/partner/2.0/map/" + threeq_lat + "," + threeq_lng + "/attractions/?key=9f5acbc1-6233-4162-8a68-31d4e9b6f1c5";

			 return_val = return_val + ", " + JSON.stringify(json.data);

			fetch(url)
    		.then(function(response) {
				return response.json();
			}).then(function(json)  {

				return_val = return_val + ", " + JSON.stringify(json.data);

				response.send(return_val);
 
			});
		});
	});


});

app.post("/restaurants", function(request, response){

	var start_lat = parseFloat(request.body.start_lat);
	var start_lng = parseFloat(request.body.start_lng);
	var end_lat = parseFloat(request.body.end_lat);
	var end_lng = parseFloat(request.body.end_lng);

	var cent_lat = (start_lat + end_lat) / 2;
	var cent_lng = (start_lng + end_lng) / 2;
	var q_lat = (start_lat + cent_lat) / 2;
	var q_lng = (start_lng + cent_lng) / 2;
	var threeq_lat = (end_lat + cent_lat) / 2;
	var threeq_lng = (end_lng + cent_lng) / 2;
	var url = "http://api.tripadvisor.com/api/partner/2.0/map/" + cent_lat + "," + cent_lng + "/restaurants/?key=9f5acbc1-6233-4162-8a68-31d4e9b6f1c5";
	var return_val;

	fetch(url)
    .then(function(response) {
		return response.json();
	}).then(function(json)  {
		 url = "http://api.tripadvisor.com/api/partner/2.0/map/" + q_lat + "," + q_lng + "/restaurants/?key=9f5acbc1-6233-4162-8a68-31d4e9b6f1c5";

		 return_val = JSON.stringify(json.data);
		fetch(url)
    	.then(function(response) {
				return response.json();
		}).then(function(json)  {
			 url = "http://api.tripadvisor.com/api/partner/2.0/map/" + threeq_lat + "," + threeq_lng + "/restaurants/?key=9f5acbc1-6233-4162-8a68-31d4e9b6f1c5";

			 return_val = return_val + ", " + JSON.stringify(json.data);

			fetch(url)
    		.then(function(response) {
				return response.json();
			}).then(function(json)  {

				return_val = return_val + ", " + JSON.stringify(json.data);

				response.send(return_val);
 
			});
		});
	});


	// var lat = request.body.lat;
	// var lng = request.body.lng;
	// var height = request.body.height;
	// var width = request.body.width;
	// var url = "http://api.tripadvisor.com/api/partner/2.0/map/" + lat + "," + lng + "/restaurants/?key=9f5acbc1-6233-4162-8a68-31d4e9b6f1c5";

	// //posts to the TripAdvisor API
	// fetch(url, {
 //        data: JSON.stringify({
 //            distance: `${width},${height}`,
 //        })
 //    }).then(function(response) {
 //        // console.log(response);
	// 	return response.json();
	// }).then(function(json) {
 //        // console.log(json);
	// 	response.send(json);
	// });



})
