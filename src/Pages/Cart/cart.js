import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import axios from "../../Config/axios";

import { Card } from "react-bootstrap";
import { Button } from "@mui/material";
import CartBox from './cartBox'

function Cart() {
    const [carts, setCarts] = useState([]);
    const user_id = useSelector((state) => state.auth.user_id);

    console.log(carts)

    const getCart = async () => {
        try {
            const res = await axios.get(`/cart/${user_id}`)
            const { data } = res;
            setCarts(data.cart)
        } catch (error) {
            console.log(alert(error.message))
        }
    };

    useEffect(() => {
        getCart();
    }, [])

    if (carts.length) {
        return (
            <>
                <div className="d-flex justify-content-center mt-5">
                    <Card style={{ width: '1000px', minHeight: '800px', borderRadius: '5px', marginBottom: '50px' }}>
                        <Card.Header style={{ fontSize: '30px', paddingLeft: '20px' }}>
                            <i class="bi bi-cart2" style={{ marginRight: '15px'}}></i>
                            My Cart
                        </Card.Header>
                        <Card.Body className="p-4">
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                {carts.map((cart) => (
                                    <CartBox
                                        key={cart.product_id}
                                        product={cart}
                                    />
                                ))}
                            </div>
                        </Card.Body>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button style={{ width: '300px', marginBottom: '20px'}}
                                    variant="contained"
                                    color="success"
                            >
                                Checkout Now!
                            </Button>
                        </div>           
                    </Card>
                </div>
            </>
        )
    } else {
        return (
            <div>
                <h1>Your cart is still empty</h1>
                <i class="bi bi-emoji-frown"></i>
            </div>
        )
    }

};

export default Cart;