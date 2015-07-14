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

  Comment.prototype.render = function(template_source, whereId, $postSelector) {
    var template = _.template($(template_source).html());
    //var index =  Post.all.indexOf(this);
    var $commentHtml = $(template(this));
    var index = $postSelector.attr("data-index");
    //console.log("this is postSelector");
    //console.log( $postSelector);
    //console.log("the comment object is", $comment.html());
    //$post.attr("data-index", index);
    if (index % 2 != 0){
      styleLeftComment($commentHtml);
      //console.log($("body").children("data-index").length);
    } 
    console.log("this is the commentHtml tempalte");
      console.log($commentHtml.html());
       $(whereId).append($commentHtml);

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

    console.log("the body data-index - count---");
    console.log($("body").find("div.postRow[data-index]").length);
    console.log($("body").find("div.postRow[data-index]"));

    //the styleIndex is used to have the styles switch sides from left to right.
    //it counts the number of postRows with a data index attribute. There is always one less
    //because the current post is hasn't got posted yet. so i add one to the number 
    //and it doesn't matter what the data index is only the amount of postRows and that they toggle.
    var styleIndex = $("body").find("div.postRow[data-index]").length;
    index++;
    var $parentRow = $("body").find("div.postRow[data-index]");
    //var flip = $parentRow.first("div").hasClass("postBlockLeft");
    console.log("parentRowsss")
    console.log($parentRow
                      .find("div.comment-target")
                      .eq(0) );
    //console.log("flip is --", flip);
    if (styleIndex % 2 != 0){
     //if(!flip){
     styleLeftPost($postHtml);
    var flip = true;
      //console.log($("body").children("data-index").length);

    }   // $postHtml.animate({opacity: '0.50'}, 1000);
       $(where).prepend($postHtml);
       if(flip){
         $parentRow.find("div.comment-target")
           .removeClass("col-xs-4 col-xs-offset-4 col-sm-4 col-sm-offset-7 commentBox")
           .addClass("col-xs-4 col-xs-offset-4 col-sm-4 col-sm-pull-3 commentBoxLeft");
       }
    function styleLeftPost(somePost){
       somePost.find("div").eq(0).removeClass("col-xs-4 sm-5 col-sm-offset-6 postBlockRight");
      somePost.find("div").eq(0).addClass("col-sm-5 col-sm-offset-1 postBlockLeft");
      somePost.find("div h2").removeClass("secondaryColor").addClass("majorColor");
      somePost.find("div p").removeClass("majorColor").addClass("secondaryColor");
      somePost.find("div span[data-hook='postDate']").removeClass("dateBoxRight").addClass("dateBoxLeft");
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
      console.log("postBody--");
      console.log($postBody.val() );
      if ( $titleInput.val() !== "" && $postBody.val() !== "")
      { 
        if( !$("body").hasClass("errorInput")) {
          $("body").removeClass("errorInput");
          var tempPost = {title:$titleInput.val(), body: $postBody.val()};  //.replace(/\n/gi, "<br />")};
          //tempPost.save(tempPost);

          //ajax post info to server
          $.ajax({
            url: "/api/posts",
            type: "POST",
            data: tempPost,
            success: function(data){
              var newPost = new Post(data.id, data.title, data.body );
              newPost.save();
              //console.log("Post.all--");
              //console.log(Post.all[2]);
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

  //submit button 
  $modalForm.on("submit", postToBlog);
  $makePostBtn.on("click", function(){
    $titleInput.focus();
  });

  $("button.close").on("click", function(){
    $("body").removeClass("errorInput");
  });
    
  $("#blog-container").on("click", "button.launchComment", addCommentFromPost);

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
    //var comTargetId = $comTarget.attr("id");
    //console.log($comTarget.attr("id"));
     //console.log("this should be ",comTargetId );
    //var targetId = $commentRowBox.parent().find('div[class="comment-target"]').attr("id");
    // var $row = $("<div class='row'></div>");
    //      var $col = null;
    //      if(sidePicker % 2 == 0){
    //        $col = $("<div class='col-xs-4 col-xs-offset-4 col-sm-4 col-sm-offset-7 commentBox'></div>");
    //      }else{
    //        $col = $("<div class='col-xs-4 col-xs-offset-4 col-sm-4 col-sm-pull-3 commentBoxLeft'></div>");

    //      }

         if ($txtAreaBox.val() == ""){
           console.log("textarea is empty");
           if(!$txtAreaBox.hasClass("errorInput") ){
              $txtAreaBox.addClass("errorInput");
              $txtAreaBox.prepend($("<div class='error'>Please enter Comment</div>") );
           }

         }else{
           $txtAreaBox.removeClass("errorInput");
           $txtAreaBox.find("div.error").remove(); 
           //$col.html($txtAreaBox.val().replace(/\n/gi, "<br />") );
           var tempCommentVal = $txtAreaBox.val();
           var comment1 = new Comment(tempCommentVal);

           console.log("new comment--");
           console.log(comment1);
           //comment1.render("#comment-template", comTargetId, $postRow );
           console.log("I just added comment to post", postIndex)
           console.log("HI Yall");

           Post.all.forEach(function(post){
            if(post.id == postIndex){
              var i = Post.all.indexOf(post);
              Post.all[i].comments.push(comment1);
              console.log("added comment to Post all index-", i);
              console.log(Post.all );
            }
           });
           $("#blog-container").empty();
           Post.all.forEach(function(post){
            post.render("#blog-template", "#blog-container");
           });
           //$row.html($col);
           //console.log($row.html() );
           //console.log("commentRowBox-",$commentRowBox);
           //$commentRowBox.append($row );
           $txtAreaBox.val("");
           $commentContainer.addClass("hide");
         }
  });
  
  // open edit modal when you click button with clas editPostBtn
  $("#blog-container").on("click", "button.editPostBtn", function(){
    console.log("I just clicked and made the edit modal open");
    var $postRowParent = $(this).parent().parent();
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
  });
  // this deletes the post on click of delete btn
  //sends id to server and deletes from post array
  $("#blog-container").on("click", "button.deletePostBtn", function(){
      var $postRowParent = $(this).parent().parent();
      var postIndex = $postRowParent.attr("data-index");
      console.log("the deleted postIndex");
      console.log(postIndex)

      $.ajax({
        url: "/api/posts/" + parseInt(postIndex),
        type: "DELETE",
        success: function(data){
          Post.all.forEach(function(post){
            if( post.id == postIndex){
              var index = Post.all.indexOf(post);
              console.log("deleted this post--" + Post.all[index]);
              Post.all.splice(index, 1);
            }
          })
          $postRowParent.remove();  
          console.log(data);
        }
      });
  });

  // this submits the edited fields to server and updates each post row with new info using jquery
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
            $tempPost.find("[data-hook='postBody']").html(post.body);

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
      console.log(Post.all);
    },
  });


});

