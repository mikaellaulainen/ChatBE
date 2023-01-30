const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

const messagesRouter = require('./controllers/messages')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')


mongoose.set('strictQuery', false)

logger.info(`Connecting to ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to database')
  })
  .catch((error) => {
    logger.error(`Connection error ${error.message}`)
  })

app.use(express.json())
app.use(cors())

app.use(middleware.requestLogger)



app.use('/api/messages', messagesRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports= app