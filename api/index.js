import express from 'express'
import recaptchaController from './controllers/recaptcha'

const ExpressBrute = require('express-brute')
const store = new ExpressBrute.MemoryStore() // stores state locally, don't use this in production
const bruteforce = new ExpressBrute(store, {
  minWait: 1000,
  maxWait: 60 * 60 * 1000
})

const app = express()

app.use(express.json())

app.post('/recaptcha', bruteforce.prevent, recaptchaController)

module.exports = {
  path: '/api',
  handler: app
}