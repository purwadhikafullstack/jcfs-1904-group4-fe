import React, { useState, useEffect } from "react";
import axios from "../../Config/axios";

import CatalogueManager from "./Components/CatalogueManager";
import ProductCard from "./Components/ProductCard";

function ManageProducts() {
    const [products, setProducts] = useState([]);
    const [paginationState, setPaginationState] = useState({
        page: 1,
        lastPage: 0,
        itemsPerPage: 10,
    });

    console.log(products)

    useEffect(() => {
      fetchProducts();
    }, []);

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
          setPaginationState({
            ...paginationState,
            lastPage: Math.ceil(data.products.length / paginationState.itemsPerPage),
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
    )
}

export default ManageProducts;