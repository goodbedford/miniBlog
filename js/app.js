$(document).ready(function(){

var $submitBtn = $("#submitBtn");
var $titleInput = $("#titleInput");
var $postBody = $("#postBody");
var $modalForm = $("#modalForm");
var $makePostBtn =$("#makePostBtn");
//Post constructor
function Post (title, body){
  console.log("started making new post");
  this.title = title;
  this.body = body;
  this.postDate = dateFormat();
  this.posts = localStorage.getItem("posts"); 
  this.key = "posts";
  this.comments = [];
  //console.log("this is in post constructor and post is-",this.posts);
  function dateFormat (){
  var d = new Date();
  return d.toLocaleDateString();
  }
}
//
Post.all =[];

function Comment(body){
  this.body = body;
  this.postDate = dateFormat();

  //date formatter
  function dateFormat (){
  var d = new Date();
  return d.toLocaleDateString();
  }
}
Comment.all =[];

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
SaveRender.prototype.saveToPostAll = function(){
  Post.all.push(this);
}

SaveRender.prototype.renderTemplatePostAll = function(template_source, where) {
  var template = _.template($(template_source).html());
  var index =  Post.all.indexOf(this);
  var $post = $(template(this));
  $post.attr("data-index", index);
  if (index % 2 != 0){
    $post.find("div").removeClass("col-sm-5 col-sm-offset-6");
    $post.find(">div").addClass("col-sm-5 col-sm-offset-1 postBlockLeft");
    $post.find("div h2").removeClass("secondaryColor").addClass("majorColor");
    $post.find("div p").removeClass("majorColor").addClass("secondaryColor");
    $post.find("div p span").removeClass("dateBoxRight").addClass("dateBoxLeft");
  }
     $(where).prepend($post);
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

  if ( !($("body").hasClass("errorInput") ) ){ 
    console.log($postBody.val() );
    if ( $titleInput.val() !== "" && $postBody.val() !== "")
    {
      $("body").removeClass("errorInput");
    var tempPost = new Post($titleInput.val(), $postBody.val() );
    tempPost.saveToPostAll(tempPost);
    //console.log("this is posttoBlog tempPost" + tempPost);
    tempPost.renderTemplatePostAll("#blog-template", "#blog-container");
    $("#postModal").modal("hide");
    $modalForm[0].reset();
    $titleInput.focus();
    }else{
      console.log("wrong input values");
     var $alert = $("<div></div>");
     $alert.addClass("alert alert-danger");
     var $close = $("<a></a>");
     $close.addClass("close");
     $close.attr("href", "#");
     $close.attr("data-dismiss", 'alert');
     $close.attr("aria-label", "close");
     $close.html("&times;");
     $alert.html($close);
     $alert.prepend("Please fill in all the inputs");
     $(".modal-header").prepend($alert);
     $("body").addClass("errorInput");
    }
  }
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



function addComment(){
  console.log("add a comment");

  console.log($(this) );

  var tempComment = new Comment( $("#commentTxt").val() );
  console.log("#postComment -", $("#commentTxt").val() ); 
  Comment.all.push(tempComment);
  console.log("tempComment.body -", tempComment.body)
  var $commentDiv = $("<div></div>").text(tempComment.body );
  console.log($commentDiv);
  console.log($(this).parent());
  $(this).parent().parent().prepend($commentDiv);
  // $("#postModal").on("submit", function(event){
  //   event.preventDefault();
  //   console.log("i have been submitted by comments.");
  //       $("div.titleP").removeClass("hide");

  // });
   
}
function addCommentFromPost(){
  console.log("add a comment");
  $(this).parent().find(".commentForm").removeClass("hide");
  console.log($(this).parent().find(".commentForm"));
  //var $commentForm = $("<div><textarea class='cForm'></textarea></div");
  //$(this).parent().append($commentForm); 
  // var tempComment = new Comment( $("#commentTxt").val() );
  // console.log("#postComment -", $("#commentTxt").val() ); 
  // Comment.all.push(tempComment);
  // console.log("tempComment.body -", tempComment.body)
  // var $commentDiv = $("<div></div>").text(tempComment.body );
  // console.log($commentDiv);
  // console.log($(this).parent());
  // $(this).parent().prepend($commentDiv);
  // $("#postModal").on("submit", function(event){
  //   event.preventDefault();
  //   console.log("i have been submitted by comments.");
  //       $("div.titleP").removeClass("hide");

  // });
   
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
post2.saveToPostAll();
post2.renderTemplatePostAll("#blog-template", "#blog-container");
 

 console.log(Post.all);
//submit button 
$modalForm.on("submit", postToBlog);
$makePostBtn.on("click", function(){
  $titleInput.focus();
});

$("button.close").on("click", function(){
  $("body").removeClass("errorInput");
});

//$modalForm.on("submit", postFromLocStorage);
  
$("button.addComment").on("click", addCommentFromPost);
//$("#commentModal").on("click", "button", addComment);

});

