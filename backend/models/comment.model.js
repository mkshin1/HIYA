const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  body: {
    type: String,
  } 
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;