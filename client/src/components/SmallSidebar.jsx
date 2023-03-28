import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { toggleSidebar } from '../features/user/userSlice'
import Logo from './Logo'
import NavLink from './NavLinks'

const SmallSidebar = () => {
  const dispatch = useDispatch()
  const { isSidebarOpen } = useSelector((store) => store.user)

  const toggle = () => dispatch(toggleSidebar())

  return <Wrapper>
    <div className={`sidebar-container${isSidebarOpen ? ' show-sidebar' : ''}`}>
      <div className="content">
        <button
          className="close-btn"
          onClick={toggle}
        ><FaTimes /></button>
        <header><Logo /></header>
        <NavLink toggleSidebar={toggle} />
      </div>
    </div>
  </Wrapper>
}

export default SmallSidebar
