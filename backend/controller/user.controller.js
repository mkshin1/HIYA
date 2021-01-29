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
    // const existingEmailMessage = "Oops! Email already exists."

    User.create(req.body)
    // console.log('req.body: ', req.body)
    .then(user => {
        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);

        res.status(200)
            .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                httpOnly: true
            })
            .json({ msg: "success!", user: user });
            // return user._id
    })
    .catch(err => {
        if (err.errors) {
            res.status(400).json(err)
            console.log('this is from register user error')
        } else {
            res.status(400).json(
            // console.log("Error mesage from else catch ", err.message)
            {
                message: "Oops! Email already exists.",
            }
            )
        }
    })
}

module.exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
    .then(() => res.json("deleted user!"))
    .catch(err => res.json(err))
}


module.exports.loginUser = async (req, res) => {

    const errorMessage = "Oops! Email or password is incorrect.";


    try {
        // console.log('At the top of Log In: ', errorMessage)
        const user = await User.findOne({email: req.body.email});
        // console.log('Inside of Log In: ', errorMessage)
        if(user === null){
            // console.log('Error Message from Log In: ', errorMessage)
            throw new Error(errorMessage);
        }
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if(!correctPassword){
            console.log("Password incorrect for: " + req.body.email);
            throw new Error(errorMessage);
        }
        // if (user.email) {
        //     throw new Error(existingEmailMessage);
        //     console.log('Email already exists ')
        // }

        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);
        // console.log('Also Here! ', errorMessage)
        res
            .cookie("usertoken", userToken, {
                httpOnly: true
            })
            .json({message: "Success!", user: user});
            // console.log('Hereeeeee! ', errorMessage)
    } catch {
        // console.log('Error Message from Catch in Log In: ', errorMessage)
        res.status(401).json({message: errorMessage});
    }
}

module.exports.logoutUser = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

