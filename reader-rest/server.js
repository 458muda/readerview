var express = require("express");
var app = express();
var http = require('http').Server(app);
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use('/api' , require('./routes/api'));


//setInterval(function() {
//    console.log(process.memoryUsage());
//}, 1000);

http.listen(8000, function(){

    console.log('server listening');
})