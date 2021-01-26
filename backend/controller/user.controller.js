const User = require("../models/user.model")
const jwt = require("jsonwebtoken");
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
    .catch(err => res.json(err));
}

module.exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
    .then(() => res.json("deleted user!"))
    .catch(err => res.json(err))
}


module.exports.loginUser = async (req, res) => {
    const user = await User.findOneUser({ email: req.body.email });

    if(user === null) {
        // email not found in users collection
        return res.sendStatus(400).send('User not found!');
    }

    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if(!correctPassword) {
        // password wasn't a match!
        return res.sendStatus(400);
    }

    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);

    // note that the response object allows chained calls to cookie and json
    res
        .cookie("usertoken", userToken, secret, {
            httpOnly: true
        })
        .json({ msg: "success!" });
}

module.exports.logoutUser = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

