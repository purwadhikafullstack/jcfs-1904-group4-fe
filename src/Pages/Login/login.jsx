import axios from '../../Config/axios.js';
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../Store/Actions/action.js';
import './login.css';

import { Button, Form } from 'react-bootstrap';
import { GoogleLoginButton } from 'react-social-login-buttons';

function Login() {
  const dispatch = useDispatch();
  const { username, getToken, role } = useSelector((state) => state.auth);

  const [formState, setFormState] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onLogin = async () => {
    try {
      const res = await axios.post('/users/login', {
        username: formState.username,
        password: formState.password,
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });

      const user = res.data.user;
      const postToken = res.data.token;

      const action = loginAction({ user, postToken });
      dispatch(action);
    } catch (error) {
      window.alert(error.response.data.message);
      console.log({ error });
    }
  };

  const onLoginClick = () => {
    onLogin();
  };

  const onInputPress = (e) => {
    if (e.code === 'Enter') onLogin();
  };

  if (username && role) {
    if (role === "client") {
      return <Navigate to="/" replace />;
    } else if (role === "admin") {
      return <Navigate to="/" replace />;
    } else if (role === "super_admin") {
      return <Navigate to="/" replace />;
    }
  };

  return (
    <Form className="login-form column-container justify-between">
      <h2 className="pt-2">Welcome Back</h2>
      <div className="row-container justify-between">
        <h5 className="font-weight-bold">Login to your account</h5>
        <h5 style={{ color: 'red' }}>*required</h5>
      </div>
      <Form.Group>
        <Form.Label>Username*</Form.Label>
        <Form.Control type="text" name="username" placeholder="Username" onChange={handleChange} onKeyPress={onInputPress}></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password*</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} onKeyPress={onInputPress}></Form.Control>
      </Form.Group>
      <Button style={{ fontSize: '19px' }} color="primary" block onClick={onLoginClick}>
        Login
      </Button>
      <p className="text-center pt-3">Or continue with your social account</p>
      <GoogleLoginButton className="mt-3 mb-3" align="center" />
      <div className="text-center pb-4">
        <Link to="/register">Register</Link>
        <span className="p-2">|</span>
        <Link to="/forgot-password">Forgot Password</Link>
      </div>
    </Form>
  );
}

export default Login;
