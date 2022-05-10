import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { keepLoginAction } from '../src/Store/Actions/action.js';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Navigation from './Components/Navigation/navigation';

import Cart from './Pages/Cart/cart';
import Home from './Pages/Home/home';
import Login from './Pages/Login/Login';
import Client from './Pages/Client/client';
import Address from './Pages/Client/address';
import AboutUs from './Pages/AboutUs/aboutUs';
import Products from './Pages/Products/products';
import Checkout from './Pages/Checkout/checkout';
import Register from './Pages/Register/Register';
import AddProducts from './Pages/ManageProduct/AddProducts';
import Transaction from './Pages/Transactions/transactions';
import SalesReport from './Pages/SalesReport/SalesReport';
import Instructions from './Pages/Transactions/instructions';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import ProductDetail from './Pages/ProductDetail/productDetail';
import ManageProducts from './Pages/ManageProduct/ManageProduct';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import SuperTransaction from './Pages/SuperAdmin/superTransactions';
import HistoryTransaction from './Pages/HistoryTransaction/historyTransaction';

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
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/client" element={<Client />} />
            <Route path="/address" element={<Address />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/products" element={<Products />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/instruction" element={<Instructions />} />
            <Route path="/add-products" element={<AddProducts />} />
            <Route path="/sales-report" element={<SalesReport />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/manage-products" element={<ManageProducts />} />
            <Route path="/products/:product_id" element={<ProductDetail />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/super-transaction" element={<SuperTransaction />} />
            <Route path="/history-transaction" element={<HistoryTransaction />} />
          </Routes>
        </Router>
      </div>
    );
  } else {
    return <h1>Loading ...</h1>;
  }
}

export default App;
