import React from 'react'
import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'

export default function Navbar({ link1, stat1, link2, stat2, link3, stat3 }) {
  console.log('link1:', link1);
  console.log('link2:', link2);
  console.log('link3:', link3);
  console.log('stat1:', stat1);
  console.log('stat2:', stat2);
  console.log('stat3:', stat3);
  console.log('Rendering Navbar with:', link1, stat1);

  return (
    <div className=' flex justify-between z-10  '>

      <NavLink to="/dashboard">
        <img src={logo} className='h-10 absolute items-start top-3 left-5' alt="Logo" />
      </NavLink>

      <div className='absolute top-5 right-7 font-semibold text-lg space-x-5 text-slate-200'>
        {link1 && stat1 && <NavLink to={link1}> {stat1}</NavLink>}
        {link2 && stat2 && <NavLink to={link2}>{stat2} </NavLink>}
        {link3 && stat3 && <NavLink to={link3}>{stat3}</NavLink>}
      </div>
    </div>
  )
}
