const User = require('../models/User')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const register = async (req, res) => {
  const user = await User.create(req.body)
  const token = user.createJWT()
  res
    .status(StatusCodes.CREATED)
    .json({
      user: {
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        location: user.location,
        token
      }
    })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }

  const user = await User.findOne({ email })
  if (!user || !await user.comparePassword(password)) {
    throw new UnauthenticatedError('Invalid credentials')
  }

  const token = user.createJWT()

  res
    .status(StatusCodes.OK)
    .json({
      user: {
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        location: user.location,
        token
      }
    })
}

const updateUser = async (req, res) => {
  const { userId } = req.user
  const { name, email, lastName, location } = req.body

  if (!name || !email || !lastName || !location) {
    throw new BadRequestError('Please provide all values')
  }

  const user = await User.findOneAndUpdate({ _id: userId }, { name, email, lastName, location }, { new: true, runValidators: true })
  await user.save()
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      location: user.location,
      token: user.createJWT()
    }
  })
}

module.exports = {
  register,
  login,
  updateUser
}
