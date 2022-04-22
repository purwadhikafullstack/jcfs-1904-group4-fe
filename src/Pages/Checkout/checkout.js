import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../Config/axios";

import './style.css'
import { Card } from "react-bootstrap";
import { Button } from "@mui/material";

function Checkout() {
    const user_id = useSelector((state) => state.auth.user_id);

    const [defaultAddress, setDefaultAddress] = useState([]);
    const [userCart, setUserCart] = useState([]);
    const [address, setAddress] = useState([]);
    const [client, setClient] = useState([]);
    const [totalState, setTotalState] = useState({
        subTotal: 0,
        tax: 0,
        totalPrice: 0
    });

    const carts = userCart.map((cart) => {
        const container = {};

        container.product_id = cart.product_id;
        container.quantity = cart.quantity;
        container.price = cart.price;

        return container;
    });
    console.log(carts)

    const [shipping, setShipping] = useState({
        fee: 100000
    });

    const [grandTotal, setGrandTotal] = useState([]);

    const [chooseAddress, setChooseAddress] = useState({
        address_id: ''
    });

    const [chooseCourier, setChooseCourier] = useState({
        courier: 'jne'
    });

    const [warehouse, setWarehouse] = useState([]);
    const [chooseWarehouse, setChooseWarehouse] = useState({
        warehouse: 1
    });

    useEffect(() => {
        getDefaultAddress();
        getCart();
        getAddress();
        getClient();
        getWarehouse();
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

            let subTotal = 0;
            data.cart.forEach((cart) => (subTotal += cart.quantity * cart.price));
            const tax = subTotal * 0.05
            const totalPrice = subTotal + tax;
            const total = totalPrice + 100000

            setTotalState({ subTotal, tax, totalPrice });
            setGrandTotal(total)
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

    const getWarehouse = async () => {
        try {
            const res = await axios.get('/warehouses/get');
            const { data } = res;

            setWarehouse(data.warehouse)
        } catch (error) {
            console.log(alert(error.message))
        }
    };

    const d = new Date();
    const date = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    const hour = d.getHours();
    const second = d.getSeconds()

    const onPaymentClick = async () => {
        try {
            const res = await axios.post('/transactions/new',
            {
                status: "waiting_payment",
                user_id: user_id,
                amount_price: grandTotal,
                invoice_number: `INV/${second}${hour}${date}${month}${year}${user_id}${userCart[0].cart_id}`,
                recipient: client.full_name,
                courier: chooseCourier.courier,
                warehouse_id: chooseWarehouse.warehouse
            });

            const { data } = res;

            const resDetails = await axios.post(`/transactions/details`,
            {
                transaction_id: data.insertId,
                carts
            });

            const resDelete = await axios.delete(`/cart/delete/${userCart[0].cart_id}`)

            alert("Your order was successful")
        } catch (error) {
            console.log(alert(error.message))
        }
    };

    const selectAddress = (e) => {
        setChooseAddress({...chooseAddress, [e.target.name]: e.target.value})
    };

    const selectCourier = (e) => {
        setChooseCourier({...chooseCourier, [e.target.name]: e.target.value})
    };

    const selectWarehouse = (e) => {
        setChooseWarehouse({...chooseWarehouse, [e.target.name]: e.target.value})
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
                            <option value="sicepat">SiCepat</option>
                        </select>

                        <Card.Title className="mt-3">
                            <i class="bi bi-shop" style={{ marginInline: '12px' }}></i>
                            Warehouse :
                        </Card.Title>
                        <select className="form-control mt-1" onChange={selectWarehouse} name="warehouse">
                            {warehouse.map((wh) => 
                                <option key={wh.warehouse_id} value={wh.warehouse_id}>{wh.warehouse_name}, {wh.province}</option>
                            )}
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
                                    <td>Rp. {cart.price.toLocaleString('id-ID')}</td>
                                </tr>
                            )}
                        </table>
                        
                        <Card.Subtitle className="mt-4">Total Price : Rp. {totalState.subTotal.toLocaleString('id-ID')}</Card.Subtitle>
                        <Card.Subtitle className="mt-2">Tax (5%) : Rp. {totalState.tax.toLocaleString('id-ID')} </Card.Subtitle>
                        <Card.Subtitle className="mt-2">Shipping Fee : Rp. {shipping.fee.toLocaleString('id-ID')} </Card.Subtitle>
                        <Card.Title className="mt-2 mb-4">Subtotal : Rp. {grandTotal.toLocaleString('id-ID')}</Card.Title>
                    </Card.Body>
                </Card>

                <Card style={{ width: '750px', height: '350px', marginLeft: '30px' }}>
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

                        <Card.Title style={{ marginTop: '20px', fontSize: '25px' }}>
                            Total Payment : Rp. {grandTotal.toLocaleString('id-ID')}
                        </Card.Title>
                    </Card.Body>

                    <div className="d-flex justify-content-center">
                        <Button style={{ width: '300px', marginBottom: '20px' }}
                                variant="contained"
                                color="error"
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