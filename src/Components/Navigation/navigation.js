import React from "react";
import {
    Nav,
    Navbar,
    NavLink,
    NavItem,
    NavbarText,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./navigation.css"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Navigation = () => {
    // const dispatch = useDispatch();
    // const { username, role } = useSelector((state) => {
    //     return state.auth;
    // });

    // const onLogoutClick = () => {
    //     dispatch(logoutAction());
    // };

    return (
        <div>
            <Navbar
                color="light"
                expand="md"
                light
            >
                <NavbarBrand href="/">
                    ezfurniture
                </NavbarBrand>
                <NavbarToggler onClick={function noRefCheck(){}} />
                <Collapse navbar>
                <Nav
                    className="mx-auto"
                    navbar
                >
                    <NavItem>
                        <NavLink href="/components/">
                            Products
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="https://github.com/reactstrap/reactstrap">
                            About Us
                        </NavLink>
                    </NavItem>
    
                    <UncontrolledDropdown
                        inNavbar
                        nav
                    >
                    <DropdownToggle
                        caret
                        nav
                    >
                        Options
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                            Option 1
                        </DropdownItem>
                        <DropdownItem>
                            Option 2
                        </DropdownItem>
                            <DropdownItem divider />
                        <DropdownItem>
                            Reset
                        </DropdownItem>
                    </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>

                <Nav navbar>
                    <NavItem>
                        <NavLink href="https://github.com/reactstrap/reactstrap">
                            Login
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="https://github.com/reactstrap/reactstrap">
                            Register
                        </NavLink>
                    </NavItem>
                </Nav>
                
                </Collapse>
            </Navbar>
        </div>
    )
};

export default Navigation;