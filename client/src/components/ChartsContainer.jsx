import React, { useState } from 'react'
import BarChart from './BarChart'
import AreaChart from './AreaChart'
import Wrapper from '../assets/wrappers/ChartsContainer'
import { useSelector } from 'react-redux'

const ChartsContainer = () => {
  const [showBarChart, setShowBarChart] = useState(true)
  const { monthlyApplications: data } = useSelector((store) => store.allJobs)

  return <Wrapper>
    <h4>Monthly Applications</h4>
    <button
      type="button"
      onClick={() => setShowBarChart((oldShowBarChart) => !oldShowBarChart)}
    >{showBarChart ? 'area chart' : 'bar chart'}</button>
    {showBarChart ? <BarChart data={data} /> : <AreaChart data={data} />}
  </Wrapper>
}

export default ChartsContainer
