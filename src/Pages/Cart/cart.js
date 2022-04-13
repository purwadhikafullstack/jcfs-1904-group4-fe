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

    return (
        <div className="d-flex justify-content-center mt-5">
            <Card style={{width: '1000px', minHeight: '800px'}}>
                <Card.Header style={{fontSize: '30px'}}>
                    My Cart
                </Card.Header>
                <Card.Body>
                    <div className="d-flex flex-wrap col-9">
                        {carts.map((cart) => {
                            <CartBox
                                key={cart.product_id}
                                product={cart}
                            />
                        })}
                    </div>
                </Card.Body>
            </Card>
        </div>
    )

};

export default Cart;