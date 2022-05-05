import React from "react";
import { useSelector } from 'react-redux';

import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

function Home() {
    const { role } = useSelector((state) => state.auth);

    if (role === "super_admin") {
        return (
            <div className="d-flex justify-content-center" style={{ marginTop: '200px' }}>
                <Card style={{ width: '600px', height: '300px' }} className="d-flex align-items-center">
                    <Card.Body className="d-flex justify-content-around">
                        <h1>Welcome to ezfurniture</h1>
                        <Button variant="outline-success" href="/super-transaction">Go to Transactions</Button>
                        <Button variant="outline-success" href="/manage-products">Go to Product Catalogue</Button>
                        <Button variant="outline-success" href="/orders">Go to Orders</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    } else if (role === "admin") {
        return (
            <div className="d-flex justify-content-center" style={{ marginTop: '200px' }}>
                <Card style={{ width: '600px', height: '300px' }} className="d-flex align-items-center">
                    <Card.Body className="d-flex justify-content-around">
                        <h1>Welcome to ezfurniture</h1>
                        <Button variant="outline-success" href="/super-transaction">Go to Transactions</Button>
                        <Button variant="outline-success" href="/manage-products">Go to Product Catalogue</Button>
                        <Button variant="outline-success" href="/orders">Go to Orders</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    } else if (role === "client") {
        return (
            <div className="d-flex justify-content-center" style={{ marginTop: '200px' }}>
                <Card style={{ width: '600px', height: '300px' }} className="d-flex align-items-center">
                    <Card.Body className="d-flex justify-content-around">
                        <h1>Welcome to ezfurniture</h1>
                        <Button variant="outline-success" href="/products">Shop Now!</Button>
                        <Button variant="outline-success" href="/cart">Go to my cart</Button>
                        <Button variant="outline-success" href="/transaction">Go to my transactions</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
};

export default Home;