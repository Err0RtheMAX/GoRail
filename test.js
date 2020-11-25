var http = require('http');
var fs = require('fs');

var path = require('path');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.static(__dirname + ''));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', function (request, response, next) {
	if (request.session.loggedin == true || request.url == "/login" || request.url == "/register") {
		next();
	}
	else {
		response.sendFile(path.join(__dirname + '/login.html'));
	}
});

app.get('/main', function (request, response) {
	response.sendFile(path.join(__dirname + '/main.html'));
});

app.get('/login', function (request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/course', function (request, response) {
	response.sendFile(path.join(__dirname + '/course.html'));
});

app.get('/places', function (request, response) {
	response.sendFile(path.join(__dirname + '/places.html'));
});

app.get('/station', function (request, response) {
	var name = request.body.id;
	response.sendFile(path.join(__dirname + '/station.html'));
});

app.get('/map', function (request, response) {
	response.sendFile(path.join(__dirname + '/map.html'));
});

app.get('/register', function (request, response) {
	response.sendFile(path.join(__dirname + '/register.html'));
});

app.get('/logout', function (request, response) {
	request.session.loggedin = false;
	response.redirect('/login');
	response.end();
});

app.post('/login', function (request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username == "111" && password == "111") {
		request.session.loggedin = true;
		request.session.username = username;
		response.redirect('/main');
		response.end();
	} else {
		response.send(username);
		response.send(password);
		response.end();
	}
});

app.listen(3000);