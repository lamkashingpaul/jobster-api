import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../assets/wrappers/JobsContainer'
import { getAllJobs } from '../features/allJobs/allJobsSlice'
import { Job, Loading, PageBtnContainer } from '.'

const JobsContainer = () => {
  const dispatch = useDispatch()
  const {
    isLoading,
    jobs,
    page,
    totalJobs,
    numOfPages,
    search,
    searchType,
    searchStatus
  } = useSelector((store) => store.allJobs)

  useEffect(() => {
    dispatch(getAllJobs())
  }, [page, search, searchType, searchStatus])

  if (isLoading) {
    return <Wrapper>
      <Loading center />
    </Wrapper>
  }

  if (jobs.length === 0) {
    return <Wrapper>
      <h2>No jobs to display...</h2>
    </Wrapper>
  }

  return <Wrapper>
    <h5>{totalJobs} Job{jobs.length > 1 ? 's' : null} found</h5>
    <div className="jobs">
      {jobs.map((job) => {
        return <Job key={job._id} {...job} />
      })}
    </div>
    {numOfPages > 1 ? <PageBtnContainer /> : null}
  </Wrapper>
}

export default JobsContainer
