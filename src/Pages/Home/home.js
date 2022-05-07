import React from "react";
import { useSelector } from 'react-redux';

import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

function Home() {
    const { role } = useSelector((state) => state.auth);

    if (role === "super_admin") {
        return (
            <div className="d-flex flex-row" style={{ height: '905px' }}>
                <div style={{ width:'50%' }} className="d-flex justify-content-center align-items-center"> 
                    <h1>ezfurniture management: Super Admin</h1>
                </div>

                <Card style={{ width:'50%', height: '100%' }}>
                    <Card.Body>
                        <Button variant="outline-success" href="/super-transaction">Go to Transactions</Button>
                        <Button variant="outline-success" href="/manage-products" className="my-3">Go to Product Catalogue</Button>
                        <Button variant="outline-success" href="/orders">Go to Orders</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    } else if (role === "admin") {
        return (
            <div className="d-flex flex-row" style={{ height: '905px' }}>
                <div style={{ width:'50%' }} className="d-flex justify-content-center align-items-center"> 
                    <h1>ezfurniture management: Warehouse Admin</h1>
                </div>

                <Card style={{ width:'50%', height: '100%' }}>
                    <Card.Body>
                        <Button variant="outline-success" href="/super-transaction">Go to Transactions</Button>
                        <Button variant="outline-success" href="/manage-products" className="my-3">Go to Product Catalogue</Button>
                        <Button variant="outline-success" href="/orders">Go to Orders</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    } else if (role === "client") {
        return (
            <div className="d-flex flex-row" style={{ height: '905px' }}>
                <div style={{ width:'50%' }} className="d-flex justify-content-center align-items-center"> 
                    <h1>ezfurniture</h1>
                </div>

                <Card style={{ width:'50%', height: '100%' }}>
                    <Card.Body>
                        <Button variant="outline-success" href="/products">Shop Now!</Button>
                        <Button variant="outline-success" href="/cart" className="my-3">Go to my cart</Button>
                        <Button variant="outline-success" href="/transaction">Go to my transactions</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    } else if (role === "") {
        return (
            <div className="d-flex flex-row" style={{ height: '905px' }}>
                <div style={{ width:'50%' }} className="d-flex justify-content-center align-items-center"> 
                    <h1>ezfurniture</h1>
                </div>

                <Card style={{ width:'50%', height: '100%' }}>
                    <Card.Body>
                        <Button variant="outline-success" href="/login">Login with an existing account</Button>
                        <Button variant="outline-success" href="/register" className="my-3">Create an account</Button>
                        <Button variant="outline-success" href="/products">Look at our products</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
};

export default Home;