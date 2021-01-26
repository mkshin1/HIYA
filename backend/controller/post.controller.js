const Post = require("../models/post.model");
const Comment = require('../models/comment.model');

  module.exports.findAllPosts = (req, res) => {
    Post.find().populate("comments")
    .then(eachPost => res.json(eachPost))
    .catch(err => res.json({message: "there is an error here"}))
  }

  module.exports.findOnePost = (req, res) => {
    Post.findOne({_id: req.params.id})
    .then(onePost => res.json(onePost))
    .catch(err => res.json({message: "there is an error here"}))
  }

  module.exports.createPost = (req, res) => {
    Post.create(req.body)
    .then(createdPost => res.json(createdPost))
    .catch(err => res.status(400).json(err))
  }

  module.exports.updatePost = (req, res) => {
    Post.findOneAndUpdate({_id: req.params.id}, req.body, {
      new: true, 
      runValidators: true
    })
    .then(updatedPost => res.json(updatedPost))
    .catch(err => res.status(400).json(err))
  }
  
  module.exports.deletePost = (request, response) => {
    Post.deleteOne({ _id: request.params.id })
    .then(() => response.json("deleted post!"))
    .catch(err => response.json(err))
  }

  module.exports.likePost = (req, res) => {
    console.log("request.params is an object!", request.params)
    Post.findOneAndUpdate(
      request.params.id,
      {
        $inc: {
            likes: 1
        }
      },
      {
        new:true // returns the updated document
      })
        .then(updated => res.json(updated))
        .catch(err => res.json({error: err}))
  }

// use async, create comment & then update post
module.exports.addComment = async (req, res) => {
  
// async / await
  try {
    // Create the comment and get the comment object that was created
    const comment = await Comment.create(req.body)

    // Get the post by ID from the req.params
    let post = await Post.findById(req.params.id).exec()
    // Push the comment id into the comments array
    post.comments.push(comment._id)
    // Save in the database
    await post.save()

    // If no errors, return status 200 and the comment object
    res.status(200).json(comment)
  } catch (error) {
    // If any errors in the block above, status 400 and the error object
    res.status(400).json(error)
  }
}