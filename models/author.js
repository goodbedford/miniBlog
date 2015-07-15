var mongoose = require("mongoose"),
    Schema = mongoose.Schema;


var AuthorSchema = new Schema({
  name: {type: String, default: ""}
});


var Author = mongoose.model("Author", AuthorSchema);

module.exports = Author;