import React from 'react'
import Navbar from '../components/Navbar'


export default function UserDashboard() {
  console.log('Rendering UserDashboard component');
  
  return (
    <>

      <Navbar link1="/issuedbooks" stat1="Issued books" link2="/signout" stat2="Sign out" link3="/" stat3="Home" />
      <div>This is userdashboard</div>
    </>
  )
}
