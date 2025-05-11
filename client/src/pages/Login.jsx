import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/Logo.png';

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', values);
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        message.success('Login successful');
        navigate('/students');
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1890ff 0%, #001529 100%)',
    }}>
      <Card 
        style={{ 
          width: 400,
          borderRadius: '15px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        }}
        bodyStyle={{ padding: '40px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <img 
            src={Logo} 
            alt="SIS Logo" 
            style={{ 
              height: '80px',
              marginBottom: '16px'
            }} 
          />
          <h1 style={{ 
            margin: 0,
            fontSize: '24px',
            color: '#1890ff',
            fontWeight: 600
          }}>
            Student Information System
          </h1>
        </div>

        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block
              style={{
                height: '45px',
                borderRadius: '6px',
                fontSize: '16px'
              }}
            >
              Log in
            </Button>
          </Form.Item>
          
          <div style={{ 
            textAlign: 'center',
            color: '#888'
          }}>
            Don't have an account? <a 
              onClick={() => navigate('/register')}
              style={{ color: '#1890ff' }}
            >
              Register now!
            </a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;