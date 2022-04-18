import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../Config/axios";

import './style.css'
import { Card } from "react-bootstrap";
import { Button } from "@mui/material";

function Checkout() {
    const user_id = useSelector((state) => state.auth.user_id);
    const [client, setClient] = useState([]);

    const [defaultAddress, setDefaultAddress] = useState([]);
    const [userCart, setUserCart] = useState([]);
    const [address, setAddress] = useState([]);
    const [totalState, setTotalState] = useState({
        subTotal: 0,
        tax: 0,
        totalPrice: 0
    });

    const [shipping, setShipping] = useState({
        fee: 100000
    });

    const [grandTotal, setGrandTotal] = useState([]);

    const [paymentMethod, setPaymentMethod] = useState({
        method: 'bank_transfer'
    });

    const [chooseAddress, setChooseAddress] = useState({
        address_id: ''
    });

    const [chooseCourier, setChooseCourier] = useState({
        courier: 'jne'
    });

    useEffect(() => {
        getDefaultAddress();
        getCart();
        getAddress();
        getClient();
        calculateTotal();
    }, []);

    useEffect(() => {
        if (chooseAddress.address_id) {
            getChosenAddress()
        }
    }, [chooseAddress])

    const getClient = async () => {
        try {
            const res = await axios.get(`/users/get/${user_id}`)
            const { data } = res;

            setClient(data.user[0]);
        } catch (error) {
            console.log(alert(error.message))
        }
    };

    const getDefaultAddress = async () => {
        try {
            const res = await axios.get(`/address/default/${user_id}`)
            const { data } = res;

            setDefaultAddress(data.address[0]);

        } catch (error) {
            console.log(alert(error.message))
        }
    };

    const getCart = async () => {
        try {
            const res = await axios.get(`/cart/${user_id}`)
            const { data } = res;
            console.log(data)
            console.log(data.cart)

            let subTotal = 0;
            data.cart.forEach((cart) => (subTotal += cart.quantity * cart.product_price));
            const tax = subTotal * 0.05
            const totalPrice = subTotal + tax;

            setTotalState({ subTotal, tax, totalPrice });
            setUserCart(data.cart)

        } catch (error) {
            console.log(alert(error.message))
        }
    };

    const getAddress = async () => {
        try {
            const res = await axios.get(`/address/${user_id}`)
            const { data } = res;

            setAddress(data.address)
        } catch (error) {
            console.log(alert(error.message))
        }
    };

    const getChosenAddress = async () => {
        try {
            const res = await axios.get(`/address/chosen/${chooseAddress.address_id}`);
            const { data } = res;
        
            setDefaultAddress(data.address[0])
        } catch (error) {
            console.log(alert(error.message))
        }
    };

    const onPaymentClick = async () => {
        try {
            const res = await axios.post('/transactions/new',
            {
                user_id: user_id,
                recipient: client.full_name,
                courier: chooseCourier.courier,
                amount_price: totalState.totalPrice,
            });
        } catch (error) {
            console.log(alert(error.message))
        }
    };

    const calculateTotal = () => {
        setGrandTotal(totalState.totalPrice + shipping.fee)
    };

    const handleMethod = (e) => {
        setPaymentMethod({...paymentMethod, [e.target.name]: e.target.value})
    };

    const selectAddress = (e) => {
        setChooseAddress({...chooseAddress, [e.target.name]: e.target.value})
    };

    const selectCourier = (e) => {
        setChooseCourier({...chooseCourier, [e.target.name]: e.target.value})
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="d-flex">

                <Card style={{ width: '750px', minHeight: '750px', marginBottom: '50px' }}>
                    <Card.Header style={{ fontSize: '25px' }}>
                        Purchase Details
                    </Card.Header>
                    <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '20px' }}>
                        <Card.Title>
                            <i class="bi bi-house-fill" style={{marginRight: '10px'}}></i>
                            Shipping Address :
                        </Card.Title>
                        <Card.Subtitle className="mt-3">
                            Address : {defaultAddress.detail_address}
                        </Card.Subtitle>
                        <Card.Subtitle className="mt-3">
                            Province : {defaultAddress.province}
                        </Card.Subtitle>
                        <Card.Subtitle className="mt-3">
                            City : {defaultAddress.city}
                        </Card.Subtitle>
                        <Card.Subtitle className="mt-3">
                            District : {defaultAddress.district}
                        </Card.Subtitle>
                        <Card.Subtitle className="mt-3">
                            Village : {defaultAddress.village}
                        </Card.Subtitle>
                        <Card.Subtitle className="mt-3">
                            Postal Code : {defaultAddress.postal_code}
                        </Card.Subtitle>

                        <Card.Title className="mt-4">Choose a different address :</Card.Title>
                        <select className="form-control mt-2" onChange={selectAddress} name="address_id">
                            {address.map((add) => 
                                <option key={add.address_id} value={add.address_id}>{add.detail_address}</option>
                            )}
                        </select>

                        <Card.Title className="mt-3">
                            <i class="bi bi-truck" style={{ marginInline: '12px' }}></i>
                            Please select a courier :
                        </Card.Title>
                        <select className="form-control mt-1" onChange={selectCourier} name="courier">
                            <option value="jne">JNE</option>
                            <option value="j&t">J&T</option>
                            <option value="tiki">Tiki</option>
                            <option value="sicepat">SiCepat</option>
                            <option value="anteraja">AnterAja</option>
                            <option value="ninja">Ninja Express</option>
                        </select>

                        <Card.Title className="mt-5 mb-3">
                            <i class="bi bi-cart4" style={{ marginRight: '10px' }}></i>
                            Products :
                        </Card.Title>
                        <table>
                            <tr>
                                <th>Product ID</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                            {userCart.map((cart) => 
                                <tr key={cart.product_id}d>
                                    <td>{cart.product_id}</td> 
                                    <td>{cart.product_name}</td>
                                    <td>{cart.quantity}</td>
                                    <td>{cart.product_price}</td>
                                </tr>
                            )}
                        </table>
                        
                        <Card.Subtitle className="mt-4">Total Price : Rp. {totalState.subTotal}</Card.Subtitle>
                        <Card.Subtitle className="mt-2">Tax (5%) : Rp. {totalState.tax} </Card.Subtitle>
                        <Card.Subtitle className="mt-2">Shipping Fee : Rp. {shipping.fee} </Card.Subtitle>
                        <Card.Title className="mt-2 mb-4">Subtotal : Rp. {grandTotal}</Card.Title>
                    </Card.Body>
                </Card>

                <Card style={{ width: '750px', height: '425px', marginLeft: '30px' }}>
                    <Card.Header style={{ fontSize: '25px' }}>
                        <i class="bi bi-credit-card" style={{ marginRight: '13px' }}></i>
                        Checkout
                    </Card.Header>
                    <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '20px' }}>
                        
                        <Card.Title>
                            <i class="bi bi-person-circle" style={{ marginRight: '10px' }}></i>
                            Billing Account / Recipient :
                        </Card.Title>
                        {client.gender === "male" && (
                            <Card.Subtitle className="mt-2">Mr. {client.full_name}</Card.Subtitle>
                        )}
                        {client.gender === "female" && (
                            <Card.Subtitle className="mt-2">Ms. {client.full_name}</Card.Subtitle>
                        )}
                        <Card.Subtitle className="mt-2 mb-5">Email : {client.email}</Card.Subtitle>
                            
                        <Card.Title>
                            Please choose a payment method :
                        </Card.Title>

                        <select className="form-control mt-2" name="method" onChange={handleMethod}>
                            <option value="bank_transfer">Bank Transfer</option>
                            <option value="credit_card">Credit Card</option>
                            <option value="debit_card">Debit Card</option>
                        </select>

                        <Card.Title style={{ marginTop: '20px' }}>
                            Total Payment : Rp. {grandTotal}
                        </Card.Title>
                    </Card.Body>

                    <div className="d-flex justify-content-center">
                        <Button style={{ width: '300px', marginBottom: '20px' }}
                                variant="contained"
                                color="error"
                                href="/payment"
                                onClick={onPaymentClick}
                        >
                            Confirm Order
                        </Button>
                    </div>

                </Card>

            </div>
        </div>
    )
}

export default Checkout;