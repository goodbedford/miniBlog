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
      $post.find("div").eq(0).removeClass("col-xs-4 sm-5 col-sm-offset-6");
      $post.find("div").eq(0).addClass("col-sm-5 col-sm-offset-1 postBlockLeft");
      $post.find("div h2").removeClass("secondaryColor").addClass("majorColor");
      $post.find("div p").removeClass("majorColor").addClass("secondaryColor");
      $post.find("div p span").removeClass("dateBoxRight").addClass("dateBoxLeft");
      $post.find("div").eq(1).find("div").eq(0).addClass("col-sm-offset-2 col-sm-pull-1");
      $post.find("div").eq(1).find("div div").eq(0).addClass("flRight");
      $post.find("div").eq(1).find("div div button").eq(0).removeClass("addCommentRight").addClass("addCommentLeft");


      console.log($("body").children("data-index").length);

    }   // $post.animate({opacity: '0.50'}, 1000);
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

      console.log($postBody.val() );
      if ( $titleInput.val() !== "" && $postBody.val() !== "")
      { 
        if( !$("body").hasClass("errorInput")) {
          $("body").removeClass("errorInput");
          var tempPost = new Post($titleInput.val(), $postBody.val() );
          tempPost.saveToPostAll(tempPost);
          //console.log("this is posttoBlog tempPost" + tempPost);
          tempPost.renderTemplatePostAll("#blog-template", "#blog-container");
          $("#postModal").modal("hide");
          $modalForm[0].reset();
          $titleInput.focus();
        }
      }else{
        if ( !($("body").hasClass("errorInput") ) ){
         console.log("wrong input values");
         var $alert = $("<div ></div>");
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
        } else{
          $("body").addClass("errorInput");
          //$("#postModal").trigger("click", "submitBtn");
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
    $(this).parent().parent().find("div.commentContainer").removeClass("hide");
    console.log($(this));

    // var $commentRowBox = $(this).parent().parent().parent();
    // console.log("commentRowBox-",$commentRowBox);
    // console.log("data-index-", $commentRowBox.parent().attr("data-index") );
    // var $commentContainer = $(this).parent().parent().find("div.commentContainer");
    // var $cSubmitBtn = $(this).parent().siblings(".commentContainer").children("button");
    
    // $cSubmitBtn.on("click",function(){
    //   var $row = $("<div class='row'></div>");
    //   var $col = $("<div class='col-xs-4 col-xs-offset-4 commentBox'></div>");
    //   $col.html($commentContainer.children("textarea").val() );
    //   $row.html($col);
    //   console.log($row.html() );
    //   console.log("commentRowBox-",$commentRowBox);
    //   $commentRowBox.append($row );
    //   $commentContainer.children("textarea").val("");
    //   $commentContainer.addClass("hide");
    // });

    //console.log($(this).parent().find(".commentContainer").html() );
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
  var post4 = new Post("Find empty spot in cupboard and sleep all day scratch leg; meow for can opener to feed me",
                          "Sun bathe burrow under covers. Why must they do that fall over dead (not really but gets sypathy)"+
                           "so curl into a furry donut, or play time, and mew. Need to chase tail plan steps for world domination"+
                           "eat a plant, kill a hand for nap all day. Has closed eyes but still sees you. Sleep on keyboard."+
                           "Poop on grasses shake treat bag, or put toy mouse in food bowl run out of litter box at full speed"+
                            "so chase mice, or kick up litter. Sit in box chew on cable but hopped up on catnip, so eat grass,"+
                            " throw it back up hunt by meowing loudly at 5am next to human slave food dispenser spread kitty litter all over house if it fits, i sits. ");
  post4.saveToPostAll();
  post4.renderTemplatePostAll("#blog-template", "#blog-container");
  
  var post1 = new Post("1building my blog", "Today we reviewed OOP, not the song by Naughty By Nature but the"+ 
    "object oriented programming. We covered inheretance. We used localStorage to temperaily store post unitl we learn"+
    "how to use databases. We used underscore for the template and other utilites.");
  post1.saveToPostAll();
  post1.renderTemplatePostAll("#blog-template", "#blog-container");

  var post2 = new Post("2finding my community", "In just two weeks of dev school and a few hundred hours later. I have found my community, and I am in love.");
  post2.saveToPostAll();
  var com1 = new Comment("That was a pretty good post, thanks man.");
  var com2 = new Comment("this post is out date we don't use underscore or OOP anymore");
  post2.comments.push(com1, com2);
  post2.renderTemplatePostAll("#blog-template", "#blog-container");
   
  var post3 = new Post("peeling back slack", "Slack has been many things to me, a way to get help, comic relief , a monitoring system, and a friend. It's a call in the night, 'Is there any body out there?...You wait and if your suave you can see who's out there."+
    "but will anyone help you. Of course they will. Your freaking out and you watch the MIME of the guy slapping a way at the computer until his arms look"+
    "like a windmill. Thank you Slack. Better yet thank for, whomever on the other end of the Slack. ");
  post3.saveToPostAll();
  post3.renderTemplatePostAll("#blog-template", "#blog-container");
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
    
  $("#blog-container").on("click", "button.launchComment", addCommentFromPost);
  //$("#commentModal").on("click", "button", addComment);

  //submit comment textarea to comment container
  // $("#blog-container").on("click", "button.btn.txtAreaBtn", function(){
  //   var $commentRowBox = $(this).parent().parent().parent();
  //   console.log("commentRowBox-",$commentRowBox);
  //   console.log("data-index-", $commentRowBox.parent().attr("data-index") );
  //   var index = $commentRowBox.parent().attr("data-index");
  //   var $commentContainer = $(this).parent().parent().find("div.commentContainer");
  //   var $cSubmitBtn = $(this).parent().siblings(".commentContainer").children("button");
  //   console.log("inside txtAreaBtn");
  //   var $row = $("<div class='row'></div>");
  //   var $col = null;
  //   if(index % 2 == 0){
  //     $col = $("<div class='col-xs-4 col-xs-offset-4 col-sm-4 col-sm-offset-7 commentBox'></div>");
  //   }else{
  //     $col = $("<div class='col-xs-4 col-xs-offset-4 col-sm-4 col-sm-pull-3 commentBoxLeft'></div>");

  //   }
  //   //var $col = $("<div class='col-xs-4 col-xs-offset-4 col-sm-4 col-sm-offset-7  commentBox'></div>");
  //   //console.log($commentContainer.children("textarea").val() );
  //   if ($commentContainer.children("textarea").val() == ""){
  //     console.log("textarea is empty");
  //     if(!$commentContainer.hasClass("errorInput") ){
  //        $commentContainer.addClass("errorInput");
  //        $commentContainer.prepend($("<div class='error'>Please enter Comment</div>") );
  //     }

  //   }else{
  //     $commentContainer.removeClass("errorInput");
  //     $commentContainer.find("div.error").remove(); 
  //     $col.html($commentContainer.children("textarea").val() );
  //     var tempCommentVal = $commentContainer.children("textarea").val();
  //     var comment1 = new Comment(tempCommentVal);
  //     console.log("HI Yall");
  //     Post.all[index].comments.push(comment1);
  //     console.log(Post.all[index] );

  //     $row.html($col);
  //     console.log($row.html() );
  //     console.log("commentRowBox-",$commentRowBox);
  //     $commentRowBox.append($row );
  //     $commentContainer.children("textarea").val("");
  //     $commentContainer.addClass("hide");
  //   }
  // });

//setting up container template
$("#blog-container").on("click", "button.btn.txtAreaBtn", function(){
  var $commentRowBox = $(this).parent().parent().parent();
  console.log("commentRowBox-",$commentRowBox);
  console.log("data-index-", $commentRowBox.parent().attr("data-index") );
  var $comTarget = $commentRowBox.parent().find('div[class="comment-target"]');
  var  sidePicker = $commentRowBox.parent().attr("data-index");
  var postIndex = sidePicker;
  var $commentContainer =$(this).parent().find("textarea:first");
  console.log($comTarget.attr("id"));
  //var targetId = $commentRowBox.parent().find('div[class="comment-target"]').attr("id");
  var $row = $("<div class='row'></div>");
       var $col = null;
       if(sidePicker % 2 == 0){
         $col = $("<div class='col-xs-4 col-xs-offset-4 col-sm-4 col-sm-offset-7 commentBox'></div>");
       }else{
         $col = $("<div class='col-xs-4 col-xs-offset-4 col-sm-4 col-sm-pull-3 commentBoxLeft'></div>");

       }

       if ($commentContainer.val() == ""){
         console.log("textarea is empty");
         if(!$commentContainer.hasClass("errorInput") ){
            $commentContainer.addClass("errorInput");
            $commentContainer.prepend($("<div class='error'>Please enter Comment</div>") );
         }

       }else{
         $commentContainer.removeClass("errorInput");
         $commentContainer.find("div.error").remove(); 
         $col.html($commentContainer.val() );
         var tempCommentVal = $commentContainer.val();
         var comment1 = new Comment(tempCommentVal);
         console.log("HI Yall");
         Post.all[postIndex].comments.push(comment1);
         console.log(Post.all[postIndex] );

         $row.html($col);
         console.log($row.html() );
         console.log("commentRowBox-",$commentRowBox);
         $commentRowBox.append($row );
         $commentContainer.val("");
         $commentContainer.addClass("hide");
       }

});


  $("#blog-container").on("click", "button.btn.txtAreaClose", function(){
    if($(this).parent().hasClass("errorInput") ){
      $(this).parent().removeClass("errorInput");
      $(this).parent().find("div.error").remove(); 
    }

    $(this).parent().find("textarea").val("");
    $(this).parent().toggleClass("hide");  
  });

});

