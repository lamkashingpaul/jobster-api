import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import { Logo } from '../components'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar, clearStore } from '../features/user/userSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.user)

  const [showDropdown, setShowDropdown] = useState(false)

  return <Wrapper>
    <div className="nav-center">
      <button
        type="button"
        className="toggle-btn"
        onClick={() => dispatch(toggleSidebar())}
      ><FaAlignLeft /></button>
      <div>
        <Logo />
        <h3 className="logo-text">dashboard</h3>
      </div>
      <div className="btn-container">
        <button
          type="button"
          className="btn"
          onClick={() => setShowDropdown(oldShowDropdown => !oldShowDropdown)}
        ><FaUserCircle />{user?.name}<FaCaretDown /></button>
        <div className={`dropdown${showDropdown ? ' show-dropdown' : ''}`}>
          <button
            type="button"
            className="dropdown-btn"
            onClick={() => {
              dispatch(clearStore('logging out...'))
            }}
          >logout</button>
        </div>
      </div>
    </div>
  </Wrapper>
}

export default Navbar
