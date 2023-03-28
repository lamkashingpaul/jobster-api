import React from 'react'
import { Link } from 'react-router-dom'

import Wrapper from '../assets/wrappers/LandingPage'
import mainSVG from '../assets/images/main.svg'
import { Logo } from '../components'

const Landing = () => {
  return <Wrapper>
    <nav>
      <Logo />
    </nav>
    <div className="container page">
      <div className="info">
        <h1>job <span>tracking</span> app</h1>
        <p>I&apos;m baby listicle knausgaard unicorn tattooed 90&apos;s selvage lo-fi helvetica la croix polaroid green juice normcore. Austin distillery portland fixie bruh, tousled semiotics mumblecore asymmetrical fit narwhal polaroid pinterest kombucha microdosing. Selvage fixie tumeric, activated charcoal chambray gochujang pug next level tilde tousled farm-to-table bushwick. Mukbang scenester skateboard humblebrag chambray four dollar toast, DIY cold-pressed everyday carry disrupt hexagon vexillologist.</p>
        <Link to="/register" className="btn btn-hero">Login/Register</Link>
      </div>
      <img src={mainSVG} alt="job hunt" className="img main-img" />
    </div>
  </Wrapper>
}

export default Landing
