import React, { useEffect, useState } from "react";
import axios from '../../../Config/axios';

// props : paginationState, setPaginationState, setProducts
function ProductManager(props) {
    const { paginationState, setPaginationState, setProducts } = props;
    const { page, lastPage } = paginationState;

    const [productCategories, setProductCategories] = useState([])
    const [formState, setFormState] = useState({
      keyword: "",
      category: ""
    });
    const [sortOption, setSortOption] = useState({
      sortBy: "product_name",
      typeSort: "ASC",
    });

    const searchProducts = async () => {
      try {
        const res = await axios.get('/products/get',
        { params: { 
            category_name: formState.category,
            product_name: formState.keyword,
            sortBy: sortOption.sortBy,
            typeSort: sortOption.typeSort,
            page: paginationState.page, 
            itemsPerPage: paginationState.itemsPerPage, 
            OFFSET: (paginationState.page - 1) * paginationState.itemsPerPage 
        }});

        const { data } = res;
        setProducts(data.products)
        setPaginationState({
          ...paginationState,
          lastPage: Math.ceil(data.products.length / paginationState.itemsPerPage),
        });

      } catch (error) {
        console.log(alert(error.message));
      }
    };

    const fetchProductCategories = async () => {
      try {
        const res = await axios.get("/categories/get");
        const { data } = res
        setProductCategories(data.categories);
      } catch (error) {
        console.log(alert(error.message));
      }
    };

    useEffect(async () => {
      await fetchProductCategories()
    }, [])

    useEffect(() => {
      searchProducts()
    }, [sortOption.sortBy, sortOption.typeSort])
    
    const handleChange = (e) => {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const onSearchClick = () => {
      searchProducts();
    };
  
    const btnPrevPageHandler = () => {
      setPaginationState({ ...paginationState, page: page - 1 });
    };
    const btnNextPageHandler = () => {
      setPaginationState({ ...paginationState, page: page + 1 });
    };

    const selectSortHandler = (e) => {
      sortProducts(e.target.value);
    };

    const sortProducts = (sortValue) => {
      switch (sortValue) {
        case "lowPrice":
          setSortOption({ sortBy: 'price', typeSort: 'ASC'})
          break;
        case "highPrice":
          setSortOption({ sortBy: 'price', typeSort: 'DESC'})
          break;
        case "az":
          setSortOption({ sortBy: 'product_name', typeSort: 'ASC'})
          break;
        case "za":
          setSortOption({ sortBy: 'product_name', typeSort: 'DESC'})
          break;
      }
    };
  
    return (
      <div style={{marginInline: '20px'}}>

        <div className="card text-white bg-light mb-3" style={{ maxWidth: '250px', minWidth: '150px', boxShadow: '0 4px 4px 0 rgb(0, 0, 0, 0.2)' }}>
          <div className="card-header d-flex justify-content-center" style={{ color: 'black' }}>
            Filter
          </div>
          <div className="card-body">
          
            {/* Input Filter */}
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Product Name" aria-label="Username" aria-describedby="basic-addon1"
                     onChange={handleChange} name="keyword"
              />
            </div>

            {/* Product Dropdown Filter */}
            <label className="d-flex justify-content-center" style={{ color: 'black' }}>Product Category</label>
            <select className="form-control d-flex justify-content-center" style={{ backgroundColor: 'white', borderStyle: 'grey', color: 'black' }} onChange={handleChange} name="category">
              {productCategories.map((category) => 
                <option key={category.category_id} value={category.category_name}>
                    {category.category_name}
                </option>
              )}
            </select>
            
            {/* Search Button */}
            <button type="button" class="btn btn-danger" style={{marginTop: '18px', width: '100%'}} onClick={onSearchClick}>Search</button>
          
          </div>
        </div>

        {/* Sort */}
        <div className="card text-white bg-light mb-3" style={{ maxWidth: '250px', minWidth: '150px', boxShadow: '0 4px 4px 0 rgb(0, 0, 0, 0.2)' }}>
          <div className="card-header d-flex justify-content-center" style={{ color: 'black' }}>
            Sort
          </div>
          <div className="card-body">

            <select className="form-control d-flex justify-content-center" style={{ backgroundColor: 'white', borderStyle: 'grey', color: 'black' }} 
                    onChange={selectSortHandler}
            >
              <option value="az">Default</option>
              <option value="highPrice">Price: High - Low</option>
              <option value="lowPrice">Price: Low - High</option>
              <option value="az">Name: A - Z</option>
              <option value="za">Name: Z - A</option>
            </select>
            
          </div>
        </div>

        {/* Pagination */}
        <div className="card text-white bg-light mb-3" style={{ maxWidth: '250px', minWidth: '150px', boxShadow: '0 4px 4px 0 rgb(0, 0, 0, 0.2)'}}>
          <div className="card-header d-flex justify-content-center" style={{ color: 'black' }}>
            Page {page} of {lastPage}
          </div>
          <div className="card-body d-flex justify-content-center">
            <div class="btn">
              <button type="button" class="btn btn-danger" onClick={btnPrevPageHandler} disabled={page === 1} style={{ width: '70px', marginRight: '20px' }}>
                {"<<"}
              </button>
              <button type="button" class="btn btn-danger" onClick={btnNextPageHandler} disabled={page === lastPage} style={{ width: '70px', marginLeft: '20px' }}>
                {">>"}
              </button>
            </div>
            
          </div>
        </div>
      </div>
    );
};

export default ProductManager;