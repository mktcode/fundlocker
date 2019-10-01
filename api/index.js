import express from 'express'

import recaptchaController from './controllers/recaptcha'
import getBalancesController from './controllers/get-balances'
import createDepositController from './controllers/create-deposit'

const ExpressBrute = require('express-brute')
const store = new ExpressBrute.MemoryStore() // stores state locally, don't use this in production
const bruteforce = new ExpressBrute(store, {
  minWait: 1000,
  maxWait: 60 * 60 * 1000
})

const app = express()

app.use(express.json())

app.post('/recaptcha', bruteforce.prevent, recaptchaController)
app.get('/balances', getBalancesController)
app.post('/deposit', bruteforce.prevent, createDepositController)

module.exports = {
  path: '/api',
  handler: app
}
