var express = require('express');
var router = express.Router();
var Url = require('../models/url.js');
var validUrl = require('valid-url');


router.get('/', function (req,res){
	res.send('shorten');
})
router.get('/*', function (req,res){
	var link  = req.params[0];
	
	// Need to valid url
	if(validUrl.isUri(link)){ // if link is valid
		Url.findOne({},{'original_url': 1, 'short_url': 1, '_id':0}, function (err, url){
				if(err){
					console.log(err);
				} else if(!url){ // if no url is found
					// this case is currently not working - check back later
					var newId = parseInt(Url.count()) + 1;
					var newUrl = new Url({
						original_url: link,
						short_url: "http://localhost:3000/" + newId
					});
					newUrl.save(function (err){
						if(err){
							console.log('Cannot save newURL');
						}
						console.log('newUrl has been saved');
					})
					res.send(newUrl);
				} else { // if found
					console.log("Found url");
					res.send(url);
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