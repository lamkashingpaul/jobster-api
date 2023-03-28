import React from 'react'
import { Link } from 'react-router-dom'
import notFoundSVG from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'

const Error = () => {
  return <Wrapper className="full-page">
    <div>
      <img src={notFoundSVG} alt="not found" />
      <h3>Ohh! Page Not Found</h3>
      <p>We can&apos;t seem to found the page you&apos;re looking for</p>
      <Link to="/">back home</Link>
    </div>
  </Wrapper>
}

export default Error
