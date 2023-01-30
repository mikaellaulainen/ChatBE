const messagesRouter = require('express').Router()
const Message = require('../models/chat')


messagesRouter.get('/',(req,res) => {
  Message.find({}).then(messages => {
    res.json(messages)
  })
})

messagesRouter.post('/', (req,res) => {
  const body = req.body

  const message = new Message({
    user: body.user,
    message: body.message
  })

  message.save().then(savedMessage => {
    res.json(savedMessage)
  })
})

module.exports = messagesRouter