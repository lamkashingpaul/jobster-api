import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage
} from '../../utils/localStorage'

import {
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
  clearStoreThunk
} from './userThunk'

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage()
}

export const registerUser = createAsyncThunk(
  'user/registerUser', registerUserThunk
)

export const loginUser = createAsyncThunk(
  'user/loginUser', loginUserThunk
)

export const updateUser = createAsyncThunk(
  'user/updateUser', updateUserThunk
)

export const clearStore = createAsyncThunk(
  'user/clearStore', clearStoreThunk
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    logoutUser: (state, { payload }) => {
      state.user = null
      state.isSidebarOpen = false
      removeUserFromLocalStorage()
      if (payload) {
        toast.success(payload)
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload
        state.user = user
        addUserToLocalStorage(user)
        toast.success(`hello there ${user.name}`)
        state.isLoading = false
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        toast.error(payload)
        state.isLoading = false
      })

    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload
        state.user = user
        addUserToLocalStorage(user)
        toast.success(`welcome back ${user.name}`)
        state.isLoading = false
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })

    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload
        state.user = user
        addUserToLocalStorage(user)
        toast.success('user updated!')
        state.isLoading = false
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        toast.error(payload)
        state.isLoading = false
      })

    builder
      .addCase(clearStore.rejected, (state) => {
        toast.error('something went wrong...')
      })
  }
})

export const { toggleSidebar, logoutUser } = userSlice.actions

export default userSlice.reducer
