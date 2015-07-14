//Server side js

// require express framework and additional modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors');


// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(cors());


//set up sample data model
var posts = [];
var post1 = { id: 1,
              title: "catnip", 
              body: "Find empty spot in cupboard and sleep all day scratch leg; meow for can opener to feed me"+
                    "Sun bathe burrow under covers. Why must they do that fall over dead (not really but gets sypathy)"+
                     "so curl into a furry donut, or play time, and mew. Need to chase tail plan steps for world domination"+
                     "eat a plant, kill a hand for nap all day. Has closed eyes but still sees you. Sleep on keyboard."+
                     "Poop on grasses shake treat bag, or put toy mouse in food bowl run out of litter box at full speed"+
                     "so chase mice, or kick up litter. Sit in box chew on cable but hopped up on catnip, so eat grass,"+
                     " throw it back up hunt by meowing loudly at 5am next to human slave food dispenser spread kitty litter all over house if it fits, i sits. "
              };
var post2 = { id:2,   
              title: "2finding my community", 
              body: "In just two weeks of dev school and a few hundred hours later. I have found my community, and I am in love."
            }
var post3 = { id: 3,
              title: "1building my blog", 
              body: "Today we reviewed OOP, not the song by Naughty By Nature but the"+ 
                    "object oriented programming. We covered inheretance. We used localStorage to temperaily store post unitl we learn"+
                    "how to use databases. We used underscore for the template and other utilites."
            };
//add post to posts array
posts.push(post1, post2, post3);                      

// fix use for local
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// set up root route to respond with 'hello world'
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});


// set up route for /posts JSON
app.get('/api/posts', function(req, res) {
  //console.log("this is a post-");
  //console.log(posts);
  res.status(200).json(posts);
});

// GET /posts/:postId JSON
app.get('/api/posts/:postId', function(req, res) {
  var index;
  //console.log(req)
  posts.forEach(function(post){
    console.log("post-Id---", post.id)
    if(post.id == req.params.postId){
      //index = posts.indexOf(post);
      console.log(post)
      res.status(200).json(post);
    }else{
      console.log("didn't find postId-", req.params.postId);
    }
  });
});

 
app.post('/api/posts', function(req, res){
  var id = posts.length +1;
  var newPost = {};
  newPost.id = id;
  newPost.title = req.body.title;
  newPost.body = req.body.body;

  posts.push(newPost);

  res.status(201).json(newPost);

});

app.put("/api/posts/:postId", function(req, res){
  // var post = _.findWhere({id: req.params.id})
  var id = req.params.postId;
 var updatedPost = req.body;
 console.log("put post id----");
 console.log(req.body)
  var foundPost;
  posts.forEach(function(post){
    if(post.id == id){
      foundPost = post;
    }
  });

  console.log(foundPost);
  console.log(req.body.id);
    foundPost.id = req.body.id;
    foundPost.title = req.body.title;
    foundPost.body = req.body.body;
    
    res.json(foundPost);
});

app.delete("/api/posts/:postId", function(req, res){
  var postId = req.params.postId;
  console.log("this is posts length before delete");
  console.log(posts.length);
  var index;
  var foundPost;

  posts.forEach(function(post){
    if(post.id == postId){
      foundPost = post;
      index = posts.indexOf(post); 
      posts.splice(index, 1);
    }
  });
  console.log(posts.indexOf(foundPost) );
  if(posts.indexOf(foundPost) > -1 ){
    console.log("posts length after delete");
    console.log(posts.length);
    //console.log(posts)
    res.json({msg: "Error: could not delete postId-" + postId});
  } else{
    res.status(200).json({msg: "successful deletion of postId-" + postId});
  }

});


// listen on port 3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});

