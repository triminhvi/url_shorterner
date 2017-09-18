var express = require('express');
var mongoose = require('mongoose');
var validUrl = require('valid-url');
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

//Redirect the short url link to original link
app.get('/test/:id', function (req, res){
	var id = req.params.id;
	console.log(id);
	var shortUrl = "http://localhost:3000/test/" + id;
	Url.findOne({short_url: shortUrl}, function (err, url){
		if(err){
			console.log(err);
			res.send({
				original_url: "error",
				short_url: "error"
			})
		}
		//var originalLink = url.original_url;
		console.log("This is from id: " + url);
		res.redirect(url.original_url);
	});
});



app.listen(process.env.PORT || 3000, function(err){
	if(err) {
		console.log(err);
	} else {
		console.log('Listening on port 3000');
	}
})