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
    itemsPerPage: 8,
  });

  // console.log(products)
  // console.log(sortedProducts)
  // console.log(filteredProducts)
  console.log(paginationState)

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products/get", { params: { page: paginationState.page, itemsPerPage: paginationState.itemsPerPage, OFFSET: (paginationState.page - 1) * paginationState.itemsPerPage } });
      console.log(res)
      const { data } = res
      console.log({data})
      setProducts(data.products);
      setFilteredProducts(data.products);
      // data : { products }
      setSortedProducts(data.products);
      setPaginationState({
        ...paginationState,
        lastPage: Math.ceil(data.products.length / paginationState.itemsPerPage),
      });
    } catch (error) {
      console.log(alert(error.message));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  // page : 1
  // itemsPerPage: 10
  // category : 'çhair'
  // sort : 'price' or 'name' --> default ?

  // page : 1 
  // itemsPerPage : 10 --> LIMIT
  // Skip sejumlah data --> OFFSET
  // numbers : 1  - 10

  // page : 2
  // itemsPerPage : 10
  // numbers : 11 - 20 --> OFFSET 10

  // page : 5
  // itemsPerPage : 10
  // numbers : 51 - 60 --> OFFSET 50

  // Page : 1
  // itemsPerPage : 8 --> LIMIT
  // OFFSET = 0
  // products : 1 - 8

  // Page : 2
  // itemsPerPage : 8 --> LIMIT
  // OFFSET = 8
  // products : 9 - 16

  // OFFSET = (Page - 1) * itemsPerPage


  const filterProducts = (formData) => {
    const resultFilter = products.filter((product) => {
      const productName = product.product_name.toLowerCase();
      const keyword = formData.keyword.toLowerCase();
      return (
        productName.includes(keyword) &&
        // formData.category_name = mon
        // product.category_name = monday
        // apakah pada kata monday mengandung mon ?
        product.category_name.includes(formData.category_name)
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
    console.log(sortValue)
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

          if (a.product_name < b.product_name) {
            return -1;
          } else if (a.product_name > b.product_name) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      case "za":
        rawData.sort((a, b) => {
          if (a.product_name < b.product_name) {
            return 1;
          } else if (a.product_name > b.product_name) {
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
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px', width: '100%'}}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
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
      </div>
    </div>
  );
};

export default Products;