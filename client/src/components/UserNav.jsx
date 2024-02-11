import React from 'react'
import Navbar from './Navbar'


export default function UserNav() {
  return (
    <div>
        <Navbar link1={"/issuedbooks"} stat1={"/Issued Books"} link2={"/logout"} stat2={"/Sign Out"} />
          
    </div>
  )
}
