import React, {useState, useEffect} from "react";
// import axios from "../../../Config/axios";

function Home() {
//   const [products, setProducts] = useState([]);
//   const [filteredProduucts, setFilteredProducts] = useState([]);
//   const [paginationState, setPaginationState] = useState({
//     page: 1,
//     lastPage: 0,
//     itemsPerPage: 5
// }); 

// const fetchProducts = async () => {
//     try {
//         const res = await axios.get("/products/get");
//         const { data } = res;
//         setProducts(data);
//         setPaginationState({
//             ...paginationState,
//             lastPage: Math.ceil(data.length / paginationState.itemsPerPage)
//         });
//     } catch (error) {
//       console.log(alert(error.message));
//     }
//   };

//   useEffect(() => {
//       fetchProducts();
//   }, []);

//   const filterProducts = (formData) => {
//       const resultFilter = products.filter((product) => {
//           const productName = product.productName.toLowerCase();
//           const keyword = formData.keyword.toLowerCase();
//           return (
//               productName.includes(keyword) &&
//               product.category.includes(formData.category)
//           );
//       });

//       setPaginationState({
//           ...paginationState,
//           page: 1,
//           lastPage: Math.ceil(resultFilter.length / paginationState.itemsPerPage)
//       });

//       setFilteredProducts(resultFilter);
//   }

    return (
        <div>
            Home Page
        </div>
    )
};

export default Home;