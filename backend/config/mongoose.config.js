const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/hiya", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("connected!"))
.catch(err => console.log("failed to connect"))
