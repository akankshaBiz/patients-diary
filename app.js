var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose =  require('mongoose');
var methodOverride = require('method-override');

var app = express();
mongoose.connect('mongodb://akku:akkujiggu@jello.modulusmongo.net:27017/vEtixy8r');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());

var userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    DOB: String,
    age: String,
    gender: String,
    comments: String
});

var User = mongoose.model('dataphiUser',userSchema);

app.post('/newEntry', function (req, res) {
    console.log("new entry");
    var entry = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      DOB: req.body.DOB,
      age: req.body.age,
      gender: req.body.gender,
      comments: req.body.comments
    };
            User.create(entry, function (err, user) {
                if(err) {
                    console.log("error saving user entry");
                    return "";
                }
                console.log('the user is: ', user);

                console.log("user entry saved");
                res.json(user);
            });
});
app.get('/userEntry', function (req, res) {
    console.log("searching..");
        User.find(function (err, user) {
          if(err){
            res.json({data: '', status: 'not found'});
          }
            if (user) {
            console.log("search result>> ",user);
                res.json(user);
            }
        });
});
 app.get('*',function (req, res) {
    console.log("landing page");

});
app.listen(8080);
console.log("listening on port 8080");