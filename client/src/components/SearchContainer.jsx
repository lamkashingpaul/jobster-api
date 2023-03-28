import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../assets/wrappers/SearchContainer'
import { clearFilters, handleSearch } from '../features/allJobs/allJobsSlice'
import { FormRow, FormRowSelect } from '.'

const SearchContainer = () => {
  const dispatch = useDispatch()
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job)
  const {
    isLoading,
    searchStatus,
    searchType,
    sort,
    sortOptions
  } = useSelector((store) => store.allJobs)

  const [localSearch, setLocalSearch] = useState('')

  const handleChange = (e) => {
    dispatch(handleSearch({ key: e.target.name, value: e.target.value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setLocalSearch('')
    dispatch(clearFilters())
  }

  const debounce = () => {
    let timeoutId
    return (e) => {
      setLocalSearch(e.target.value)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        handleChange(e)
      }, 500)
    }
  }

  const optimizedDebounce = useMemo(() => debounce(), [])

  return <Wrapper>
    <form className="form">
      <h4>search form</h4>
      <div className="form-center">
        <FormRow type="text" name="search" value={localSearch} handleChange={optimizedDebounce} />
        <FormRowSelect
          name="searchStatus"
          value={searchStatus}
          handleChange={handleChange}
          options={['all', ...statusOptions]}
          labelText="status"
        />
        <FormRowSelect
          name="searchType"
          value={searchType}
          handleChange={handleChange}
          options={['all', ...jobTypeOptions]}
          labelText="type"
        />
        <FormRowSelect
          name="sort"
          value={sort}
          handleChange={handleChange}
          options={sortOptions}
        />
        <button
          disabled={isLoading}
          type="submit"
          className="btn btn-block btn-danger"
          onClick={onSubmit}
        >clear</button>
      </div>
    </form>
  </Wrapper>
}

export default SearchContainer
