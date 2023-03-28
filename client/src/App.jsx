import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Error, Landing, Register, ProtectedRoute } from './pages'

import { AddJob, AllJobs, Profile, SharedLayout, Stats } from './pages/dashboard'

const App = () => {
  return <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Routes>
      <Route path="/" element={<ProtectedRoute><SharedLayout /></ProtectedRoute>}>
        <Route index element={<Stats />}></Route>
        <Route path="all-jobs" element={<AllJobs />}></Route>
        <Route path="add-job" element={<AddJob />}></Route>
        <Route path="profile" element={<Profile />}></Route>
      </Route>
      <Route path="landing" element={<Landing />}></Route>
      <Route path="register" element={<Register />}></Route>
      <Route path="*" element={<Error />}></Route>
    </Routes>
    <ToastContainer position="top-center" />
  </BrowserRouter>
}

export default App
