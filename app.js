var bodyParser = require('body-parser');
const express = require( 'express' );
const app = express(); // creates an instance of an express application
const nunjucks = require('nunjucks');

const routes = require('./routes');

var socketio = require('socket.io');
// ...
var server = app.listen(3000);
var io = socketio.listen(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes(io));
app.use('/static/', express.static('public'));

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks

nunjucks.configure('views', { noCache: true });

app.use(function (req, res, next) {
    // do your logging here
    // call `next`, or else your app will be a black hole — receiving requests but never properly responding
	console.log('Request Type:', req.method);
	next();
})

app.get('/', function(req, res, next) {
	// res.send('Hello World!');
	const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
	res.render( 'index', {title: 'Hall of Fame', people: people} );	
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



var locals = {
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};
nunjucks.configure('views', {noCache: true});
nunjucks.render('index.html', locals, function (err, output) {
    // console.log(output);
});

