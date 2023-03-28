import React from 'react'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { useSelector, useDispatch } from 'react-redux'
import { changePage } from '../features/allJobs/allJobsSlice'

const PageBtnContainer = () => {
  const dispatch = useDispatch()
  const { page, numOfPages } = useSelector((store) => store.allJobs)

  const pages = Array.from({ length: numOfPages }, (_, i) => i + 1)

  const togglePage = (delta) => {
    dispatch(changePage((page - 1 + delta + numOfPages) % numOfPages + 1))
  }

  return <Wrapper>
    <button type="button" className="prev-btn" onClick={() => togglePage(-1)}>
      <HiChevronDoubleLeft />
      prev
    </button>
    <div className="btn-container">
      {pages.map((x) => {
        return <button
          key={x}
          type="button"
          className={`pageBtn${x === page ? ' active' : ''}`}
          onClick={() => dispatch(changePage(x))}
        >{x}</button>
      })}
    </div>
    <button type="button" className="next-btn" onClick={() => togglePage(1)}>
      <HiChevronDoubleRight />
      next
    </button>
  </Wrapper>
}

export default PageBtnContainer
