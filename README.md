# Hiya! 
**Micro blogging and social media platform using MongoDB/Mongoose, Express, React, and Node.**

**Front-End:** React, HTML, CSS, Material-UI

**Back-End:** Express, MongoDB, Mongoose, Node

This project was created during my time at Coding Dojo. 

## Overview
- Create and login for users through use of MERN Authorization and Authentication
- Utilized email vaidation through use of Regex.
- Mongoose virtuals, used to confirm passwords without saving into MongoDB, and Middleware are added as another layer of validation.
- To ensure passwords are secure, Bcrypt is enforced for hashing passwords. 
- JSON Web Tokens are used to keep track of logged in users.
- Add, update, like and remove blog posts through use Mongoose CRUD operations.

### Login and Registration
Users can register and login to personalized accounts.

![alt text](https://media.giphy.com/media/1pwBZ4TpiTN7kFw2fG/giphy.gif)

### Dashboard
Once logged in, the main dashboard shows all actvity of other Hiya users.

![alt text](https://media.giphy.com/media/gpUgROfWjEHV89Xdfd/giphy.gif)

### Post Details
When looking at a specific post, users can add comments or like the post.

![alt text](https://media.giphy.com/media/QWxEtcTkPMnyNGaWhP/giphy.gif)

### Create, Update and Delete Posts
Add, edit and remove posts from users account.

![alt text](https://media.giphy.com/media/z4mxRRSIKV4GKMyGlx/giphy.gif)

### Interact with Posts by Liking
Like posts by clicking on the heart :white_heart:

![alt text](https://media.giphy.com/media/8LmoEgs0RxjAp7HnEh/giphy.gif)

## Challenges and Notes
- Logout is not functioning, could potentially be due to the usertoken cookie.
- When looking at a specific post, date format is incorrectly displayed. Will need to alter post model's date attribute. 
- Unable to display the name of a comment's author, currently displays the author's ID. Possible solution is change the comment model's creator attribute to include a type and reference. 
- Hopeful additions to this project would be:
  - Utilizing socket.io for real-time chat with users
  - Navigational panel to access various pages
  - Dark mode
- This project was ambitious for my partner and myself. We wanted to achieve a successful fullstack application using Mongoose, Express, React and Node while also learning authorization and authentication. It was a steep learning curve, and with a bit of proper guidance, this application could reach it's full potential. 
