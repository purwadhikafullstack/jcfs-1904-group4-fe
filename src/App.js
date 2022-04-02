import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navigation from "./Components/Navigation/navigation"
import Products from "./Pages/Products/products";
import ProductDetail from "./Pages/ProductDetail/productDetail";
import 'bootstrap/dist/css/bootstrap.css';
import "./style.css"

function App() {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<Products />} />
                {/* <Route path="products/:product_id" element={<ProductDetail />} /> */}
            </Routes>
        </Router>
    )
};

export default App;