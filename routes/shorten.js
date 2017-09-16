var express = require('express');
var router = express.Router();
var Url = require('../models/url.js');


router.get('/', function (req,res){
	res.send('shorten')
})
router.get('/*', function (req,res){
	var link  = req.params[0];
	// console.log(link);
	// res.send(link);
	Url.findOne({'original_url': link},{'original_url': 1, 'short_url': 1, '_id': 0}, function (err, url){
		if(err){
			console.log(err);
		} else if(!url) { // if no url is found
			var newUrl = new Url({
				original_url: link,
				short_url: 1
			});
			newUrl.save(function(err){
				if(err){
					console.log(err);
				} else {
					console.log('New Url is saved');
					res.redirect('/');
				}
			})
		} else { // if found
			res.json(url);
		}
	});
})
module.exports = router;