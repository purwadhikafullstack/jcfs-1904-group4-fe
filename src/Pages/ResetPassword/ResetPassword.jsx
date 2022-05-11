import React, { useState } from 'react';
import axios from '../../Config/axios';
import { useParams, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginAction } from '../../Store/Actions/action.js';
import { Form, Button } from 'react-bootstrap';
import './resetPassword.css';

function ResetPassword() {
  const dispatch = useDispatch();
  const params = useParams();
  const usernameLogin = useSelector((state) => state.auth.username);

  const [formState, setFormState] = useState({
    password: '',
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onResetPassword = async () => {
    try {
      const res = await axios.put('/users/reset-password', {
        password: formState.password,
        token: params.token,
      });
      console.log(res.data);

      const user = res.data.user;
      const postToken = res.data.token;

      const action = loginAction({ user, postToken });
      dispatch(action);
    } catch (error) {
      console.log({ error });
      window.alert(error.message);
    }
  };

  const onResetPasswordClick = () => {
    onResetPassword();
  };

  const onInputPress = (e) => {
    if (e.code === 'Enter') onResetPassword();
  };

  if (usernameLogin) {
    return <Navigate to="/" replace />;
  }

  return (
    <Form className="register-form column-container">
      <h2 className="pt-2">Please insert your new password</h2>
      <div className="row-container justify-between">
        <h5 style={{ color: 'red' }}>*required</h5>
      </div>
      <Form.Group>
        <Form.Label>Password*</Form.Label>
        <Form.Control type="password" name="email" placeholder="Password" onChange={handleChange} onKeyPress={onInputPress}></Form.Control>
      </Form.Group>
      <Button className="mt-4" style={{ fontSize: '19px' }} color="primary" block onClick={onResetPasswordClick}>
        Reset Password
      </Button>
    </Form>
  );
}
export default ResetPassword;
