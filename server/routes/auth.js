const express = require('express')
const authenticationMiddleware = require('../middleware/authentication')
const testUserMiddleware = require('../middleware/testUser')

const rateLimiter = require('express-rate-limit')
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    msg: 'Too many requests from this IP, please try again after 15 minutes'
  }
})

const authenticationRouter = express.Router()

const { register, login, updateUser } = require('../controllers/auth')

authenticationRouter.use('/register', apiLimiter)
authenticationRouter.use('/login', apiLimiter)

authenticationRouter.route('/register').post(register)
authenticationRouter.route('/login').post(login)
authenticationRouter.route('/updateUser').patch(authenticationMiddleware, testUserMiddleware, updateUser)

module.exports = authenticationRouter
