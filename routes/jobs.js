const express = require('express')

const demoUserMiddleware = require('../middleware/testUser')

const jobsRouter = express.Router()
const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats
} = require('../controllers/jobs')

jobsRouter.route('/').get(getAllJobs).post(demoUserMiddleware, createJob)

jobsRouter.route('/stats').get(showStats)

jobsRouter.route('/:id').get(getJob).patch(demoUserMiddleware, updateJob).delete(demoUserMiddleware, deleteJob)

module.exports = jobsRouter
