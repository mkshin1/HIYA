const User = require("../models/user.model")
// const Post = require("../models/post.model")

module.exports.findAllUsers = (req, res) => {
    User.find()
    .then(eachUser => res.json({ user: eachUser}))
    .catch(err => res.json({message: "there is an error here"}))
}

module.exports.findOneUser = (req, res) => {
    User.findOne({_id: req.params.id})
    .then(oneUser => res.json({ user: oneUser}))
    .catch(err => res.json({message: "there is an error here"}))
}

module.exports.registerUser = (req, res) => {
    User.create(req.body)
    .then(registeredUser => res.json({
        msg: "Success!", 
        user: registeredUser
    }))
    .catch(err => res.status(400).json(err))
}

// module.exports.updateAuthor = (req, res) => {
//     favAuthor.findOneAndUpdate({_id: req.params.id},req.body, {new:true, runValidators: true})
//     .then(updatedAuthor => res.json({ author: updatedAuthor}))
//     .catch(err => res.status(400).json(err))
// }

module.exports.deleteUser = (request, response) => {
    User.deleteOne({ _id: request.params.id })
    .then(() => response.json("deleted user!"))
    .catch(err => response.json(err))
}



