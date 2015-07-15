//Client Side js

$(document).ready(function(){

  var $submitBtn = $("#submitBtn");
  var $titleInput = $("#titleInput");
  var $postBody = $("#postBody");
  var $modalForm = $("#modalForm");
  var $makePostBtn =$("#makePostBtn");
  var leftSide = false;

  // function Comment(body){
  //   this.body = body;
  //   this.postDate = dateFormat();

  //   //date formatter
  //   function dateFormat (){
  //   var d = new Date();
  //   return d.toLocaleDateString();
  //   }
  // }
  // Comment.all =[];

  // Comment.prototype.render = function(template_source, whereId, $postSelector) {
  //   var template = _.template($(template_source).html());
  //   //var index =  Post.all.indexOf(this);
  //   var $commentHtml = $(template(this));
  //   var index = $postSelector.attr("data-index");
  //   //console.log("this is postSelector");
  //   //console.log( $postSelector);
  //   //console.log("the comment object is", $comment.html());
  //   //$post.attr("data-index", index);
  //   if (index % 2 != 0){
  //     styleLeftComment($commentHtml);
  //     //console.log($("body").children("data-index").length);
  //   } 
  //   console.log("this is the commentHtml tempalte");
  //     console.log($commentHtml.html());
  //      $(whereId).append($commentHtml);

  //      function styleLeftComment( postSelector){
  //       postSelector.find("div").eq(0).removeClass("col-xs-4 sm-5 col-sm-offset-6");
  //       postSelector.find("div").eq(0).addClass("col-sm-5 col-sm-offset-1 postBlockLeft");
  //       postSelector.find("div h2").removeClass("secondaryColor").addClass("majorColor");
  //       postSelector.find("div p").removeClass("majorColor").addClass("secondaryColor");
  //       postSelector.find("div p span").removeClass("dateBoxRight").addClass("dateBoxLeft");
  //       postSelector.find("div").eq(1).find("div").eq(0).addClass("col-sm-offset-2 col-sm-pull-1");
  //       postSelector.find("div").eq(1).find("div div").eq(0).addClass("flRight");
  //       postSelector.find("div").eq(1).find("div div button").eq(0).removeClass("addCommentRight").addClass("addCommentLeft");
  //      }
  // }

  // Post.prototype.save = function(){
  //   Post.all.push(this);
  // }

  // Post.prototype.render = function(template_source, where) {
  //   var template = _.template($(template_source).html());
  //   //var index =  Post.all.indexOf(this);
  //   var index = this.id;
  //   var $postHtml = $(template(this));
  //   console.log("this is the posthtml--");
  //   console.log($postHtml);
  //   console.log("the this.id-");
  //   console.log(index);
  //   $postHtml.attr("data-index", index);

  //   console.log("the body data-index - count---");
  //   console.log($("body").find("div.postRow[data-index]").length);
  //   console.log($("body").find("div.postRow[data-index]"));

  //   //the styleIndex is used to have the styles switch sides from left to right.
  //   //it counts the number of postRows with a data index attribute. There is always one less
  //   //because the current post is hasn't got posted yet. so i add one to the number 
  //   //and it doesn't matter what the data index is only the amount of postRows and that they toggle.
  //   var styleIndex = $("body").find("div.postRow[data-index]").length;
  //   index++;
  //   var $parentRow = $("body").find("div.postRow[data-index]");
  //   //var flip = $parentRow.first("div").hasClass("postBlockLeft");
  //   console.log("parentRowsss")
  //   console.log($parentRow
  //                     .find("div.comment-target")
  //                     .eq(0) );
  //   //console.log("flip is --", flip);
  //   if (styleIndex % 2 != 0){
  //    //if(!flip){
  //    styleLeftPost($postHtml);
  //   var flip = true;
  //     //console.log($("body").children("data-index").length);

  //   }   // $postHtml.animate({opacity: '0.50'}, 1000);
  //      $(where).prepend($postHtml);
  //      if(flip){
  //        $parentRow.find("div.comment-target")
  //          .removeClass("col-xs-4 col-xs-offset-4 col-sm-4 col-sm-offset-7 commentBox")
  //          .addClass("col-xs-4 col-xs-offset-4 col-sm-4 col-sm-pull-3 commentBoxLeft");
  //      }
  //   function styleLeftPost(somePost){
  //      somePost.find("div").eq(0).removeClass("col-xs-4 sm-5 col-sm-offset-6 postBlockRight");
  //     somePost.find("div").eq(0).addClass("col-sm-5 col-sm-offset-1 postBlockLeft");
  //     somePost.find("div h2").removeClass("secondaryColor").addClass("majorColor");
  //     somePost.find("div p").removeClass("majorColor").addClass("secondaryColor");
  //     somePost.find("div span[data-hook='postDate']").removeClass("dateBoxRight").addClass("dateBoxLeft");
  //     somePost.find("div").eq(1).find("div").eq(0).addClass("col-sm-offset-2 col-sm-pull-1");
  //     somePost.find("div").eq(1).find("div div").eq(0).addClass("flRight");
  //     somePost.find("div").eq(1).find("div div button").eq(0).removeClass("addCommentRight").addClass("addCommentLeft");
  //   }
  // }

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

          console.log("the tempPost",tempPost);
          //ajax post info to server
          create(tempPost);


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


  // function addCommentFromPost(){ 
  //   console.log("add a comment");
  //   $(this).parent().parent().find("div.commentContainer").removeClass("hide");
  //   console.log($(this));     
  // }

  //submit button 
  $modalForm.on("submit", postToBlog);
  $makePostBtn.on("click", function(){
    $titleInput.focus();
  });

  // $("button.close").on("click", function(){
  //   $("body").removeClass("errorInput");
  // });
    
  // $("#blog-container").on("click", "button.launchComment", addCommentFromPost);

  // //setting up comment container template
  // $("#blog-container").on("click", "button.btn.txtAreaBtn", function(){
  //   var $commentRowBox = $(this).parent().parent().parent();
  //   console.log("commentRowBox-",$commentRowBox);
  //   console.log("data-index-", $commentRowBox.parent().attr("data-index") );
  //   var $comTarget = $commentRowBox.parent().find('div[class="comment-target"]');
  //   var $postRow = $commentRowBox.parent();
  //   var  sidePicker = $commentRowBox.parent().attr("data-index");
  //   var postIndex = sidePicker;
  //   var $txtAreaBox =$(this).parent().find("textarea:first");
  //   var $commentContainer = $txtAreaBox.parent();
  //   //var comTargetId = $comTarget.attr("id");
  //   //console.log($comTarget.attr("id"));
  //    //console.log("this should be ",comTargetId );
  //   //var targetId = $commentRowBox.parent().find('div[class="comment-target"]').attr("id");
  //   // var $row = $("<div class='row'></div>");
  //   //      var $col = null;
  //   //      if(sidePicker % 2 == 0){
  //   //        $col = $("<div class='col-xs-4 col-xs-offset-4 col-sm-4 col-sm-offset-7 commentBox'></div>");
  //   //      }else{
  //   //        $col = $("<div class='col-xs-4 col-xs-offset-4 col-sm-4 col-sm-pull-3 commentBoxLeft'></div>");

  //   //      }

  //        if ($txtAreaBox.val() == ""){
  //          console.log("textarea is empty");
  //          if(!$txtAreaBox.hasClass("errorInput") ){
  //             $txtAreaBox.addClass("errorInput");
  //             $txtAreaBox.prepend($("<div class='error'>Please enter Comment</div>") );
  //          }

  //        }else{
  //          $txtAreaBox.removeClass("errorInput");
  //          $txtAreaBox.find("div.error").remove(); 
  //          //$col.html($txtAreaBox.val().replace(/\n/gi, "<br />") );
  //          var tempCommentVal = $txtAreaBox.val();
  //          var comment1 = new Comment(tempCommentVal);

  //          console.log("new comment--");
  //          console.log(comment1);
  //          //comment1.render("#comment-template", comTargetId, $postRow );
  //          console.log("I just added comment to post", postIndex)
  //          console.log("HI Yall");

  //          Post.all.forEach(function(post){
  //           if(post.id == postIndex){
  //             var i = Post.all.indexOf(post);
  //             Post.all[i].comments.push(comment1);
  //             console.log("added comment to Post all index-", i);
  //             console.log(Post.all );
  //           }
  //          });
  //          $("#blog-container").empty();
  //          Post.all.forEach(function(post){
  //           post.render("#blog-template", "#blog-container");
  //          });
  //          //$row.html($col);
  //          //console.log($row.html() );
  //          //console.log("commentRowBox-",$commentRowBox);
  //          //$commentRowBox.append($row );
  //          $txtAreaBox.val("");
  //          $commentContainer.addClass("hide");
  //        }
  // });
  
  // open edit modal when you click button with class editPostBtn
  $("#blog-container").on("click", "button.editPostBtn", function(){
    var postId = $(this).attr("data-index");
    console.log("the postId is",postId);
    //get one Post info to put in edit fields
    getPost(postId);
  });

  // this deletes the post on click of delete btn
  $("#blog-container").on("click", "button.deletePostBtn", function(){
      var postIndex = $(this).attr("data-index");
      // Delete one post
      deletePost(postIndex)
  });

  // this submits the edited fields to server and updates each post row with new info using jquery
  $("#modalEditForm").on("click", ".editSubmitBtn", function(event){
    event.preventDefault();
    var editedPost = { id: $("#editTitleInput").attr("data-index"),
                       title: $("#editTitleInput").val(), 
                       body: $("#editPostBody").val()
                     };
    console.log("the edited Post", editedPost);
    //PUT update one post
    updatePost(editedPost);
    $("#closeEditBtn").trigger("click");

  });

  // $("#blog-container").on("click", "button.btn.txtAreaClose", function(){
  //   if($(this).parent().hasClass("errorInput") ){
  //     $(this).parent().removeClass("errorInput");
  //     $(this).parent().find("div.error").remove(); 
  //   }
  //   $(this).parent().find("textarea").val("");
  //   $(this).parent().toggleClass("hide");  
  // });

  
  //GET all posts
  function allPosts(){
    $.ajax({
      url: "/api/posts",
      type: "GET",
      success: function(data){
        renderMany(data, dateFormatter);
      }
    });

  }
  //create Post
  function create(postObj){
    $.ajax({
      url: "/api/posts",
      type: "POST",
      data: postObj,
      success: function(data){
      console.log(data);
      renderOne(data, dateFormatter);
      }
    });
  }
  //Update one Post
  function updatePost(postObj){
    $.ajax({
      url: "/api/posts/" + postObj.id,
      type: "PUT",
      data: postObj,
      success: function(data){
      console.log("the return put data", data);
      renderOneUpdate(data, dateFormatter);
      }
    });
  }
  //Delete one Post
  function deletePost(postId){
    $.ajax({
      url: "/api/posts/" + postId,
      type: "DELETE",
      success: function(data){
      //console.log("the return Delete data", data);
      //$("#blog-container").find("[data-index='"+ data._id +"']").remove();
      $("#blog-container").empty();
      renderMany(data, dateFormatter);
      }
    });

  }
  //GET one post by Id
  function getPost( postId){
    $.ajax({
      url: "/api/posts/" + postId,
      type: "GET",
      success: function(data){
        $("#editTitleInput").val(data.title);
        $("#editTitleInput").attr("data-index", data._id);
        $("#editPostBody").val(data.body);
      }
    });
  }

  // render Many post takes second argument of date formatter func
  function renderMany(posts ,func){
    posts.forEach(function(post){
      post.postDate = func(post.postDate);
      var template = _.template($("#blog-template").html());
      var $commentHtml = $(template(post));
      if( even() ){
        ltSide($commentHtml);
      } else{

      }
      $("#blog-container").prepend($commentHtml);
    });
  }
  // render One post function takes second
  function renderOne(post, func){
      post.postDate = func(post.postDate);
      var template = _.template($("#blog-template").html());
      var $commentHtml = $(template(post));
      if( even() ){
        ltSide($commentHtml);
      }
      $("#blog-container").prepend($commentHtml);
  }

  // render One post UPDate function takes second
  function renderOneUpdate(post, func){
      post.postDate = func(post.postDate);
      var $parentRow = $("#blog-container").find("div.postRow[data-index='" + post._id + "']")
      $parentRow.find("span[data-hook='postTitle']").text(post.title);
      $parentRow.find("span[data-hook='postBody']").text(post.body);
      $parentRow.find("span[data-hook='postDate']").text(post.postDate);
  }

  // date Formatter
  function dateFormatter( d_str){
    var date = d_str.split("T");
        date.splice(1);
    date = date.join().split("-");
    var year = date[0];
    var month = date[1];
    var day = date[2];
    date = month + "-" + day + "-" + year;
    return date;
    console.log(date); 
  }
  function ltSide($parentRow){
    //var $parentRow =$("#blog-container").find("div[data-index='" + rowId +"']");
    //console.log("this is parentRow classes", $("#blog-container").find("div[data-row='data-row']")  );
    $parentRow.find("div[data-row='data-row'].rt-side").removeClass("rt-side");
    $parentRow.find("div").eq(0).removeClass("col-xs-4 sm-5 col-sm-offset-6 postBlockRight");
    $parentRow.find("div").eq(0).addClass("col-sm-5 col-sm-offset-1 postBlockLeft");
    $parentRow.find("div h2").removeClass("secondaryColor").addClass("majorColor");
    $parentRow.find("div p").removeClass("majorColor").addClass("secondaryColor");
    $parentRow.find("div span[data-hook='postDate']").removeClass("dateBoxRight").addClass("dateBoxLeft");
    $parentRow.find("div").eq(1).find("div").eq(0).addClass("col-sm-offset-2 col-sm-pull-1");
    $parentRow.find("div").eq(1).find("div div").eq(0).addClass("flRight");
    $parentRow.find("div").eq(1).find("div div button").eq(0).removeClass("addCommentRight").addClass("addCommentLeft");

    // $parentRow.find("div.commentRow")
    //           .removeClass("col-xs-4 col-xs-offset-4 col-sm-4 col-sm-offset-7 commentBox")
    //           .addClass("col-xs-4 col-xs-offset-4 col-sm-4 col-sm-pull-3 commentBoxLeft");
    //$col = $("<div class='col-xs-4 col-xs-offset-4 col-sm-4 col-sm-offset-7 commentBox'></div>");
    //   //      }else{
    //   //        $col = $("<div class='col-xs-4 col-xs-offset-4 col-sm-4 col-sm-pull-3 commentBoxLeft'></div>");
  }

  function rtSide($parentRow){
    $
  }
  function even(){
    var count = $("#blog-container").find("div[data-row]");
    console.log("the count of postRows ",count.length +1 );
    if( (count.length + 1) % 2 == 0 ){
      return true;
    }
  }
  allPosts();
});

