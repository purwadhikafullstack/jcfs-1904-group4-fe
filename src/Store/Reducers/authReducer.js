const init = {
  user_id: 0,
  username: '',
  warehouse_id: 0,
  role: '',
  token: '',
};

const authReducer = (state = init, action) => {
  // console.log({ state, action });

  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user_id: action.payload.user.user_id,
        username: action.payload.user.username,
        warehouse_id: action.payload.user.warehoue_id,
        role: action.payload.user.role,
        token: action.payload.postToken,
      };

    case 'LOGOUT_SUCCESS':
      return init;

    default:
      return state;
  }
};

export default authReducer;
