import React, { useState } from "react";
import { Card, Button, InputGroup, FormControl, Dropdown } from "react-bootstrap";

function ProductManager(props) {
    const { paginationState, setPaginationState } = props;
    const { page, lastPage } = paginationState;
  
    const [formState, setFormState] = useState({
      keyword: "",
      category: "",
    });
  
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
      <div>
        <div className="filter">
        <Card style={{ width: '250px', height: '300px', backgroundColor: '#eaeaea', boxShadow: '0 4px 4px 0 rgb(0, 0, 0, 0.2)', padding: '0px' }}>
          <Card.Header
            style={{display: 'flex', justifyContent: 'center'}}>
              Filter
          </Card.Header>
          <Card.Body>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Product Name"
              />
            </InputGroup>
              <Dropdown style={{display: 'flex', justifyContent: 'center'}}>
                <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{width: '100%'}}>
                  Product Category
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{width: '100%'}}>
                  Room Category
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            <Button variant="primary" style={{display: 'flex', alignItems: 'flex-end', width: '100%', marginTop: '50px'}} size="md">
              Search
            </Button>
          </Card.Body>
        </Card>
        </div>

        <div className="sort" style={{marginTop: '20px'}}>
        <Card style={{ width: '250px', height: '135px', backgroundColor: '#eaeaea', boxShadow: '0 4px 4px 0 rgb(0, 0, 0, 0.2)', padding: '0px' }}>
          <Card.Header
            style={{display: 'flex', justifyContent: 'center'}}>
              Sort
          </Card.Header>
          <Card.Body>
              <Dropdown style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{width: '100%'}}>
                  Sort
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
          </Card.Body>
        </Card>
        </div>

        {/* <div className="sort">
          <Card className="card" id="sort"
            style={{backgroundColor: '#444'}}
          >
            <CardTitle tag="h4" className="title">
              Sort
            </CardTitle>
            
          <div className="dropdown">
          <UncontrolledDropdown>
            <DropdownToggle caret className="category">
              Sort by
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem header>
                  Price
                </DropdownItem>
                <DropdownItem>
                  High - Low
                </DropdownItem>
                <DropdownItem>
                  Low - High
                </DropdownItem>
                <DropdownItem header>
                  Alphabetical Order
                </DropdownItem>
                <DropdownItem>
                  A - Z
                </DropdownItem>
                <DropdownItem>
                  Z - A
                </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          </div>
          </Card>
        </div> */}
      </div>
    );
};

export default ProductManager;

