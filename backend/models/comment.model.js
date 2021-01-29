const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  body: {
    type: String,
  } ,
  creator: {
    type: String
  }
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;