import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../Config/axios";

import './style.css'
import { Card } from "react-bootstrap";

function Checkout() {
    const user_id = useSelector((state) => state.auth.user_id);

    const [defaultAddress, setDefaultAddress] = useState([]);
    const [userCart, setUserCart] = useState([]);
    const [address, setAddress] = useState([]);
    const [totalState, setTotalState] = useState({
        subTotal: 0,
        tax: 0,
        totalPrice: 0
    });
    const [paymentMethod, setPaymentMethod] = useState({
        method: ''
    });
    const [chooseAddress, setChooseAddress] = useState({
        address_id: ''
    });

    useEffect(() => {
        getDefaultAddress();
        getCart();
        getAddress();
    }, []);

    useEffect(() => {
        if (chooseAddress.address_id) {
            getChosenAddress()
        }
    }, [chooseAddress])

    console.log(totalState)

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

    const handleMethod = (e) => {
        setPaymentMethod({...paymentMethod, [e.target.name]: e.target.value})
    };

    const selectAddress = (e) => {
        setChooseAddress({...chooseAddress, [e.target.name]: e.target.value})
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="d-flex">

                <Card style={{ width: '750px', minHeight: '750px' }}>
                    <Card.Header style={{ fontSize: '25px' }}>
                        Purchase Details
                    </Card.Header>
                    <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '20px' }}>
                        <Card.Title>
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
                        <select className="form-control mt-3" onChange={selectAddress} name="address_id">
                            {address.map((add) => 
                                <option key={add.address_id} value={add.address_id}>{add.detail_address}</option>
                            )}
                        </select>

                        <Card.Title className="mt-3 mb-3">
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

                        <Card.Title className="mt-3">Total + 5% Tax : Rp. {totalState.totalPrice}</Card.Title>
                    </Card.Body>
                </Card>

                <Card style={{ width: '750px', height: '750px', marginLeft: '30px' }}>
                    <Card.Header style={{ fontSize: '25px' }}>
                        <i class="bi bi-credit-card" style={{ marginRight: '13px' }}></i>
                        Checkout
                    </Card.Header>
                    <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '20px' }}>
                        <Card.Title>
                            Please choose a payment method
                        </Card.Title>

                        <select className="form-control mt-3" name="method" onSelect={handleMethod}>
                            <option value="bank_transfer">Bank Transfer</option>
                            <option value="credit_card">Credit Card</option>
                            <option value="debit_card">Debit Card</option>
                            <option value="gopay">Gopay</option>
                            <option value="ovo">OVO</option>
                        </select>

                        <Card.Title style={{ marginTop: '20px' }}>
                            Total Payment : Rp. {totalState.totalPrice}
                        </Card.Title>
                    </Card.Body>
                </Card>

            </div>
        </div>
    )
}

export default Checkout;