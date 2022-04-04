import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Client from './Pages/Client/client'
import Admin from './Pages/Admin/admin'
import Products from "./Pages/Products/products";
import Navigation from "./Components/Navigation/navigation"
import ProductDetail from "./Pages/ProductDetail/productDetail";
import 'bootstrap/dist/css/bootstrap.css';
import "./style.css"

function App() {
    return (
        <Router>
            <Navigation />
            <Routes>
                {/* <Route path="/" element={<Products />} />
                <Route path="products/:product_id" element={<ProductDetail />} /> */}
                <Route path="client" element={<Client />} />
            </Routes>
        </Router>
    )
};

export default App;