import React from 'react';
import backgroundImg from '../assets/dash.jpg';
import { Form, Button, Input, ConfigProvider } from 'antd';
import BottomWarnign from '../components/BottomWarnign';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function Signin() {
  const navigate=useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signin', values);
      if (response?.data.success) {
        toast.success(response?.data.message);
        localStorage.setItem('token', response.data.token);
        if(response.data.librarian){
          navigate("/librarianDashboard");
        }else{
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
  <div className="h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${backgroundImg})` }}>
    <div className='z-10 text-white   '>

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

        <Form className='w-80' layout='vertical' autoComplete='off' onFinish={onFinish}>
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

          <Form.Item wrapperCol={{ span: 30 }}>
            <Button block type="primary" htmlType="submit" className="login-form-button border-solid ">
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
      <div className=' z-10'>
        <BottomWarnign label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"}></BottomWarnign>
      </div>
    </div>
  </div>
);
}
