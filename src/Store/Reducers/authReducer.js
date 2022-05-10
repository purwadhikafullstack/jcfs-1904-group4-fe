const init = {
  user_id: 0,
  username: '',
  warehouse_id: 0,
  role: '',
  is_verified: true,
  token: '',
};

const authReducer = (state = init, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user_id: action.payload.user.user_id,
        username: action.payload.user.username,
        warehouse_id: action.payload.user.warehouse_id,
        role: action.payload.user.role,
        is_verified: action.payload.user.is_verified,
        token: action.payload.postToken,
      };

    case 'LOGOUT_SUCCESS':
      return init;

    default:
      return state;
  }
};

export default authReducer;
