// Get the Twitter Module
module.exports = require('./node_modules/twitter-node-client/lib/Twitter');

// Setup all the fancy angular stuff
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var error = function (err, response, body) {
    console.log('ERROR [%s]', JSON.stringify(err));
};
var success = function (data) {
    console.log('Data [%s]', data);
};

// Personal Twitter Keys from https://apps.twitter.com/
var config = {
    "consumerKey": "",
    "consumerSecret": "",
    "accessToken": "",
    "accessTokenSecret": ""
};

var twitter = new module.exports.Twitter(config);

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

/*
 * To connect to a front end app (i.e. AngularJS) store all your files you will *
 * statically store in declared below (i.e. ./public) *
*/

app.use(express.static('public'));

//post to retrieve search data
app.post('/twitter/search', function (req, res) {
	console.log(req);
	var searchText = req.body.searchText;
	var filterRetweets = '-filter:retweets';
	var filterImages ='+filter:images';
	var resultType = 'recent';
	var data = twitter.getSearch({ q: searchText+filterRetweets, 'count': 20, 'result\_type':resultType, 'lang':'en', 'include_entities':'true', 'tweet_mode':'extended'}, function(error, response, body){
		res.status(404).send({
			"error" : "Nothing Found"
		});
	}, function(data){
		res.send({
			result : {
				"userData" : data
			}
		});
	});
});


var server = app.listen(3000, function () {
  	var host = server.address().address;
  	var port = server.address().port;
});
