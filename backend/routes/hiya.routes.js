const Users = require('../controller/user.controller');
const { authenticate } = require('../config/jwt.config');
const userController = require("../controller/user.controller")
const postController = require("../controller/post.controller")

module.exports = app => {
    app.get("/api/users", authenticate, userController.findAllUsers);
    app.get("/api/user/:id", authenticate, userController.findOneUser)
    app.post("/api/user/register", userController.registerUser)
    app.post("/api/user/login", userController.loginUser)
    // app.post("/api/user/add", userController.createUser)
    // app.post("/api/User/:id/likes", userController.likeUser)
    // app.put("/api/update-user/:id", userController.updateUser)
    app.delete('/api/user/:id', userController.deleteUser)
    app.get("/api/user/logout", userController.logoutUser)

    app.get("/api/posts", postController.findAllPosts)
    app.get("/api/post/:id", postController.findOnePost)
    app.post("/api/post/add", postController.createPost)
    app.post("/api/post/:id/likes", postController.likePost)
    app.put("/api/post/:id/update", postController.updatePost)
    app.delete('/api/post/:id', postController.deletePost)

    app.post("/api/post/:id/addComment", postController.addComment)

}

 // app.get("/api/users", userController.findAllUsers)
