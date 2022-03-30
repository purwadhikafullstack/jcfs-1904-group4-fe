import axios from '../../Config/axios';
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../Store/Actions/action.js';
import './login.css';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { GoogleLoginButton } from 'react-social-login-buttons';

function Login() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);
  const getToken = useSelector((state) => state.auth.token);
  const [formState, setFormState] = useState({
    username: '',
    password: '',
  });

  if (username) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onLogin = async () => {
    // console.log('running');
    try {
      const res = await axios.post('/users/login', {
        username: formState.username,
        password: formState.password,
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      // console.log({ res });

      const user = res.data.user;
      const postToken = res.data.token;

      const action = loginAction({ user, postToken });
      // console.log(action);
      dispatch(action);
    } catch (error) {
      console.log({ error });
    }
  };

  const onLoginClick = () => {
    onLogin();
  };

  const onInputPress = (e) => {
    if (e.code === 'Enter') onLogin();
  };

  return (
    <Form className="login-form">
      <h1>
        <span className="font-weight-bold text-center">Please Login</span>
      </h1>

      <FormGroup>
        <Label>Username*</Label>
        <Input type="text" name="username" placeholder="Username" onChange={handleChange} onKeyPress={onInputPress}></Input>
      </FormGroup>
      <FormGroup>
        <Label>Password*</Label>
        <Input type="password" name="password" placeholder="Password" onChange={handleChange} onKeyPress={onInputPress}></Input>
      </FormGroup>
      <Button color="primary" block onClick={onLoginClick}>
        Login
      </Button>
      <p className="text-center pt-3">Or continue with your social account</p>
      <GoogleLoginButton className="mt-3 mb-3" />
      <div className="text-center">
        <Link to="/register">Register</Link>
        <span className="p-2">|</span>
        <Link to="">Forgot Password</Link>
      </div>
    </Form>
  );
}

export default Login;
