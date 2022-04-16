import React, { useEffect, useState } from "react";
import axios from "../../Config/axios";
import { useSelector } from "react-redux";

import "./style.css";
import { Card } from 'react-bootstrap';
import { Button } from '@mui/material';

function ProductCard(props) {

    const [cartState, setCartState] = useState([]);
    // const { quantity } = cartState;
    console.log(cartState)
    // console.log(quantity)

    const { product_id, product_name, price, product_image_name } = props.product;
    const user_id = useSelector((state) => state.auth.user_id);

    const addToCartHandler = async () => {
        try {
            const res = await axios.get(`/cart/${user_id}/${product_id}`)
            const { quantity } = res.data;
            console.log(quantity)
            setCartState(quantity)

            if (quantity) {

                try {
                    const res = await axios.put(`/cart/quantity/${user_id}`,
                    {
                        product_id: props.product.product_id,
                        quantity: quantity.quantity + 1
                    })

                    alert("Successfully added to cart")
                } catch (error) {
                    console.log(alert(error.message))
                }

            } else {

                try {
                    const res = await axios.post(`/cart/add`,
                    {
                        user_id: user_id,
                        product_id: props.product.product_id,
                        product_name: props.product.product_name,
                        product_price: props.product.price,
                        product_image_name: props.product.product_image_name,
                        quantity: 1
                    })

                    alert("Successfully added to cart")
                } catch (error) {
                    console.log(alert(error.message))
                }

            }

        } catch (error) {
            console.log(alert(error.message))
        }
    };

    return (
        <div>
            <Card className="kartu" style={{ width: '250px', height: '450px', borderRadius: '5px', boxShadow: '0 4px 4px 0 rgb(0, 0, 0, 0.2)', backgroundColor: '#eaeaea', marginInline: '20px', marginBottom: '40px'}}>
                <Card.Img variant="top" src={product_image_name} style={{width: '248px', height: '248px', objectFit: 'cover'}}/>
                <Card.Body>
                    <Card.Title>{product_name}</Card.Title>
                    <Card.Subtitle style={{fontSize: '20px'}}>Rp. {price}</Card.Subtitle>
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                        <Button variant="outlined" color="error" style={{width: '100%'}} href={`/products/${product_id}`}>
                            Details
                        </Button>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                        <Button variant="contained" color="success" style={{width: '100%'}} onClick={addToCartHandler}>
                            Add to Cart
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
};

export default ProductCard;