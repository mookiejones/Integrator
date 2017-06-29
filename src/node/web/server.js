


var express = require('express');
var app = express();
var bodyParser= require('body-parser');
var methodOverride = require('method-override');
var FanucProcess = require('../FanucProcess/FanucProcess');
 var FileServer = require('../FileServer/FileServer');
 

// configuration

// config files
// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 8080; 
// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 
try{

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
}catch(e){
    console.log(e);
}

// routes ==================================================
require('./app/routes')(app); // configure our routes



// start app ===============================================
// startup our app at http://localhost:8080

console.log('open application at http://localhost:8080 to see magic happen');
app.listen(port);        