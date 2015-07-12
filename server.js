//Server side js

// require express framework and additional modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));



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
//add post to posts array
posts.push(post1, post2);                      


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

// set up route for /posts/:postId JSON
app.get('/api/posts/:postId', function(req, res) {
  var index;
  posts.forEach(function(post){
    if(post.id == req.params.postId){
      index = posts.indexOf(post);
      res.status(200).json(post);
    }
  });
  console.log("didn't find postId-", req.params.postId);

  res.json(posts);
});


app.post('/api/posts', function(req, res){
  var id = posts.length +1;
  var newPost = req.body;
  newPost.id = id;
  posts.push(newPost);

  res.status(201).json(newPost);

})


// listen on port 3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});

