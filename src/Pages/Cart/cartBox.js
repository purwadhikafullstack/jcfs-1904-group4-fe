import React, { useEffect, useState } from "react";

import './cartBox.css';
import { Card } from "react-bootstrap";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Button, IconButton } from "@mui/material";

function CartBox(props) {

    const { product_id, product_name, product_price, product_image_name, quantity } = props.product
    const [totalPrice, setTotalPrice] = useState([]);

    const addTotalPrice = () => {
        setTotalPrice(product_price * quantity)
    };

    useEffect(() => {
        addTotalPrice();
    }, [])

    return (
        <div>
            <Card className="cart-box">
                <Card.Img src={product_image_name} className="image"></Card.Img>
                <div className="card-body">
                    <Card.Title>{product_name}</Card.Title>
                    <Card.Subtitle className="mt-1">Product ID: {product_id}</Card.Subtitle>
                    <Card.Title className="mt-4">Price: {product_price}</Card.Title>
                </div>
                <div className="quantity">
                    <Card.Title>Quantity: {quantity}</Card.Title>
                    <div className="button">
                        <IconButton>
                            <AddIcon color="success"/>
                        </IconButton>
                        <IconButton disabled={quantity === 1}>
                            <RemoveIcon color="success"/>
                        </IconButton>
                    </div>
                    <Card.Title>Total Price: {totalPrice}</Card.Title>
                </div>
            </Card>
        </div>
    )
};

export default CartBox;