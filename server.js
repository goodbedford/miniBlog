//Server side js

// require express framework and additional modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));



//set up sample data model



// set up root route to respond with 'hello world'
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

// set up route for /posts JSON
app.get('/api/posts', function(req, res) {
  res.json(posts);
});

// set up route for /posts/:postId JSON
app.get('/api/posts/:postId', function(req, res) {
  res.json(posts);
});




// listen on port 3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});

