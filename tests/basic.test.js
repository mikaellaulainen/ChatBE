const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Message = require('../models/chat')

const initialMessages=[
  {
    user:'First_user',
    message:'Hello world'
  },
  {
    user:'Mega_user',
    message:'This is testing mate'
  }
]


describe('Message saving:', () => {
  beforeEach(async () => {
    await Message.deleteMany({})
    let messageObject = new Message(initialMessages[0])
    await messageObject.save()
    messageObject = new Message(initialMessages[1])
    await messageObject.save()
  })

  test('messages are returned as json', async () => {
    await api
      .get('/api/messages')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('Both messages are there', async () => {
    const res = await api.get('/api/messages')
  
    expect(res.body).toHaveLength(initialMessages.length)
  })
  
  test('first message is hello world', async () => {
    const res = await api.get('/api/messages')
  
    expect(res.body[0].message).toBe('Hello world')
  })
})

test('Adding new message works', async () => {
  const newMessage = {
    user: 'masa',
    message:'HElLOLOL'
  }

  await api
    .post('/api/messages')
    .send(newMessage)
    .expect(201)
})

test('adding message without user doesnt work', async () =>{
  const newMessage= {
    message:'ifjwafowe'
  }
  await api.post('/api/messages').send(newMessage).expect(400)
})
afterAll(async () => {
  await mongoose.connection.close()
})
