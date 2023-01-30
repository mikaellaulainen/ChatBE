const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

usersRouter.post('/', async (req,res) => {
  const {username,password,email} = req.body
  
  console.log(password.length)
  if(password.length < 8){
    return res.status(401).json({
      error:'Password too short'
    })
  }
  
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
    email
  })
  const savedUser = await user.save()
  res.status(201).json(savedUser)

})



module.exports = usersRouter