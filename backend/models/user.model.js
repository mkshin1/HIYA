const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required."],
    trim: true,
    minlength: [
      3,
      "First name must be 3 characters long."
    ]
  },
  lastName: {
    type: String,
    required: [true, "Last name is required."],
    trim: true,
    minlength: [
      3,
      "Last name must be 3 characters long."
    ]
  },
  email: {
    type: String,
    unique: [true, "Oops! Email already exists."],
    required: [true, "Email is required."],
    validate: {
      validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid email"
    }
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minlength: [8, "Password must be at least 8 characters."]
  }
}, {timestamps: true});



// allows us to compare password with it
UserSchema.virtual('confirmpw')
.get( () => this.confirmpw )
.set( value => this.confirmpw = value );

// extra check to compare input pw with confirmed pw
UserSchema.pre('validate', function(next) {
  if (this.password !== this.confirmpw) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
  }
  next();
});

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});


const User = mongoose.model("User", UserSchema)
module.exports = User;