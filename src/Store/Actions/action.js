export const loginAction = (loginData) => {
  localStorage.setItem('userData', JSON.stringify(loginData));

  return {
    type: 'LOGIN_SUCCESS',
    payload: loginData,
  };
};

export const keepLoginAction = ({ user_id, username, role, warehouse_id }) => {
  return {
    type: 'LOGIN_SUCCESS',
    payload: { user_id, username, role, warehouse_id },
  };
};

export const logoutAction = () => {
  localStorage.removeItem('userData');
  return {
    type: 'LOGOUT_SUCCESS',
  };
};
