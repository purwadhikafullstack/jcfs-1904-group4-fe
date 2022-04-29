import React, { useState, useEffect } from "react";
import axios from "../../Config/axios";

import CatalogueManager from "./Components/CatalogueManager";
import ProductCard from "./Components/ProductCard";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [paginationState, setPaginationState] = useState({
    page: 1,
    lastPage: 0,
    itemsPerPage: 5,
  });
  const [sqlPagination, setSqlPagination] = useState({
    page: 1,
    lastPage: 0,
    itemsPerPage: 5,
  });

  useEffect(() => {
    fetchProducts();
  }, [paginationState]);

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
        <div className="d-flex justify-content-center mt-5">
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                <CatalogueManager
                    setProducts={setProducts}
                    sqlPagination={sqlPagination}
                    paginationState={paginationState}
                    setSqlPagination={setSqlPagination}
                    setPaginationState={setPaginationState}
                />
                <div className="d-flex flex-wrap flex-column">
                {products.map((product) => (
                    <ProductCard
                      key={product.product_id}
                      products={product}
                    />
                ))}
                </div>
            </div>
        </div>
    )
}

export default ManageProducts;