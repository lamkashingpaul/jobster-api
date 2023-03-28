import React, { useEffect } from 'react'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useDispatch, useSelector } from 'react-redux'
import { FormRow, FormRowSelect } from '../../components'
import { toast } from 'react-toastify'
import { clearJob, updateJob, createJob, editJob } from '../../features/job/jobSlice'

const AddJob = () => {
  const dispatch = useDispatch()
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    isEditing,
    editJobId
  } = useSelector((store) => store.job)

  const { user } = useSelector((store) => store.user)

  const handleChange = (e) => {
    const key = e.target.name
    const value = e.target.value
    dispatch(updateJob({ key, value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!position || !company || !jobLocation) {
      toast.error('please fill out all fields')
    }

    if (!isEditing) {
      dispatch(createJob({ position, company, jobLocation, jobType, status }))
    } else {
      dispatch(editJob({
        jobId: editJobId,
        job: { position, company, jobLocation, jobType, status }
      }))
    }
  }

  useEffect(() => {
    const defaultLocation = isEditing ? jobLocation : user.location
    dispatch(updateJob({ key: 'jobLocation', value: defaultLocation }))
  }, [])

  return <Wrapper>
    <form onSubmit={onSubmit} className="form">
      <h3>{isEditing ? 'edit job' : 'add job'}</h3>
      <div className="form-center">
        <FormRow type="text" name="position" value={position} handleChange={handleChange} />
        <FormRow type="text" name="company" value={company} handleChange={handleChange} />
        <FormRow type="text" name="jobLocation" labelText="job location" value={jobLocation} handleChange={handleChange} />
        <FormRowSelect name="status" value={status} options={statusOptions} handleChange={handleChange} />
        <FormRowSelect name="jobType" value={jobType} labelText="job type" options={jobTypeOptions} handleChange={handleChange} />
        <div className="btn-container">
          <button
            disabled={isLoading}
            type="button"
            className="btn btn-block clear-btn"
            onClick={() => dispatch(clearJob())}
          >clear</button>
          <button
            disabled={isLoading}
            type="submit"
            className="btn btn-block submit-btn"
          >submit</button>
        </div>
      </div>
    </form>
  </Wrapper>
}

export default AddJob
