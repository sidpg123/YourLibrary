import React from 'react';
import backgroundImg from '../assets/dash.jpg';
import { Form, Button, Input, ConfigProvider } from 'antd';
import BottomWarnign from '../components/BottomWarnign';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';


export default function Signin() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signin', values);
      if (response?.data.success) {
        toast.success(response?.data.message);
        localStorage.setItem('token', response.data.token);
        if (response.data.librarian) {
          navigate("/librarianDashboard");
        } else {
          navigate("/userdashboard");
        }
      }
      else {
        console.log(response?.data.message)
        //toast.error(response?.data.message)
      }
    } catch (err) {
      if (err.response?.data.message) toast.error(err.response?.data.message)
      //else toast.error("Something went wrong!")
      console.log(err)
    }
  }


  return (
    <>
      <Navbar link1={"/signup"} stat1={"Sign Up"} />
      <div className="h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${backgroundImg})` }}>
        <div className=' text-white  pt-4 overflow-auto    '>
          <div className='italic text-center text-4xl my-3  '>
            Welcome back...
          </div>
          <ConfigProvider
            theme={{
              components: {
                Form: {
                  /* here is your component tokens */
                  //labelFontSize: 15,
                  itemMarginBottom: 20,
                  labelFontSize: 18,
                },
              },
            }}
          >

            <Form className='w-60 sm:w-80 overflow-auto' layout='vertical' autoComplete='off' onFinish={onFinish}>
              <Form.Item label="Email" name='username' className='' rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
                { type: "email", message: "Please enter a valid email" },
              ]}
                hasFeedback
              >
                <Input placeholder='Email'></Input>
              </Form.Item>

              <Form.Item label="Password" name='password' rules={[
                {
                  required: true,
                  message: "Please enter passowrd"
                }
              ]}>
                <Input placeholder='Password' type='password'></Input>
              </Form.Item>

              <Form.Item>
                <Button block type="primary" htmlType="submit" >
                  Sign In
                </Button>
              </Form.Item>
              <BottomWarnign label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"}></BottomWarnign>
            </Form>
          </ConfigProvider>
          <div className=' z-10'>
          </div>
        </div>
      </div>
    </>
  );
}
