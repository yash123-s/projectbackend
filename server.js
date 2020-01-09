var express = require('express');
var app = express();
var port = process.env.PORT || 8210;
var mongoose = require('mongoose');
var Task = require('./Model/LoginModel');
var bodyParser = require('body-parser');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Register'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./Router/LoginRouter');
routes(app); 

app.use((error,req,res,next)=>{
console.log(error);
const status = error.statusCode || 500;
const message = error.message;
res.status(status).json({
message:message
});
});

app.listen(port);


console.log('todo list RESTful API server started on: ' + port);