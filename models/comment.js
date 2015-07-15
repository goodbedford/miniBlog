var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
    body: {type: String, default: ""},
    commentDate: { type: Date, default: Date.now }
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment; 



