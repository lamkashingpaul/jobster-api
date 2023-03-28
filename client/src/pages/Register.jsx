import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Logo, FormRow } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from '../features/user/userSlice'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true
}

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading } = useSelector((store) => store.user)

  const [values, setValues] = useState(initialState)

  const toggleMember = () => {
    setValues(oldValues => ({ ...oldValues, isMember: !oldValues.isMember }))
  }

  const handleChange = (e) => {
    const key = e.target.name
    const value = e.target.value
    setValues(oldValues => ({ ...oldValues, [key]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const { name, email, password, isMember } = values
    if (!email || !password || (!isMember && !name)) {
      toast.error('please fill out all fields')
      return
    }

    if (isMember) {
      dispatch(loginUser({ email, password }))
    } else {
      dispatch(registerUser({ name, email, password }))
    }
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }, [user])

  return <Wrapper className="full-page">
    <form onSubmit={onSubmit} className="form">
      <Logo />
      <h3>{values.isMember ? 'Login' : 'Register'}</h3>
      {!values.isMember ? <FormRow type="text" name="name" value={values.name} handleChange={handleChange} /> : null}
      <FormRow type="email" name="email" value={values.email} handleChange={handleChange} />
      <FormRow type="password" name="password" value={values.password} handleChange={handleChange} />
      <button disabled={isLoading} className="btn btn-block" type="submit">
        {isLoading ? 'loading...' : 'submit'}
      </button>
      <button
        disabled={isLoading}
        className="btn btn-block"
        type="button"
        onClick={() => dispatch(loginUser({ email: 'testUser@test.com', password: 'secret' }))}
      >{isLoading ? 'loading...' : 'demo app'}</button>
      <p>
        {values.isMember ? 'Not a member yet?' : 'Already a member?'}
        <button className="member-btn" type="button" onClick={toggleMember}>
          {values.isMember ? 'Register' : 'Login'}
        </button>
      </p>
    </form>
  </Wrapper>
}

export default Register
