var FacebookStrategy = require('passport-facebook').Strategy
var passport = require('passport')
var express = require("express")
var path = require("path")
var session = require('express-session')
var hbs = require('express-hbs')
var cloudinary = require('cloudinary')
var bodyParser = require('body-parser')
var $ = require('jquery')
var fileUpload = require('express-fileupload');
var dotenv = require('dotenv')


require('dotenv').config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
app = express()

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


app.listen(3000, function(){
console.log("We have lift off! @ 3000")
})

app.get('/', function(req, res){

  res.render('index')
})

// app.post('/', function(req, res){
//   console.log(req.body, req.files)
//   var stream = cloudinary.uploader.upload_stream(function(result) {
//     console.log(result); });
//   res.json()
// })

// app.post('/upload', function(req, res){
//   var imageStream = fs.createReadStream(req.files.image.path, { encoding: 'binary' })
//     , cloudStream = cloudinary.uploader.upload_stream(function() { res.redirect('/'); });

//   imageStream.on('data', cloudStream.write).on('end', cloudStream.end);
// });

// app.configure('development', function(){
//   app.use(express.errorHandler());
//   cloudinary.config({ cloud_name: 'CLOUD_NAME', api_key: 'CLOUD_API', api_secret: 'CLOUD_SECRET' });
// });

// app.locals.api_key = cloudinary.config().api_key;
// app.locals.cloud_name = cloudinary.config().cloud_name;

