const mongoose = require("mongoose");

// Define the User schema with unique email to avoid duplicates
const UserSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: {
    type: String,
    unique: true,
    required: true, // Ensure email is always provided
  },
  password: {
    type: String,
    required: true, // Ensure password is always provided
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel; // Export the model
