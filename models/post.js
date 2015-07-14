var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: String,
    body:String,
    postDate: { type: Date, default: Date.now } 
  });

var Post = mongoose.model("Post", PostSchema);


module.exports = Post;