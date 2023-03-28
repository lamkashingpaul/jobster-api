import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { getUserFromLocalStorage } from '../../utils/localStorage'
import { createJobThunk, deleteJobThunk, editJobThunk } from './jobThunk'

const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: ''
}

export const createJob = createAsyncThunk(
  'job/createJob', createJobThunk
)

export const deleteJob = createAsyncThunk(
  'job/deleteJob', deleteJobThunk
)

export const editJob = createAsyncThunk(
  'job/editJob', editJobThunk
)

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    clearJob: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || ''
      }
    },
    updateJob: (state, { payload }) => {
      const { key, value } = payload
      state[key] = value
    },
    setEditJob: (state, { payload }) => {
      return {
        ...state,
        ...payload,
        isEditing: true
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createJob.fulfilled, (state) => {
        state.isLoading = false
        toast.success('job created')
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })

    builder
      .addCase(deleteJob.fulfilled, (state, { payload }) => {
        toast.success(payload)
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        toast.error(payload)
      })

    builder
      .addCase(editJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editJob.fulfilled, (state, { payload }) => {
        state.isLoading = false
        toast.success('job modified')
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  }
})

export const { clearJob, updateJob, setEditJob } = jobSlice.actions

export default jobSlice.reducer
