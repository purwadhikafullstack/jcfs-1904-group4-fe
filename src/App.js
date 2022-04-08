import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import "./style.css"

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { keepLoginAction } from '../src/Store/Actions/action.js';

import Login from './Pages/Login/login';
import Admin from './Pages/Admin/admin'
import Client from './Pages/Client/client'
import Address from './Pages/Client/address'
import Products from "./Pages/Products/products";
import Navigation from "./Components/Navigation/navigation"
import ProductDetail from "./Pages/ProductDetail/productDetail";

function App() {

  const [isLocalStorageChecked, setIsLocalStorageChecked] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const userLocalStorage = localStorage.getItem('userData');
  
    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage);
      const { user, postToken } = userData;
  
      const { user_id, username, role, warehouse_id } = user;
      const action = keepLoginAction({ user, postToken });
  
      dispatch(action);
    }
  
    setIsLocalStorageChecked(true);
  }, []);

  if(!isLocalStorageChecked) return (
      <h1>Loading</h1>
  )
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/login" element={<Login />} />
                <Route path="/address" element={<Address />} />
                <Route path="client" element={<Client />} />
                <Route path="products/:product_id" element={<ProductDetail />} />
            </Routes>
        </Router>
    )
};

export default App;