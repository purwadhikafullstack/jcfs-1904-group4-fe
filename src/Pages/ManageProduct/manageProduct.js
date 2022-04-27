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
        <div className="d-flex justify-content-center mt-5">
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                <CatalogueManager
                    setProducts={setProducts}
                    paginationState={paginationState}
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