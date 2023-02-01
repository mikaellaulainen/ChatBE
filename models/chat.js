const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  user: {
    type:String,
    required:true,
  },
  message:{
    type:String,
    required:true,
    minlenght:2,
  } 
},
{ timestamps:{createdAt:true, updatedAt:false} }
)

module.exports = mongoose.model('Message', messageSchema)