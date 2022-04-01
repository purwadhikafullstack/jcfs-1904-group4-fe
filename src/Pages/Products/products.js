import React, { useState, useEffect } from "react";
import axios from "../../Config/axios";

import "./style.css";
import ListProduct from "./Components/ListProduct";
import ProductManager from "./Components/ProductManager";
import ProductCard from "../../Components/ProductCard/productCard";

function Products() {
  const [products, setProducts] = useState([]); // 19
  const [filteredProducts, setFilteredProducts] = useState([]); // 19
  const [sortedProducts, setSortedProducts] = useState([]); // 19 sort : lowet price
  const [paginationState, setPaginationState] = useState({
    page: 1,
    lastPage: 0,
    itemsPerPage: 5,
  });

  console.log(products)
  console.log(sortedProducts)

  const fetchProducts = async () => {
    try {
      const res = await axios.post("/products/get");
      console.log(res)
      const {data} = res
      console.log({data})
      setProducts(data);
      setFilteredProducts(data);
      // data : { products }
      setSortedProducts(data.products);
      setPaginationState({
        ...paginationState,
        lastPage: Math.ceil(data.length / paginationState.itemsPerPage),
      });
    } catch (error) {
      console.log(alert(error.message));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filterProducts = (formData) => {
    const resultFilter = products.filter((product) => {
      const productName = product.productName.toLowerCase();
      const keyword = formData.keyword.toLowerCase();
      return (
        productName.includes(keyword) &&
        product.category.includes(formData.category)
      );
    });

    setPaginationState({
      ...paginationState,
      page: 1,
      lastPage: Math.ceil(resultFilter.length / paginationState.itemsPerPage),
    });
    setFilteredProducts(resultFilter);
    setSortedProducts(resultFilter);
  };

  const sortProducts = (sortValue) => {
    const rawData = [...filteredProducts];

    switch (sortValue) {
      case "lowPrice":
        rawData.sort((a, b) => a.price - b.price);
        break;
      case "highPrice":
        rawData.sort((a, b) => b.price - a.price);
        break;
      case "az":
        rawData.sort((a, b) => {

          if (a.productName < b.productName) {
            return -1;
          } else if (a.productName > b.productName) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      case "za":
        rawData.sort((a, b) => {
          if (a.productName < b.productName) {
            return 1;
          } else if (a.productName > b.productName) {
            return -1;
          } else {
            return 0;
          }
        });
        break;
    }

    setSortedProducts(rawData);
  };

  return (
    <div className="container">
      <div className="row">
        <ProductManager
          filterProducts={filterProducts}
          sortProducts={sortProducts}
          paginationState={paginationState}
          setPaginationState={setPaginationState}
        />
        <ListProduct
          product={sortedProducts}
          paginationState={paginationState}
        />
        {/* {products.map((product) => (
          <ProductCard 
            key={product.product_id}
            product={product}/>
          ))} */}
          {/* <ProductCard products={products}/> */}
      </div>
    </div>
  );
};

export default Products;