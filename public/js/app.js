//Client Side js

$(document).ready(function(){

  var $submitBtn = $("#submitBtn");
  var $titleInput = $("#titleInput");
  var $postBody = $("#postBody");
  var $modalForm = $("#modalForm");
  var $makePostBtn =$("#makePostBtn");
  //Post constructor
  function Post (id,title, body){

    console.log("started making new post");
    this.id = id;
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

  Comment.prototype.renderTemplateComment = function(template_source, whereId, $postSelector) {
    var template = _.template($(template_source).html());
    //var index =  Post.all.indexOf(this);
    var $comment = $(template(this));
    var index = $postSelector.attr("data-index");
    //console.log("this is postSelector");
    //console.log( $postSelector);
    //console.log("the comment object is", $comment.html());
    //$post.attr("data-index", index);
    if (index % 2 != 0){
      styleLeftComment($postSelector);
      //console.log($("body").children("data-index").length);
    } 
       $(whereId).prepend($comment);

       function styleLeftComment( postSelector){
        postSelector.find("div").eq(0).removeClass("col-xs-4 sm-5 col-sm-offset-6");
        postSelector.find("div").eq(0).addClass("col-sm-5 col-sm-offset-1 postBlockLeft");
        postSelector.find("div h2").removeClass("secondaryColor").addClass("majorColor");
        postSelector.find("div p").removeClass("majorColor").addClass("secondaryColor");
        postSelector.find("div p span").removeClass("dateBoxRight").addClass("dateBoxLeft");
        postSelector.find("div").eq(1).find("div").eq(0).addClass("col-sm-offset-2 col-sm-pull-1");
        postSelector.find("div").eq(1).find("div div").eq(0).addClass("flRight");
        postSelector.find("div").eq(1).find("div div button").eq(0).removeClass("addCommentRight").addClass("addCommentLeft");
       }
  }

  Post.prototype.save = function(){
    Post.all.push(this);
  }

  Post.prototype.render = function(template_source, where) {
    var template = _.template($(template_source).html());
    //var index =  Post.all.indexOf(this);
    var index = this.id;
    var $postHtml = $(template(this));
    console.log("this is the posthtml--");
    console.log($postHtml);
    console.log("the this.id-");
    console.log(index);
    $postHtml.attr("data-index", index);
    if (index % 2 != 0){
     styleLeftPost($postHtml);


      console.log($("body").children("data-index").length);

    }   // $postHtml.animate({opacity: '0.50'}, 1000);
       $(where).prepend($postHtml);

    function styleLeftPost(somePost){
       somePost.find("div").eq(0).removeClass("col-xs-4 sm-5 col-sm-offset-6");
      somePost.find("div").eq(0).addClass("col-sm-5 col-sm-offset-1 postBlockLeft");
      somePost.find("div h2").removeClass("secondaryColor").addClass("majorColor");
      somePost.find("div p").removeClass("majorColor").addClass("secondaryColor");
      somePost.find("div p span").removeClass("dateBoxRight").addClass("dateBoxLeft");
      somePost.find("div").eq(1).find("div").eq(0).addClass("col-sm-offset-2 col-sm-pull-1");
      somePost.find("div").eq(1).find("div div").eq(0).addClass("flRight");
      somePost.find("div").eq(1).find("div div button").eq(0).removeClass("addCommentRight").addClass("addCommentLeft");
    }
  }


  Post.prototype = new Post();
  Post.prototype.constructor = Post;


  //postToBlog
  function postToBlog(){
    event.preventDefault();

      console.log($postBody.val() );
      if ( $titleInput.val() !== "" && $postBody.val() !== "")
      { 
        if( !$("body").hasClass("errorInput")) {
          $("body").removeClass("errorInput");
          var tempPost = {title:$titleInput.val(), body: $postBody.val().replace(/\n/gi, "<br />")};
          //tempPost.save(tempPost);

          //ajax post info to server
          $.ajax({
            url: "/api/posts",
            type: "POST",
            data: tempPost,
            success: function(data){
              var newPost = new Post(data.id, data.title, data.body );
              newPost.save();
              newPost.render("#blog-template", "#blog-container");

            }
          });

          //console.log("this is posttoBlog tempPost" + tempPost);
          //tempPost.render("#blog-template", "#blog-container");
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


  function addCommentFromPost(){
    console.log("add a comment");
    $(this).parent().parent().find("div.commentContainer").removeClass("hide");
    console.log($(this));     
  }

  //data model
  // var post4 = new Post("Find empty spot in cupboard and sleep all day scratch leg; meow for can opener to feed me",
  //                         "Sun bathe burrow under covers. Why must they do that fall over dead (not really but gets sypathy)"+
  //                          "so curl into a furry donut, or play time, and mew. Need to chase tail plan steps for world domination"+
  //                          "eat a plant, kill a hand for nap all day. Has closed eyes but still sees you. Sleep on keyboard."+
  //                          "Poop on grasses shake treat bag, or put toy mouse in food bowl run out of litter box at full speed"+
  //                           "so chase mice, or kick up litter. Sit in box chew on cable but hopped up on catnip, so eat grass,"+
  //                           " throw it back up hunt by meowing loudly at 5am next to human slave food dispenser spread kitty litter all over house if it fits, i sits. ");
  // post4.save();
  // post4.render("#blog-template", "#blog-container");
  
  // var post1 = new Post("1building my blog", "Today we reviewed OOP, not the song by Naughty By Nature but the"+ 
  //   "object oriented programming. We covered inheretance. We used localStorage to temperaily store post unitl we learn"+
  //   "how to use databases. We used underscore for the template and other utilites.");
  // post1.save();
  // post1.render("#blog-template", "#blog-container");

  // var post2 = new Post("2finding my community", "In just two weeks of dev school and a few hundred hours later. I have found my community, and I am in love.");
  // post2.save();
  // //var com1 = new Comment("That was a pretty good post, thanks man.");
  // //var com2 = new Comment("this post is out date we don't use underscore or OOP anymore");
  // //post2.comments.push(com1, com2);
  // //com1.renderTemplateComment("#comment-template", "#comment-target", );
  // //com2.renderTemplateComment;
  // post2.render("#blog-template", "#blog-container");
   
  // var post3 = new Post("peeling back slack", "Slack has been many things to me, a way to get help, comic relief , a monitoring system, and a friend. It's a call in the night, 'Is there any body out there?...You wait and if your suave you can see who's out there."+
  //   "but will anyone help you. Of course they will. Your freaking out and you watch the MIME of the guy slapping a way at the computer until his arms look"+
  //   "like a windmill. Thank you Slack. Better yet thank for, whomever on the other end of the Slack. ");
  // post3.save();
  // post3.render("#blog-template", "#blog-container");
  //  console.log(Post.all);    


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


//setting up comment container template
$("#blog-container").on("click", "button.btn.txtAreaBtn", function(){
  var $commentRowBox = $(this).parent().parent().parent();
  console.log("commentRowBox-",$commentRowBox);
  console.log("data-index-", $commentRowBox.parent().attr("data-index") );
  var $comTarget = $commentRowBox.parent().find('div[class="comment-target"]');
  var $postRow = $commentRowBox.parent();
  var  sidePicker = $commentRowBox.parent().attr("data-index");
  var postIndex = sidePicker;
  var $txtAreaBox =$(this).parent().find("textarea:first");
  var $commentContainer = $txtAreaBox.parent();
  var comTargetId = $comTarget.attr("id");
  console.log($comTarget.attr("id"));
   console.log("this should be ",comTargetId );
  //var targetId = $commentRowBox.parent().find('div[class="comment-target"]').attr("id");
  var $row = $("<div class='row'></div>");
       var $col = null;
       if(sidePicker % 2 == 0){
         $col = $("<div class='col-xs-4 col-xs-offset-4 col-sm-4 col-sm-offset-7 commentBox'></div>");
       }else{
         $col = $("<div class='col-xs-4 col-xs-offset-4 col-sm-4 col-sm-pull-3 commentBoxLeft'></div>");

       }

       if ($txtAreaBox.val() == ""){
         console.log("textarea is empty");
         if(!$txtAreaBox.hasClass("errorInput") ){
            $txtAreaBox.addClass("errorInput");
            $txtAreaBox.prepend($("<div class='error'>Please enter Comment</div>") );
         }

       }else{
         $txtAreaBox.removeClass("errorInput");
         $txtAreaBox.find("div.error").remove(); 
         $col.html($txtAreaBox.val().replace(/\n/gi, "<br />") );
         var tempCommentVal = $txtAreaBox.val();
         var comment1 = new Comment(tempCommentVal);

         comment1.renderTemplateComment("#comment-template", comTargetId, $postRow );
         console.log("I just added comment to post", postIndex)
         console.log("HI Yall");
         Post.all[postIndex].comments.push(comment1);
         console.log(Post.all[postIndex] );

         $row.html($col);
         console.log($row.html() );
         console.log("commentRowBox-",$commentRowBox);
         $commentRowBox.append($row );
         $txtAreaBox.val("");
         $commentContainer.addClass("hide");
       }

});
  
  // open edit modal when you click button with clas editPostBtn
  $("#blog-container").on("click", "button.editPostBtn", function(){
    console.log("I just clicked and made the edit modal open");
    var $postRowParent = $(this).parent().parent().parent();
    //var $postDataHook = $(this).closet("data-hook", "postTitle");
    var postId = $postRowParent.attr("data-index");
    console.log("the postId is");
    console.log(postId);

    $.ajax({
      url: "/api/posts/" + postId,
      type: "GET",
      success: function(data){
        $("#editTitleInput").val(data.title);
        $("#editTitleInput").attr("data-index", postId);
        $("#editPostBody").val(data.body);
      }

    });
    // var editedPost = { title: $("#editTitleInput").val(), body: $("#editPostBody").val() };


  });
  $("#modalEditForm").on("click", ".editSubmitBtn", function(event){
    event.preventDefault();
    var editedPost = { id: parseInt($("#editTitleInput").attr("data-index")),
                       title: $("#editTitleInput").val(), 
                       body: $("#editPostBody").val() 
                     };
    console.log("this is it");
    console.log(editedPost);
    // ajax to post id
    $.ajax({        
      url: "/api/posts/"+ editedPost.id,
      type: "PUT",
      data: editedPost,
      success: function(data){

        Post.all.forEach(function(post){
          if(post.id == data.id){
            post.title = data.title;
            post.body = data.body;            
            var $tempPost = $("#blog-container").find("div[data-index='"+post.id+"']");
            $tempPost.find("[data-hook='postTitle']").text(post.title);
            //console.log("in update response.")
            //console.log($tempPost.find("[data-hook='postTitle']"));
            //console.log($tempPost.find("[data-hook='postBody']").text(post.body));
            $tempPost.find("[data-hook='postBody']").text(post.body);

          }
        });
        $("#closeEditBtn").trigger("click");
      }
    });
  });

  $("#blog-container").on("click", "button.btn.txtAreaClose", function(){
    if($(this).parent().hasClass("errorInput") ){
      $(this).parent().removeClass("errorInput");
      $(this).parent().find("div.error").remove(); 
    }
    $(this).parent().find("textarea").val("");
    $(this).parent().toggleClass("hide");  
  });

  $.ajax({
    url: "/api/posts",
    type: "GET",
    success: function(data){
      var posts = data;
      posts.forEach(function(post){
        console.log("this just posted from ajax");
        console.log(post);
        var newPost = new Post(post.id, post.title, post.body);
        newPost.save();
        newPost.render("#blog-template", "#blog-container");

      });
    },
  });


});

