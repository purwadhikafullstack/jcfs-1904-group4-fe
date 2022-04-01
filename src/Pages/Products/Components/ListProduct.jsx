import React from "react";

import ProductCard from "../../../Components/ProductCard/productCard";

function ListProduct(props) {
    const products = props.product;
    const { page, itemsPerPage } = props.paginationState;
    
    const renderProducts = () => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const slicedProducts = products.slice(startIndex, endIndex);
    
        return slicedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ));
      };
    
      return <div className=" d-flex flex-wrap col-9 ">{renderProducts()}</div>;
};
    
export default ListProduct;

