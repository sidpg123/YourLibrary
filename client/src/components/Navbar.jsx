import React from 'react'
import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (

    <div className=' flex justify-between'>
        <img src={logo} className=' h-10 absolute z-2 items-start top-3 left-5 '></img>
        <div className='absolute top-5 right-7 font-semibold text-lg space-x-5 text-slate-200'>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/signup">Sign Up </NavLink>
            <NavLink to="/signin">Sign In</NavLink>
        </div>
    </div>
  )
}
