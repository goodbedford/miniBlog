$(document).ready(function(){

var $submitBtn = $("#submitBtn");
var $titleInput = $("#titleInput");
var $postBody = $("#postBody");
var $modalForm = $("#modalForm");

//Post constructor
function Post (title, body){
  console.log("started making new post");
  this.title = title;
  this.body = body;
  this.postDate = dateFormat();
  this.posts = localStorage.getItem("posts"); 
  this.key = "posts";
  console.log("this is in post constructor and post is-",this.posts);
  function dateFormat (){
  var d = new Date();
  return d.toLocaleDateString();
  }
}
//
Post.all =[];

function SaveRender(){}
SaveRender.prototype.saveToLs = function(post){ 
    //console.log("this is the post json in if statement-", posts_json);
  if (this.posts) {
    posts_json = JSON.parse(this.posts);
  } else {
    posts_json = [];
  }
  posts_json.push(post);
  //console.log("this is posts json should have two post objs in string-", JSON.stringify(posts_json) );
  localStorage.setItem(this.key, JSON.stringify(posts_json) );
  //console.log("this is local storage-", localStorage);
}
SaveRender.prototype.saveToPostAll = function(post){
  Post.all.push(this);
}

SaveRender.prototype.renderTemplatePostAll = function(template_source, where) {
  var template = _.template($(template_source).html());
     $(where).append(template(this));
}
SaveRender.prototype.renderTemplate = function(template_source, where) {
  var posts_json = JSON.parse(this.posts);
  var template = _.template($(template_source).html());

     $(where).append(template(this));
   _.each(posts_json, function(post) {
     $(where).append(template(post));
   });
}

Post.prototype = new SaveRender();
Post.prototype.constructor = Post;


//postToBlog
function postToBlog(){
  event.preventDefault();
  var tempPost = new Post($titleInput.val(),$postBody.val() );
  tempPost.saveToPostAll(tempPost);
  //console.log("this is posttoBlog tempPost" + tempPost);
  tempPost.renderTemplatePostAll("#blog-template", "#blog-container");
  $("#postModal").modal("hide");
  $modalForm[0].reset();
  $titleInput.focus();
}

function postFromLocStorage (){
  event.preventDefault();
    var tempPost = new Post($titleInput.val(),$postBody.val() );
    temPost.saveToLs(tempPost);
  //console.log("this is posttoBlog tempPost" + tempPost);
  tempPost.renderTemplate("#blog-template", "#blog-container");
  $("#postModal").modal("hide");
  $modalForm[0].reset();
  $titleInput.focus();
}


//data model
// var post1 = new Post("1building my blog", "Today we reviewed OOP, not the song by Naughty By Nature but the"+ 
//   "object oriented programming. We covered inheretance. We used localStorage to temperaily store post unitl we learn"+
//   "how to use databases. We used underscore for the template and other utilites.");
// post1.saveToLs(post1);
// post1.renderTemplate("#blog-template", "#blog-container");

// var post2 = new Post("2finding my community", "In just two weeks of dev school and a few hundred hours later. I have found my community, and I am in love.");
// post2.saveToLs(post2);
// post2.renderTemplate("#blog-template", "#blog-container");

//data model
var post1 = new Post("1building my blog", "Today we reviewed OOP, not the song by Naughty By Nature but the"+ 
  "object oriented programming. We covered inheretance. We used localStorage to temperaily store post unitl we learn"+
  "how to use databases. We used underscore for the template and other utilites.");
post1.saveToPostAll();
post1.renderTemplatePostAll("#blog-template", "#blog-container");

var post2 = new Post("2finding my community", "In just two weeks of dev school and a few hundred hours later. I have found my community, and I am in love.");
post2.saveToPostAll(post2);
post2.renderTemplatePostAll("#blog-template", "#blog-container");
 
//submit button
$modalForm.on("submit", postToBlog);
//$modalForm.on("submit", postFromLocStorage);


});

