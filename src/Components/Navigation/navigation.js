import React from "react";
import {
    Nav,
    Navbar,
    NavDropdown
} from "react-bootstrap";

function Navigation() {
    return (
      <div>
        <Navbar bg="light" expand="lg" style={{boxShadow: '0 6px 6px 0 rgb(0, 0, 0, 0.2)'}}>
          <Navbar.Brand href="#home" style={{paddingTop: '2.5px', marginLeft: '25px'}}>ezfurniture</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{marginRight: '25px'}}/>
          <Navbar.Collapse id="basic-navbar-nav" style={{marginLeft: '25px'}}>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <NavDropdown title="Products" id="basic-nav-dropdown" style={{marginTop: '0px', marginInline: '0px'}}>
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#link">About Us</Nav.Link>
              <Nav.Link href="#home">Login</Nav.Link>
              <Nav.Link href="#link">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    </div>
  )
};

export default Navigation;