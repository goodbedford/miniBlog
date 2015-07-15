var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    Comment = require("./comment.js"),
    Author = require("./author.js");

var PostSchema = new Schema({
    author: {type: Schema.Types.ObjectId,
             ref: "Author"
           },
    title: {type: String, default: ""},
    body: {type: String, default: ""},
    postDate: { type: Date, default: Date.now } ,
    comments: [Comment]
  });




var Post = mongoose.model("Post", PostSchema);


module.exports = Post;