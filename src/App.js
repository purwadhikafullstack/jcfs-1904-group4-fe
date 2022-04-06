import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import { keepLoginAction } from '../src/Store/Actions/action.js';

function App() {
  const [isLocalStorageChecked, setIsLocalStorageChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const userLocalStorage = localStorage.getItem('userData');

    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage);
      const { user, postToken } = userData;

      // const { user_id, username, role, warehouse_id } = user;
      const action = keepLoginAction({ user, postToken });

      dispatch(action);
    }

    setIsLocalStorageChecked(true);
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
