var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/url');
var db = mongoose.connection;
var app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
var shorten = require('./routes/shorten.js');
app.use('/new', shorten);

//DB:
db.on('error', function (err){
	if(err){
		throw err;
	}
});
db.once('open', function (err){
	if(err){
		throw err;
	}
	console.log('Connected to database');
});
var Url = require('./models/url.js');

app.get('/', function (req,res){
	res.render('mainpage');
});



app.listen(process.env.PORT || 3000, function(err){
	if(err) {
		console.log(err);
	} else {
		console.log('Listening on port 3000');
	}
})