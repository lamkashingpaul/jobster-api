import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { FormRow } from '../../components'
import { updateUser } from '../../features/user/userSlice'

const Profile = () => {
  const dispatch = useDispatch()
  const { isLoading, user } = useSelector((store) => store.user)

  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || ''
  })

  const handleChange = (e) => {
    const key = e.target.name
    const value = e.target.value
    setUserData(oldUserData => ({ ...oldUserData, [key]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !lastName || !location) {
      toast.error('please fill out all fields')
    }

    dispatch(updateUser(userData))
  }

  const { name, email, lastName, location } = userData

  return <Wrapper>
    <form onSubmit={onSubmit} className="form">
      <h3>profile</h3>
      <div className="form-center">
        <FormRow type="text" name="name" value={name} handleChange={handleChange} />
        <FormRow type="email" name="email" value={email} handleChange={handleChange} />
        <FormRow type="text" name="lastName" labelText="last name" value={lastName} handleChange={handleChange} />
        <FormRow type="text" name="location" value={location} handleChange={handleChange} />
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-block"
        >{isLoading ? 'please wait...' : 'save change'}</button>
      </div>
    </form>
  </Wrapper>
}

export default Profile
