import React, { useState } from "react";

function ProductManager(props) {
    const { paginationState, setPaginationState } = props;
    const { page, lastPage } = paginationState;

    const [formState, setFormState] = useState({
      keyword: "",
      category: "",
    });
  
    console.log(formState)

    const handleChange = (e) => {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const btnSearchHandler = () => {
      props.filterProducts(formState);
    };
  
    const selectSortHandler = (e) => {
      props.sortProducts(e.target.value);
    };
  
    const btnPrevPageHandler = () => {
      setPaginationState({ ...paginationState, page: page - 1 });
    };
    const btnNextPageHandler = () => {
      setPaginationState({ ...paginationState, page: page + 1 });
    };
  
    return (
      <div style={{marginInline: '20px'}}>

        <div className="card text-white bg-dark mb-3" style={{maxWidth: '250px', minWidth: '150px', boxShadow: '0 4px 4px 0 rgb(0, 0, 0, 0.2)'}}>
          <div className="card-header" style={{ display: 'flex', justifyContent: 'center'}}>
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
            <label style={{display: 'flex', justifyContent: 'center'}}>Product Category</label>
            <select className="form-control" style={{display: 'flex', justifyContent: 'center', backgroundColor: 'white', border: '0px', color: 'rgb(33, 37, 41)'}} onChange={handleChange} name="category">
              <option value="">Default</option>
              <option value="Tables">Tables</option>
              <option value="Chairs">Chairs</option>
              <option value="Shelves">Shelves</option>
              <option value="Carpets">Carpets</option>
          </select>

            {/* Room Dropdown Filter */}
            <label style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>Room Category</label>
            <select className="form-control" style={{display: 'flex', justifyContent: 'center', backgroundColor: 'white', border: '0px', color: 'rgb(33, 37, 41)'}} onChange={handleChange} name="category">
              <option value="">Default</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Office">Office</option>
              <option value="Bedroom">Bedroom</option>
              <option value="LivingRoom">Living Room</option>
          </select>
            
            {/* Search Button */}
              <button type="button" class="btn btn-danger" style={{marginTop: '18px', width: '100%'}} onClick={btnSearchHandler}>Search</button>
          
          </div>
        </div>

        {/* Sort */}
        <div className="card text-white bg-dark mb-3" style={{maxWidth: '250px', minWidth: '150px', boxShadow: '0 4px 4px 0 rgb(0, 0, 0, 0.2)'}}>
          <div className="card-header" style={{ display: 'flex', justifyContent: 'center'}}>
            Sort
          </div>
          <div className="card-body">

            <select className="form-control" style={{display: 'flex', justifyContent: 'center', backgroundColor: 'rgb(25, 135, 84)', border: '0px', color: 'white'}} onChange={selectSortHandler}>
              <option value="">Default</option>
              <option value="highPrice">High - Low</option>
              <option value="lowPrice">Low - High</option>
              <option value="az">A - Z</option>
              <option value="za">Z - A</option>
            </select>
            
          </div>
        </div>

        {/* Pagination */}
        <div className="card text-white bg-dark mb-3" style={{maxWidth: '250px', minWidth: '150px', boxShadow: '0 4px 4px 0 rgb(0, 0, 0, 0.2)'}}>
          <div className="card-header" style={{ display: 'flex', justifyContent: 'center'}}>
            Page {page} of {lastPage}
          </div>
          <div className="card-body" style={{display: 'flex', justifyContent: 'center'}}>
            <div class="btn">
              <button type="button" class="btn btn-success" onClick={btnPrevPageHandler} disabled={page === 1} style={{width: '70px', marginInline: '20px'}}>
                {"<<"}
              </button>
              <button type="button" class="btn btn-success" onClick={btnNextPageHandler} disabled={page === lastPage} style={{width: '70px', marginInline: '20px'}}>
                {">>"}
              </button>
            </div>
            
          </div>
        </div>
      </div>
    );
};

export default ProductManager;

