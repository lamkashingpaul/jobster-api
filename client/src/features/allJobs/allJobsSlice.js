import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { getAllJobsThunk, showStatsThunk } from './allJobsThunk'

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a']
}

const initialState = {
  isLoading: true,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState
}

export const getAllJobs = createAsyncThunk(
  'allJobs/getAllJobs', getAllJobsThunk
)

export const showStats = createAsyncThunk(
  'allJobs/showStats', showStatsThunk
)

const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true
    },
    hideLoading: (state) => {
      state.isLoading = false
    },
    handleSearch: (state, { payload }) => {
      const { key, value } = payload
      state.page = 1
      state[key] = value
    },
    clearFilters: (state) => {
      return {
        ...state,
        ...initialFiltersState
      }
    },
    changePage: (state, { payload }) => {
      console.log(payload)
      state.page = payload
    },
    clearAllJobsState: (state) => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.jobs = payload.jobs
        state.totalJobs = payload.totalJobs
        state.numOfPages = payload.numOfPages
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })

    builder
      .addCase(showStats.pending, (state) => {
        state.isLoading = true
      })
      .addCase(showStats.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.stats = payload.defaultStats
        state.monthlyApplications = payload.monthlyApplications
      })
      .addCase(showStats.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  }
})

export const {
  showLoading,
  hideLoading,
  handleSearch,
  clearFilters,
  changePage,
  clearAllJobsState
} = allJobsSlice.actions

export default allJobsSlice.reducer
