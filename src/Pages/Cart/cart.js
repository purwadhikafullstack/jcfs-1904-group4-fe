import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import axios from "../../Config/axios";

import { Card } from "react-bootstrap";
import CartBox from './cartBox';
import CheckoutBox from "./checkoutBox";

function Cart() {
    const [carts, setCarts] = useState([]);
    const [totalState, setTotalState] = useState({
        subTotal: 0,
        tax: 0,
        totalPrice: 0
    })
    const user_id = useSelector((state) => state.auth.user_id);

    console.log(totalState)

    const getCart = async () => {
        try {
            const res = await axios.get(`/cart/${user_id}`)
            const { data } = res;

            let subTotal = 0;
            data.cart.forEach((cart) => (subTotal += cart.quantity * cart.product_price));
            const tax = subTotal * 0.05
            const totalPrice = subTotal + tax;

            setTotalState({ subTotal, tax, totalPrice });
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
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
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
                    </Card>
                </div>

                <div style={{ marginTop: '50px', marginLeft: '40px' }}>
                    <CheckoutBox total={totalState} cart={carts} />
                </div>
            </div>
            </>
        )
    } else {
        return (
            <div className="d-flex justify-content-center mt-5">
                <h1>Your cart is still empty</h1>
                <i class="bi bi-emoji-frown"></i>
            </div>
        )
    }

};

export default Cart;