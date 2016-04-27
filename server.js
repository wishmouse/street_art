var express = require("express")
var path = require("path")

app = express()

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.get('/', function(req, res){
  res.render('index')
})


app.listen(3000, function(){
console.log("We have lift off! @ 3000")
})

