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
  const [sqlPagination, setSqlPagination] = useState({
    page: 1,
    lastPage: 0,
    itemsPerPage: 8,
  });

  useEffect(() => {
    fetchProducts();
  }, [sqlPagination]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products/get", 
        { params: { 
            page: paginationState.page, 
            itemsPerPage: paginationState.itemsPerPage, 
            OFFSET: (sqlPagination.page - 1) * sqlPagination.itemsPerPage
        }},
      );
      const { result, count } = res.data;

      setProducts(result);
      setPaginationState({
        ...sqlPagination,
        lastPage: Math.ceil(count[0].count / sqlPagination.itemsPerPage)
      });
    } catch (error) {
      console.log(alert(error.message));
    }
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px', marginInline: '50px', width: '100%'}}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
        <ProductManager
          setProducts={setProducts}
          sqlPagination={sqlPagination}
          paginationState={paginationState}
          setSqlPagination={setSqlPagination}
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