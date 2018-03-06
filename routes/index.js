var bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const path = require('path');
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets , showForm: true} );
});

router.get('/users/:name', function (req, res) {
	console.log(req.params.name);
	let tweets = tweetBank.find({name:req.params.name});
	res.render( 'index', { tweets: tweets, name:req.params.name, showForm:true } );
});

router.get('/tweets/:id', function (req, res) {
	console.log(req.params.id);
	var id = parseInt(req.params.id);
	let tweets = tweetBank.find({id:id});
	res.render( 'index', { tweets: tweets, showForm: true} );
});

router.get('/tweets', function (req, res) {
	res.render('index');
});


// router.get('/stylesheets/style.css', function(req, res) {
// 	// res.sendFile('style.css', { root: path.join(__dirname, '../public/stylesheets') });
// 	// res.sendFile('style.css', { root: path.join(__dirname, '../public/stylesheets') });
// 	// res.render('../stylesheets/style');
// });

// module.exports = router;
module.exports = function(io) {
	router.post('/tweets', function(req, res) {
		var name = req.body.name;
		var text = req.body.text;
		tweetBank.add(name, text);
		res.redirect('/');
		io.sockets.emit('newTweet', { 			
			name: name, 
			text: text
		});
		
	})
	return router;	
}