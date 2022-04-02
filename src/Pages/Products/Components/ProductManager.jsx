import React, { useState } from "react";
import { Card, Button, InputGroup, FormControl, Dropdown } from "react-bootstrap";

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
      props.sortProducts(e);
    };
  
    const btnPrevPageHandler = () => {
      setPaginationState({ ...paginationState, page: page - 1 });
    };
    const btnNextPageHandler = () => {
      setPaginationState({ ...paginationState, page: page + 1 });
    };
  
    return (
      <div style={{marginInline: '30px'}}>
        <div className="filter">
        <Card style={{ maxWidth: '250px', height: '300px', backgroundColor: '#eaeaea', boxShadow: '0 4px 4px 0 rgb(0, 0, 0, 0.2)', padding: '0px' }}>
          <Card.Header
            style={{display: 'flex', justifyContent: 'center'}}>
              Filter
          </Card.Header>
          <Card.Body>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Product Name"
                name="keyword"
                onChange={handleChange}
              />
            </InputGroup>
              <Dropdown style={{display: 'flex', justifyContent: 'center'}}>
                <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{width: '100%'}}>
                  Product Category
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="Chair">Chair</Dropdown.Item>
                  <Dropdown.Item eventKey="table">Table</Dropdown.Item>
                  <Dropdown.Item eventKey="bed">Bed / Mattress</Dropdown.Item>
                  <Dropdown.Item eventKey="carpet">Carpet</Dropdown.Item>
                  <Dropdown.Item eventKey="shelf">Shelf</Dropdown.Item>
                  <Dropdown.Item eventKey="tvbracket">TV Bracket</Dropdown.Item>
                  <Dropdown.Item eventKey="lamp">Lamp</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{width: '100%'}}>
                  Room Category
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Kitchen</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Outdoor</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Bedroom</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Office</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Living Room</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button variant="success" size="md"
                style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: '50px'}}
                onClick={btnSearchHandler}
              >
                Search
            </Button>
          </Card.Body>
        </Card>
        </div>

        <div className="sort" style={{marginTop: '20px'}}>
        <Card style={{ maxwidth: '250px', height: '120px', backgroundColor: '#eaeaea', boxShadow: '0 4px 4px 0 rgb(0, 0, 0, 0.2)', padding: '0px' }}>
          <Card.Header
            style={{display: 'flex', justifyContent: 'center'}}>
              Sort
          </Card.Header>
          <Card.Body>
              <Dropdown style={{display: 'flex', justifyContent: 'center', marginTop: '5px'}} onSelect={selectSortHandler}>
                <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{width: '100%'}}>
                  Sort by
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="">Default</Dropdown.Item>
                  <Dropdown.Header>Price</Dropdown.Header>
                  <Dropdown.Item eventKey="highPrice">High - Low</Dropdown.Item>
                  <Dropdown.Item eventKey="lowPrice">Low - High</Dropdown.Item>
                  <Dropdown.Header>Alphabetical Order</Dropdown.Header>
                  <Dropdown.Item eventKey="az">A - Z</Dropdown.Item>
                  <Dropdown.Item eventKey="za">Z - A</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
          </Card.Body>
        </Card>
        </div>

        <div className="page" style={{marginTop: '20px'}}>
        <Card style={{ maxwidth: '250px', height: '120px', backgroundColor: '#eaeaea', boxShadow: '0 4px 4px 0 rgb(0, 0, 0, 0.2)', padding: '0px' }}>
          <Card.Header
            style={{display: 'flex', justifyContent: 'center'}}>
              Page {page} of {lastPage}
          </Card.Header>
          <Card.Body style={{display: 'flex', justifyContent: 'space-around'}}>
              <Button variant="success" onClick={btnPrevPageHandler} disabled={page === 1}>{"<<"}</Button>
              <Button variant="success" onClick={btnNextPageHandler} disabled={page === lastPage}>{">>"}</Button>
          </Card.Body>
        </Card>
        </div>
      </div>
    );
};

export default ProductManager;

