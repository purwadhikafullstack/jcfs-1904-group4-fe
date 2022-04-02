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

  console.log(products)
  console.log(sortedProducts)
  console.log(filteredProducts)
  console.log(paginationState)

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products/get");
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

  const filterProducts = (formData) => {
    const resultFilter = products.filter((product) => {
      const productName = product.product_name.toLowerCase();
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