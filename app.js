const express = require( 'express' );
const app = express(); // creates an instance of an express application

app.use(function (req, res, next) {
    // do your logging here
    // call `next`, or else your app will be a black hole — receiving requests but never properly responding
	console.log('Request Type:', req.method);
	next();
})

app.get('/', function(req, res, next) {
	res.send('Hello World!');
	// console.log('Request Type:', req.method);
	next();
})

app.get('/news', function(req, res, next)  {
	res.send('News Link!');
	next();
}
)

app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
	// next();
}
)
