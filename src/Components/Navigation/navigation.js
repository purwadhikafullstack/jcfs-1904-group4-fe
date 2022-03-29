import React from "react";
import {
    Navbar, Nav, NavbarBrand, NavItem, NavLink, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown
} from "reactstrap";
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
        <Navbar color="light" dark expand="lg">
            <NavbarBrand tag={Link} to="/" dark>
                ezfurniture
            </NavbarBrand>
        </Navbar>
    )
};

export default Navigation;