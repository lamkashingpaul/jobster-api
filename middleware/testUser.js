const { BadRequestError } = require('../errors')

const testUserMiddleware = (req, res, next) => {
  if (req.user.isTestUser) {
    throw new BadRequestError('Test User. Read Only!')
  }
  next()
}

module.exports = testUserMiddleware
