import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Login = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!isLogin && credentials.password !== credentials.confirmPassword) {
      toast.error('Passwords do not match', { position: 'top-right' });
      return;
    }
    try {
      const url = isLogin ? 'http://localhost:8000/api/login' : 'http://localhost:8000/api/create';
      const response = await axios.post(url, credentials);
      toast.success(response.data.msg, { position: 'top-right' });
      if (isLogin) {
        setUser(response.data.user);
        navigate(`/dashboard`);
      } else {
        setIsLogin(true); // Switch to login form after successful sign-up
      }
    } catch (error) {
      toast.error(`${isLogin ? 'Login' : 'Sign-up'} failed`, { position: 'top-right' });
    }
  };

  return (
    <Container className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
      <Row className='w-100'>
        <Col md={6} lg={4} className='mx-auto'>
          <div className='auth p-4 border rounded bg-white'>
            <h3 className='text-center mb-4'>{isLogin ? 'Login' : 'Sign Up'}</h3>
            <Form onSubmit={submitForm}>
              {!isLogin && (
                <Form.Group className='mb-3' controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type='text' onChange={inputHandler} name='name' autoComplete='off' placeholder='Name' />
                </Form.Group>
              )}
              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' onChange={inputHandler} name='email' autoComplete='off' placeholder='Email' />
              </Form.Group>
              <Form.Group className='mb-3' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' onChange={inputHandler} name='password' autoComplete='off' placeholder='Password' />
              </Form.Group>
              {!isLogin && (
                <Form.Group className='mb-3' controlId='confirmPassword'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type='password' onChange={inputHandler} name='confirmPassword' autoComplete='off' placeholder='Confirm Password' />
                </Form.Group>
              )}
              <Button variant='primary' type='submit' className='w-100'>{isLogin ? 'LOGIN' : 'SIGN UP'}</Button>
            </Form>
            <div className='text-center mt-3'>
              <Button variant='link' onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
