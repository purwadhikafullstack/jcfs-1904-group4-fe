import React from "react";

import ProductCard from "../../../Components/ProductCard/productCard";

// props : product
function ListProduct(props) {
    const products = props.product;
    
    const renderProducts = () => {
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ));
      };
    
      return <div className=" d-flex flex-wrap col-9 ">{renderProducts()}</div>;
};
    
export default ListProduct;

