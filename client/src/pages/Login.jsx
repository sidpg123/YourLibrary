import React from 'react'
import library from '../assets/kitlib.png'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import { useState } from 'react'
export default function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 justify-center'>
      <div className=' bg-orange-100 flex flex-col justify-center'>
        <form className=' flex flex-col justify-center max-w-[400px] w-full rounded-lg bg-slate-100 mx-auto p-6 '>
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create your account"} />

          <InputBox label={"First Name"} onChange={e =>{
            setFirstName(e.target.value)
          }} paceholder={"First Name"}/>

          <InputBox label={"Last Name"} onChange={e =>{
            setLastName(e.target.value)
          }} paceholder={"Last Name"}/>

          <InputBox label={"Email-id"} onChange={e =>{
            setUsername(e.target.value)
          }} paceholder={"Email-id"}/>

          <InputBox label={"Password"} onChange={e =>{
            setPassword(e.target.value)
          }} paceholder={"Set Passowrd"}/>
        </form>

      </div>
      <div>
        <img className=' h-screen w-screen ' src={library} />
      </div>
    </div>


  )
}
