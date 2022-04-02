import React from "react";
import {
    Nav,
    Navbar,
    NavDropdown,
    Form,
    FormControl
} from "react-bootstrap";

function Navigation() {
    return (
      <div>
        <Navbar bg="light" expand="lg" style={{boxShadow: '0 6px 6px 0 rgb(0, 0, 0, 0.2)'}}>
          <Navbar.Brand href="#home" style={{paddingTop: '2.5px', marginLeft: '25px'}}>ezfurniture</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" style={{marginRight: '25px'}}/>
          <Navbar.Collapse id="navbarScroll" style={{marginLeft: '25px', maxHeight: '300px'}}>
            <Nav className="me-auto" navbarScroll>
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown title="Products" id="basic-nav-dropdown" style={{marginTop: '0px', marginInline: '0px'}}>
                <NavDropdown.Header>Product Category</NavDropdown.Header>
                <NavDropdown.Item href="/">All Products</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">Tables</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Chairs</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Mirrors</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Beds/Mattresses</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Shelves</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Carpets</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Benches</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">TV Brackets</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#link" style={{marginRight: '7px'}}>About Us</Nav.Link>
              <Form style={{display: 'flex'}}>
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
              </Form>
              </Nav>
              <Nav style={{marginRight: '20px'}}>
                <Nav.Link href="#home" style={{color: 'green'}}>Login</Nav.Link>
                <Nav.Link href="#link" style={{color: 'green'}}>Register</Nav.Link>
              </Nav>
          </Navbar.Collapse>
      </Navbar>
    </div>
  )
};

export default Navigation;