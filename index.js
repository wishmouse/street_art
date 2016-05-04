var passport = require('passport')
var GitHubStrategy = require('passport-github2').Strategy
var express = require("express")
var path = require("path")
var session = require('express-session')
var hbs = require('express-hbs')
var cloudinary = require('cloudinary')
var bodyParser = require('body-parser')
var Knex = require('knex')
var fileUpload = require('express-fileupload')
var dotenv = require('dotenv')
dotenv.load()
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

// setup knex
var knex = Knex(require('./knexfile')[process.env.NODE_ENV])

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, callback) {
    //find or create a user based on profile
    // github user profile object https://developer.github.com/v3/users/
    console.log('profile', profile)
    knex('users').select('*').where({
      github_id: profile.id
    }).then(function (resp) {
      if (resp.length === 0) { // there is no user in the database!
        var user = {
          github_id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        }

        knex('users').insert(user).then(function (resp) {
          callback(null, user)
        })
      } else {
        callback(null, resp[0])
      }
    })
  }
))




var app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function(user, cb) {
    cb(null, user)
})

passport.deserializeUser(function(obj, cb) {
    cb(null, obj)
})


// routes
//
app.get('/', function(req, res) {
  console.log('user', req.user)
  res.render('index', { user: req.user })
})

// redirect authentication requests to github
app.get('/auth/github', passport.authenticate('github'))

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/')
})

app.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})



        app.listen(3000, function(){
          console.log("We have lift off! @ 3000")
        })


        // app.post('/', function(req, res){
        //   console.log(req.body, req.files)
        //   var stream = cloudinary.uploader.upload_stream(function(result) {
        //     console.log(result) });
        //   res.json()
        // })

        // app.post('/upload', function(req, res){
        //   var imageStream = fs.createReadStream(req.files.image.path, { encoding: 'binary' })
        //     , cloudStream = cloudinary.uploader.upload_stream(function() { res.redirect('/') });

        //   imageStream.on('data', cloudStream.write).on('end', cloudStream.end)
        // })

        // app.configure('development', function(){
        //   app.use(express.errorHandler())
        //   cloudinary.config({ cloud_name: 'CLOUD_NAME', api_key: 'CLOUD_API', api_secret: 'CLOUD_SECRET' })
        // })

        // app.locals.api_key = cloudinary.config().api_key
        // app.locals.cloud_name = cloudinary.config().cloud_name

