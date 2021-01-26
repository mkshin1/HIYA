const mongoose = require("mongoose")


mongoose.connect("mongodb://localhost/hiya", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log("connected!"))
.catch(err => console.log("failed to connect"))
