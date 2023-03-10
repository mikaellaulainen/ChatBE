const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 5,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true,
    minlength:1,
  },
  email: {
    type: String,
    required:true,
    unique:true
  }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.passwordHash
  }
})


userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)