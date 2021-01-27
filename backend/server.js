const express = require('express');
const cors = require('cors')
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
// const dotenv = require("dotenv")

require('./config/mongoose.config');

require('dotenv').config({ path: __dirname + '/./.env' }
);

// app.use(cors())

// whenever we make an axios POST, include withCredentials:true as argument
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: "http://localhost:3000"}));
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Credentials", true);
//     next();
// });
app.use(cookieParser());

require('./routes/hiya.routes')(app);

app.listen(8000, () => {
    console.log("Listening at Port 8000")
})


