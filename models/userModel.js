const mongoose = require ('mongoose')


const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please add your name"],
      trim: true,
      maxLength: [20, "Your name should be 20 chars long."]
    },

    email: {
      type: String,
      required: [true, "Please add your email"],
      trim: true,
      unique: true
    },

    password: {
      type: String,
      required: [true, "Please add your password"]
    },

    
    role: {
      type: String,
      default: 'user' // admin 
    },

  }, {
    timestamps: true
  })
  
  const user = new mongoose.model("User", userSchema)

  module.exports = user;