const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  user: {
    type:String,
    required:true,
  },
  message: String,
})

module.exports = mongoose.model('Message', messageSchema)