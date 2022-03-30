import React, { useState } from "react";
import "./pm.css"
import { UncontrolledDropdown, Card, Button, CardTitle, InputGroup, Input, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

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
          <Card className="card" id="filter"
            style={{backgroundColor: '#444'}}
          >
            <CardTitle tag="h4" className="title">
              Filter
            </CardTitle>
            <InputGroup>
              <Input placeholder="Product Name" className="input" />
            </InputGroup>

          <div className="dropdown">
          <UncontrolledDropdown>
            <DropdownToggle caret className="category">
              Room Category
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem>
                  Kitchen
                </DropdownItem>
                <DropdownItem>
                  Office
                </DropdownItem>
                <DropdownItem>
                  Outdoor
                </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown>
            <DropdownToggle caret className="category">
              Product Category
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem>
                  Chair
                </DropdownItem>
                <DropdownItem>
                  Table
                </DropdownItem>
                <DropdownItem>
                  Bed
                </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Button className="button">
            Search
          </Button>
          </div>
          </Card>
        </div>

        <div className="sort">
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
        </div>
      </div>
    );
};

export default ProductManager;

