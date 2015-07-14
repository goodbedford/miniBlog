//Server side js

// require express framework and additional modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    _ = require('underscore'),
    mongoose = require("mongoose"),
    Post = require("./models/post");

// connnect Mongoose to database
mongoose.connect("mongodb://localhost/blogProject");

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(cors());


//set up sample data model
// var posts = [];
// var post1 = { id: 1,
//               title: "catnip", 
//               body: "Find empty spot in cupboard and sleep all day scratch leg; meow for can opener to feed me"+
//                     "Sun bathe burrow under covers. Why must they do that fall over dead (not really but gets sypathy)"+
//                      "so curl into a furry donut, or play time, and mew. Need to chase tail plan steps for world domination"+
//                      "eat a plant, kill a hand for nap all day. Has closed eyes but still sees you. Sleep on keyboard."+
//                      "Poop on grasses shake treat bag, or put toy mouse in food bowl run out of litter box at full speed"+
//                      "so chase mice, or kick up litter. Sit in box chew on cable but hopped up on catnip, so eat grass,"+
//                      " throw it back up hunt by meowing loudly at 5am next to human slave food dispenser spread kitty litter all over house if it fits, i sits. "
//               };
// var post2 = { id:2,   
//               title: "2finding my community", 
//               body: "In just two weeks of dev school and a few hundred hours later. I have found my community, and I am in love."
//             }
// var post3 = { id: 3,
//               title: "1building my blog", 
//               body: "Today we reviewed OOP, not the song by Naughty By Nature but the"+ 
//                     "object oriented programming. We covered inheretance. We used localStorage to temperaily store post unitl we learn"+
//                     "how to use databases. We used underscore for the template and other utilites."
//             };
//add post to posts array
//posts.push(post1, post2, post3);                      

// fix use for local
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// set up root route to respond with 'hello world'
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});


// GET all post
app.get('/api/posts', function(req, res) {
  Post.find(function(err, posts){
    res.json(posts);
  });
});

// POST a new post to database
app.post('/api/posts', function(req, res){
  var newPost = new Post({
    title: req.body.title, 
    body: req.body.body, 
    datePost: req.body.datePost 
  });
  newPost.save(function(err, savedPost){
    res.status(201).json(savedPost);
  });
});

//GET post by id
app.get('/api/posts/:id', function(req, res){
  var postId = req.params.id;

  Post.findOne({_id: postId}, function(err, foundPost){
    res.status(200).json(foundPost);
  });
});

//PUT update post id
app.put('/api/posts/:id', function(req, res){
  var postId = req.params.id;

  Post.findOne({_id: postId}, function(err, foundPost){
    foundPost.title = req.body.title || foundPost.title;
    foundPost.body = req.body.body || foundPost.body;
    foundPost.date = req.body.date || foundPost.date;

    foundPost.save(function(err, savedPost){
      res.status(200).json(savedPost);
    });
  });
});

//DELETE post by ID
app.delete('/api/posts/:id', function(req, res){
  var postId = req.params.id;

  Post.findOneAndRemove({_id: postId}, function(err, deletedPost){
    res.json(deletedPost);
  });
});


// listen on port 3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});

