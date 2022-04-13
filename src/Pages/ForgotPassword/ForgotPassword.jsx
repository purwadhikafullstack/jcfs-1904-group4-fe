import React, { useState } from 'react';
import axios from '../../Config/axios';
import { Form, Button } from 'react-bootstrap';
import './forgotPassword.css';

function ForgotPassword() {
  const [formState, setFormState] = useState({
    email: '',
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onForgotPassword = async () => {
    try {
      const res = await axios.post('/users/forgot-password', {
        email: formState.email,
      });

      console.log({ data: res.data });

      window.alert('Please check your email to reset password');
    } catch (error) {
      console.log({ error });
      window.alert(error.message);
    }
  };

  const onForgotPasswordClick = () => {
    onForgotPassword();
  };

  const onInputPress = (e) => {
    if (e.code === 'Enter') onForgotPassword();
  };

  return (
    <Form className="register-form column-container">
      <h2 className="pt-2">Forgot your Password?</h2>
      <div className="row-container justify-between">
        <h5 className="font-weight-bold">Don't worry, we will send it to your email</h5>
        <h5 style={{ color: 'red' }}>*required</h5>
      </div>
      <Form.Group>
        <Form.Label>Email*</Form.Label>
        <Form.Control type="text" name="email" placeholder="Email" onChange={handleChange} onKeyPress={onInputPress}></Form.Control>
      </Form.Group>
      <Button className="mt-4" style={{ fontSize: '19px' }} color="primary" block onClick={onForgotPasswordClick}>
        Reset Password
      </Button>
    </Form>
  );
}
export default ForgotPassword;
