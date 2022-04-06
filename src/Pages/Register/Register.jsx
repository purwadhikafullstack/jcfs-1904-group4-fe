import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginAction } from '../../Store/Actions/action.js';
import axios from '../../Config/axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './register.css';

function Register() {
  const dispatch = useDispatch();
  const usernameLogin = useSelector((state) => state.auth.username);

  const [formState, setFormState] = useState({
    username: '',
    full_name: '',
    email: '',
    password: '',
  });

  const { full_name, username, email, password } = formState;

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onRegister = async () => {
    try {
      const res = await axios.post('/users/register', {
        username,
        full_name,
        email,
        password,
      });

      const user = res.data.user;
      const postToken = res.data.token;

      const action = loginAction({ user, postToken });
      dispatch(action);
    } catch (error) {
      console.log({ error });
      window.alert(error.message);
    }
  };

  const onRegisterClick = () => {
    onRegister();
  };

  const onInputPress = (e) => {
    if (e.code === 'Enter') onRegister();
  };

  if (usernameLogin) {
    return <Navigate to="/" replace />;
  }

  return (
    <Form className="register-form column-container justify-between">
      <h2 className="pt-2">Welcome to EZFURNITURE</h2>
      <div className="row-container justify-between">
        <h5 className="font-weight-bold">Let's create your account</h5>
        <h5 style={{ color: 'red' }}>*required</h5>
      </div>
      <Form.Group>
        <Form.Label>Full Name*</Form.Label>
        <Form.Control type="text" name="full_name" placeholder="Full Name" onChange={handleChange} onKeyPress={onInputPress}></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Username*</Form.Label>
        <Form.Control type="text" name="username" placeholder="Username" onChange={handleChange} onKeyPress={onInputPress}></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Email*</Form.Label>
        <Form.Control type="text" name="email" placeholder="Email" onChange={handleChange} onKeyPress={onInputPress}></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password*</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} onKeyPress={onInputPress}></Form.Control>
      </Form.Group>
      <Button className="mt-4" style={{ fontSize: '19px' }} color="primary" block onClick={onRegisterClick}>
        Register
      </Button>
      <p className="text-center pt-3">Have an account?</p>
      <div className="text-center pb-4">
        <Link to="/login">Login</Link>
      </div>
    </Form>
  );
}

export default Register;
