import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import SalesReport from './Pages/SalesReport/SalesReport';
import Admin from './Pages/Admin/admin';
import Client from './Pages/Client/client';
import Address from './Pages/Client/address';
import Products from './Pages/Products/products';
import Navigation from './Components/Navigation/navigation';
import ProductDetail from './Pages/ProductDetail/productDetail';
import { keepLoginAction } from '../src/Store/Actions/action.js';

function App() {
  const [isLocalStorageChecked, setIsLocalStorageChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const userLocalStorage = localStorage.getItem('userData');

    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage);
      const { user, postToken } = userData;

      const action = keepLoginAction({ user, postToken });

      dispatch(action);
    }

    setIsLocalStorageChecked(true);
  }, []);

  if (isLocalStorageChecked) {
    return (
      <div className="App">
        <Router>
          <Navigation />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/sales-report" element={<SalesReport />} />
            <Route path="/" element={<Products />} />
            <Route path="/address" element={<Address />} />
            <Route path="client" element={<Client />} />
            <Route path="products/:product_id" element={<ProductDetail />} />
          </Routes>
        </Router>
      </div>
    );
  } else {
    return <h1>Loading ...</h1>;
  }
}

export default App;
