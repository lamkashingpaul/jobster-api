const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please provide company name'],
    maxLength: 50
  },

  position: {
    type: String,
    required: [true, 'Please provide position'],
    maxLength: 100
  },

  status: {
    type: String,
    enum: {
      values: ['interview', 'declined', 'pending'],
      message: ''
    },
    default: 'pending'
  },

  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user']
  },

  jobLocation: {
    type: String,
    default: 'my city',
    required: [true, 'Please provide job location'],
    maxLength: 20
  },

  jobType: {
    type: String,
    enum: {
      values: ['full-time', 'part-time', 'remote', 'internship'],
      message: ''
    },
    default: 'full-time'
  }

}, { strict: 'throw', timestamps: true })

module.exports = mongoose.model('Job', JobSchema)
