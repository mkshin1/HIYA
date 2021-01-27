const User = require("../models/user.model")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
// const Post = require("../models/post.model")

module.exports.findAllUsers = (req, res) => {
    User.find()
    .then(eachUser => res.json({ user: eachUser}))
    .catch(err => res.json({message: "there is an error from findAllUsers"}))
}

module.exports.findOneUser = (req, res) => {
    User.findOne({_id: req.params.id})
    .then(oneUser => res.json({ user: oneUser}))
    .catch(err => res.json({message: "there is an error from findOneUser"}))
}

module.exports.registerUser = (req, res) => {
    User.create(req.body)
    // console.log('req.body: ', req.body)
    .then(user => {
        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);

        res
            .cookie("usertoken", userToken, secret, {
                httpOnly: true
            })
            .json({ msg: "success!", user: user });
            // return user._id
    })
    .catch(err => res.json(err))
}

module.exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
    .then(() => res.json("deleted user!"))
    .catch(err => res.json(err))
}


module.exports.loginUser = async (req, res) => {

    const errorMessage = "Email or password is incorrect";

    try {
        const user = await User.findOne({email: req.body.email});
        if(user === null){
            throw new Error(errorMessage);
        }
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if(!correctPassword){
            console.log("Password incorrect for: " + req.body.email);
            throw new Error(errorMessage);
        }
        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);
        res
            .cookie("usertoken", userToken, {
                httpOnly: true
            })
            .json({message: "Success!", user: user});
    } catch {
        res.status(401).json({message: errorMessage});
    }
}

module.exports.logoutUser = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

