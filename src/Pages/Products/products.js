import React, { useState, useEffect } from "react";
import axios from "../../Config/axios";

import "./style.css";
import ProductManager from "./Components/ProductManager";
import ProductCard from "../../Components/ProductCard/productCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [paginationState, setPaginationState] = useState({
    page: 1,
    lastPage: 0,
    itemsPerPage: 8,
  });

  useEffect(() => {
    totalProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [paginationState])

  const totalProducts = async () => {
    try {
      const res = await axios.get("/products/all");

      const { products } = res.data;
      setPaginationState({
        ...paginationState,
      lastPage: Math.ceil(products.length / paginationState.itemsPerPage),
      });
    } catch (error) {
      console.log(alert(error.message));
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products/get", 
        { params: { 
            page: paginationState.page, 
            itemsPerPage: paginationState.itemsPerPage, 
            OFFSET: (paginationState.page - 1) * paginationState.itemsPerPage,
          }},
      );
      const { data } = res
      setProducts(data.products);
    } catch (error) {
      console.log(alert(error.message));
    }
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px', marginInline: '50px', width: '100%'}}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
        <ProductManager
          setProducts={setProducts}
          paginationState={paginationState}
          setPaginationState={setPaginationState}
        />
        <div className="d-flex flex-wrap col-9">
          {products.map((product) => (
            <ProductCard
              key={product.product_id}
              products={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;