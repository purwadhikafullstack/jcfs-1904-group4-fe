import React, { useState, useEffect } from "react";

import { Button } from "@mui/material";
import { Card } from "react-bootstrap";

function CheckoutBox(props) {

    const { subTotal, tax, totalPrice } = props.total
    const { product_price, quantity } = props.cart

    const [totalPerItem, setTotalPerItem] = useState([]);

    const addTotalPrice = () => {
        setTotalPerItem(product_price * quantity)
    };

    useEffect(() => {
        addTotalPrice();
    }, [])

     return (
        <Card style={{ width: '400px', height: '240px'}}>
            <Card.Header>Your Shopping Cart</Card.Header>
            <Card.Body>
                <Card.Title style={{ fontSize: '17px'}}>Subtotal: Rp. {subTotal.toLocaleString('id-ID')}</Card.Title>
                <Card.Title style={{ fontSize: '17px'}}>Tax: Rp. {subTotal.toLocaleString('id-ID')} x 5% = Rp. {tax.toLocaleString('id-ID')}</Card.Title>
                <Card.Title className="mt-3">Total Amount: Rp. {totalPrice.toLocaleString('id-ID')}</Card.Title>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button style={{ width: '100%', marginBottom: '15px'}}
                            variant="contained"
                            color="success"
                            href="/checkout"
                    >
                        Checkout Now!
                    </Button>
                </div>
            </Card.Body>
        </Card>
     )
};

export default CheckoutBox;