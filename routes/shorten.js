var express = require('express');
var router = express.Router();
var Url = require('../models/url.js');
var validUrl = require('valid-url');
var mongoose = require('mongoose');


router.get('/', function (req,res){
	res.send('shorten');
})
router.get('/*', function (req,res){
	var link  = req.params[0];
	
	// Need to valid url
	if(validUrl.isUri(link)){ // if link is valid
		console.log("This is from link: " + link);
		Url.findOne({original_url: link}, function (err, url){
			if(err){
				console.log(err);
			} 
			console.log(url);
			if(url){
				console.log("Found Url")
				res.send(url);
			} else if(!url){
				Url.count({}, function(err, count){
					if(err){
						console.log(err);
					} else {
						var newId = count;
						var newUrl = new Url({
							original_url: link,
							short_url: "http://localhost:3000/test/" + newId
						});
						newUrl.save(function(err){
							if(err){
								console.log(err);
								return;
							}
							console.log('newUrl has been saved');
						})
						res.send(newUrl);
					}
				});
			}
		});
	} else { // if the link is invalid
		var obj = {
			original_link: "URL invalid",
			short_link: "URL invalid"
		}
		console.log("URL is invalid");
		res.send(obj);
	}
})
module.exports = router;