import React from "react";

import { Card } from "react-bootstrap";

function CartBox(props) {

    const { product_id, product_name, product_price, product_image_name, quantity } = props.product
    console.log(product_id)
    console.log(quantity)

    return (
        <Card style={{ boxShadow: '0 6px 6px 0 rgb(0, 0, 0, 0.2)', height: '200px', backgroundColor: 'black'}}>
            <Card.Title>{product_name}</Card.Title>
            <Card.Subtitle>{product_price}</Card.Subtitle>
        </Card>
    )
};

export default CartBox;