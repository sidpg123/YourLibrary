import React from 'react'
import library from '../assets/kitlib.png'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import Button from '../components/Button'
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { zod } from "zod";
import { SubmitHandler, useForm } from 'react-hook-form';

const signupBody = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
  firstName: zod.string(),
  lastName: zod.string()
})



export default function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "test@email.com",
    },
    resolver: zodResolver(signupBody),
  });

  const onSubmit =async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
        firstName,
        lastName,
        username,
        password
      });

      //console.log("Response data:", response.data); // Log the response data to the console

      const token = `Bearer ${response.data.token}`;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        alert("Token is missing in the response. Please try again.");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      alert("Invalid credentials. Please try again.");
    }
  } 

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 justify-center'>
      <div className=' bg-orange-100 flex flex-col justify-center'>
        <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col justify-center max-w-[400px] w-full rounded-lg bg-slate-100 mx-auto p-6 '>
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create your account"} />

          <InputBox register={register("firstName")}  label={"First Name"} onChange={e => {
            setFirstName(e.target.value)
          }} paceholder={"First Name"} />

          <InputBox register={register("lastName")} label={"Last Name"} onChange={e => {
            setLastName(e.target.value)
          }} paceholder={"Last Name"} />

          <InputBox register={register("username")} label={"Email-id"} onChange={e => {
            setUsername(e.target.value)
          }} paceholder={"Email-id"} />

          <InputBox register={register("password")} label={"Password"} onChange={e => {
            setPassword(e.target.value)
          }} paceholder={"Set Passowrd"} />

          <div className='flex justify-center mt-5 '>
            <Button label={"Sign Up"}></Button>
          </div>

        </form>
      </div>
      <div>
        <img className=' h-screen w-screen ' src={library} />
      </div>
    </div>
  )
}   