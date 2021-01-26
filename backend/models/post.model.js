const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [
      true,
      "Post title is required"
    ],
    trim: true,
    minlength: [
      3,
      "Post title must be 3 characters long"
    ]
  }, 
  // author: {
  //   type: mongoose.Schema.Types.ObjectID,
  //   ref: 'User', // will be JWT - tied to specific user
  // }, 
  body: {
    type: String, 
    required: [
      true,
      "Post body is required."
    ],
    imageUrl: String,
    trim: true,
    minlength: [
      3,
      "Post body must be 3 characters long."
    ]
  }, 
  comments:{
    type: [mongoose.Schema.Types.ObjectID],
    ref: 'Comment' // tells Mongoose which model to populate documents from
  },
  date: {
    type: Date,
    default: Date.now
  },
  meta: {
    likes: {
      type: Number
    }
  }
})

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;