import { Form, Button, Input, ConfigProvider } from 'antd';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import backgroundImg from '../assets/login.png'

import React from 'react'

export default function Login() {

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', values);

      if (response.data.token) {
        const token = response.data.token;
        toast.success(response?.data.message);
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        toast.error(response?.data.message);
      }
    } catch (err) {
      if (err.response?.data.message) toast.error(err.response?.data.message);
      else toast.error("Something went wrong!");
      console.log(err);
    }
  }

  return (
    <div>
      <div className='grid place-items-center h-screen  relative   '>
        <img src={backgroundImg} className='absolute w-full h-full object-cover bg-cover z-0 '></img>
        <ConfigProvider
          theme={{
            components: {
              Form: {
                /* here is your component tokens */
                labelFontSize: 15,
                itemMarginBottom: 20,
                labelFontSize: 18,
              },
            },
          }}
        >


        <Form className='w-80' layout='vertical' onFinish={onFinish} autoComplete='off'>

          <Form.Item name='firstName' label='First Name' rules={[
            {
              required: true,
              message: "Please enter your name",
            },
            { whitespace: true },
            { min: 3 },
          ]}
            hasFeedback>
            <Input placeholder='Type your first name.' />
          </Form.Item>

          <Form.Item name='lastName' label='Last Name' hasFeedback >
            <Input placeholder='Type your first name.' />
          </Form.Item>

          <Form.Item
            name="username"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
              { type: "email", message: "Please enter a valid email" },
            ]}
            hasFeedback
          >
            <Input placeholder="Type your email" />
          </Form.Item>

          <Form.Item label="Password" name="password" required>
            <Input.Password placeholder='Password' />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 30 }}>
            <Button block type="primary" htmlType="submit" className="login-form-button">
              Register
            </Button>
          </Form.Item>
        </Form>
        </ConfigProvider>
      </div>
    </div>
  )
}
