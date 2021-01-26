const mongoose = require("mongoose")

const User = new mongoose.Schema(
    {
        firstName: {
          type: String,
          required: [
            true,
            "First name is required"
          ],
          trim: true,
          minlength: [
            3,
            "First name must be 3 characters long"
          ]
        },
        lastName: {
          type: String,
          required: [
            true,
            "Last name is required"
          ],
          trim: true,
          minlength: [
            3,
            "Last name must be 3 characters long"
          ]
        },
        email: {
          type: String,
          required: [true, "Email is required"]
        },
        password: {
          type: String,
          required: [true, "Password is required"],
          minlength: [8, "Password must be 8 characters or longer"]
        }    
    }, { timestamps: true });

const User = mongoose.model("User", UserSchema)

const Post = new mongoose.Schema({
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
  author: {
    type: String, // will be JWT - tied to specific user
    required: [
      true,
      "Author name is required"
    ],
    trim: true,
    minlength: [
      3,
      "Author name must be 3 characters long"
    ]
  }, 
  body: {
    type: String, // will be JWT - tied to specific user
    required: [
      true,
      "Post body is required"
    ],
    trim: true,
    minlength: [
      3,
      "Post body must be 3 characters long"
    ]
  }, 
  comments: {
    body: {
      type: String,
      required: [
        true,
        "Post body is required"
      ],
      trim: true,
      minlength: [
        3,
        "Post body must be 3 characters long"
      ]
    },
    date: {
      type: Date,
      required: [
        true,
        "Please select a date"
      ]
    }
  },
  date: {
    type: Date,
    required: [
      true,
      "Please select a date"
    ],
    default: Date.now
  },
  meta: {
    likes: {
      type: Number
    }
  }
})

const Post = mongoose.model("Post", PostSchema)

module.exports = User, Post;


// https://mongoosejs.com/docs/guide.html
