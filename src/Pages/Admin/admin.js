import React from "react";

import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

function Admin() {

    return (
        <div className="d-flex justify-content-center"> 
            <Card style={{ width: '800px', height: '300px', fontSize: '30px', marginTop: '200px' }}>
                <Card.Header style={{ display: 'flex', justifyContent: 'center' }}>ezfurniture management</Card.Header>
                <Card.Body style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button variant="outline-success" href="/history-transaction">Go to Transactions</Button>
                    <Button variant="outline-success" href="/manage-products">Go to Product Catalogue</Button>
                    <Button variant="outline-success" href="/orders">Go to Orders</Button>
                </Card.Body>
            </Card>        
        </div>
    )
};

export default Admin;