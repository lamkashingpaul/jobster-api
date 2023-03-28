require('dotenv').config()
require('express-async-errors')
require('mongoose').set('strictQuery', false)

const path = require('path')

// extra security package
const helmet = require('helmet')
const xss = require('xss-clean')

const connectDB = require('./db/connect')

const express = require('express')
const app = express()

const authenticationMiddleware = require('./middleware/authentication')

const authenticationRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// extra packages
app.set('trust proxy', 1)

app.use(express.static(path.resolve(__dirname, '../client/dist/')))
app.use(express.json())
app.use(helmet())
app.use(xss())

// routes
app.use('/api/v1/auth', authenticationRouter)
app.use('/api/v1/jobs', authenticationMiddleware, jobsRouter)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
