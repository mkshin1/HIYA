const User = require("../models/user.model")
const Post = require("../models/post.model")

module.exports.findAllUsers = (req, res) => {
    User.find()
    .then(eachUser => res.json(eachUser))
    .catch(err => res.json({message: "there is an error here"}))
}

module.exports.findOneUser = (req, res) => {
    User.findOne({_id: req.params.id})
    .then(oneUser => res.json(oneUser))
    .catch(err => res.json({message: "there is an error here"}))
}

module.exports.createUser = (req, res) => {
    User.create(req.body)
    .then(createdUser => res.json(createdUser))
    .catch(err => res.status(400).json(err))
}

// module.exports.updateUser = (req, res) => {
//     favUser.findOneAndUpdate({_id: req.params.id},req.body, {new:true, runValidators: true})
//     .then(updatedUser => res.json({ User: updatedUser}))
//     .catch(err => res.status(400).json(err))
// }

module.exports.deleteUser = (request, response) => {
    User.deleteOne({ _id: request.params.id })
    .then(() => response.json("deleted User!"))
    .catch(err => response.json(err))
}

module.exports.likeUser = (req, res) => {
    console.log("request.params is an objeect!", request.params)
    favUser.findOneAndUpdate(
        request.params.id,
        {
            $inc:{
                likes: 1
            }
        },
            {
                new:true // returns the updated document
            }
            )
            .then(updated => res.json(updated))
            .catch(err => res.json(err))
        }

//     .then(likedUser => res.json({ User: likedUser}))
//     .catch(err => res.status(400).json(err))





