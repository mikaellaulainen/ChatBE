const messagesRouter = require('express').Router()
const Message = require('../models/chat')


messagesRouter.get('/', async (req,res) => {
  const messages = await Message.find({})
  res.json(messages)
})

messagesRouter.post('/', (req,res,next) => {
  const body = req.body

  const message = new Message({
    user: body.user,
    message: body.message
  })

  message.save().then(savedMessage => {
    res.status(201).json(savedMessage)
  }).catch(error => next(error))
})

module.exports = messagesRouter