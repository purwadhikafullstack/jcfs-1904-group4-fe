import axios from '../../Config/axios';
import React, { useEffect, useState } from "react";

import './cartBox.css';
import { Card } from "react-bootstrap";
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function CartBox(props) {
    const { cart_id, product_id, product_name, price, product_image_name, quantity } = props.product

    const [qtty, setQtty] = useState(0)
    const [totalPrice, setTotalPrice] = useState([]);
    const [imagePreview, setImagePreview] = useState("");
    const [newQuantity, setNewQuantity] = useState(quantity + qtty);

    useEffect(() => {
        fetchProductPicture();
    }, []);

    const imageURL = `http://localhost:2022/products/${product_image_name}`
    const fetchProductPicture = async () => {
        const res = await fetch(imageURL);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImagePreview(imageObjectURL);
    };

    const addQuantity = async () => {
        try {
            const res = await axios.put(`/cart/quantity/${cart_id}`,
            {
                product_id: product_id,
                quantity: newQuantity
            });
        } catch (error) {
            console.log(alert(error.message))
        }
    };

    const removeProduct = async () => {
        try {
            const res = await axios.delete(`/cart/delete/${cart_id}/${product_id}`)

        } catch (error) {
            console.log(alert(error.message))
        }
    };

    const addTotalPrice = () => {
        setTotalPrice(price * quantity)
    };

    const quantityBtnHandler = (type) => {
        switch (type) {
          case "increment":
            setQtty(qtty + 1);
            break;
          case "decrement":
            setQtty(qtty - 1);
            break;
        }
    };

    useEffect(() => {
        addTotalPrice();
    }, [quantity])

    useEffect(() => {
        setNewQuantity(newQuantity + qtty);
    }, [qtty])

    useEffect( async () => {
        await addQuantity();
        setQtty(0)
    }, [newQuantity])

    return (
        <div>
            <Card className="cart-box">
                <Card.Img src={imagePreview} className="image"></Card.Img>
                <div className="card-body">
                    <Card.Title>{product_name}</Card.Title>
                    <Card.Subtitle className="mt-1">Product ID: {product_id}</Card.Subtitle>
                    <Card.Title className="mt-4">Price: Rp. {price.toLocaleString('id-ID')}</Card.Title>
                </div>
                <div className="quantity">
                    <Card.Title>Quantity: { quantity }</Card.Title>
                    <div className="button">
                        <IconButton onClick={() => {quantityBtnHandler("increment")}}>
                            <AddIcon color="success"/>
                        </IconButton>
                        <IconButton disabled={ newQuantity === 1 } onClick={() => {quantityBtnHandler("decrement")}}>
                            <RemoveIcon color="success"/>
                        </IconButton>
                        <IconButton onClick={removeProduct}>
                            <DeleteOutlineIcon color="error" />
                        </IconButton>
                    </div>
                    <Card.Title>Total Price: Rp. {totalPrice.toLocaleString('id-ID')}</Card.Title>
                </div>
            </Card>
        </div>
    )
};

export default CartBox;