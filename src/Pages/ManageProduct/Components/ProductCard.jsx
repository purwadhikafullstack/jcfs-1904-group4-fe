import React, { useEffect, useState } from "react";

import { Button } from "@mui/material";
import { Card } from 'react-bootstrap'
import axios from "../../../Config/axios";

function ProductCard(props) {
    const { product_id, product_name, product_desc, product_image_name, price, category_id } = props.products

    const [formState, setFormState] = useState({
        edit_product_name: product_name,
        edit_product_desc: product_desc,
        edit_price: price
    });

    const { edit_product_name, edit_product_desc, edit_price } = formState;

    const [category, setCategory] = useState({
        category_id: category_id
    });

    const deleteProduct = async () => {
        try {
            const res = await axios.delete(`/products/delete/${product_id}`)

            alert("Product has been deleted from the database")
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    const removeProduct = async () => {
        try {
            const res = await axios.put(`/products/remove/${product_id}`)

            alert("Product has been removed from the website")
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    const updateProduct = async () => {
        try {
            const res = await axios.put(`/products/update/${product_id}`,
            {
                product_name: edit_product_name,
                product_desc: edit_product_desc,
                category_id: category.category_id,
                price: edit_price
            });

            alert("Update was successful")
        } catch (error) {
            console.log(alert(error.message))
        }
    };

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    };

    const categoryChange = (e) => {
        setCategory({ ...category, category_id: e.tagret.value })
    };

    const deleteProductButton = () => {
        deleteProduct();
    };

    const removeProductButton = () => {
        removeProduct();
    };

    const updateProductButton = () => {
        updateProduct();
    };

    return (
        <div className="mb-4">
            <Card className="mb-3 ml-3" style={{ width: '1000px', height: '600px' }}>
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column justify-content-start p-4">
                        <Card.Img variant="top" src={product_image_name} style={{ width: '250px', height: '250px', objectFit: 'cover' }}></Card.Img>
                        <Card.Title className="mt-3 ml-2">Product ID : {product_id}</Card.Title>
                    </div>
                    <Card.Body>
                        <Card.Title>Product Name</Card.Title>
                            <input 
                                className="mb-3 form-control"
                                name="edit_product_name"
                                type="text"
                                onChange={handleChange}
                                value={edit_product_name}
                            ></input>
                        <Card.Title>Product Price (Rp.)</Card.Title>
                            <input 
                                className="mb-3 form-control"
                                name="edit_price"
                                onChange={handleChange}
                                value={edit_price}
                            ></input>
                        <Card.Title>Product Description</Card.Title>
                            <input 
                                className="mb-3 form-control"
                                name="edit_product_desc"
                                type="text"
                                onChange={handleChange}
                                value={edit_product_desc}
                            ></input>
                        <Card.Title>Stock</Card.Title>
                            <input 
                                className="mb-3 form-control"
                                name="stock"
                                onChange={handleChange}
                            ></input>
                        <Card.Title className="mb-2">Category</Card.Title>
                            <select className="form-control" onChange={categoryChange}>
                                <option value="1">Table</option>
                                <option value="2">Chair</option>
                                <option value="3">Shelf</option>
                                <option value="4">Office Chair</option>
                                <option value="5">Gaming Chair</option>
                                <option value="6">Standing Lamp</option>
                                <option value="7">Children's Mattress</option>
                                <option value="17">Bed</option>
                                <option value="16">Carpet</option>
                                <option value="8">Bench</option>
                                <option value="9">Mirror</option>
                            </select>
                    </Card.Body>
                </div>
                <div className="d-flex flex-row mt-3 justify-content-end mr-3">
                    <Button variant="contained" color="success" onClick={updateProductButton}>Save Changes</Button>
                    <Button variant="contained" color="primary" className="mx-5" onClick={removeProductButton}>Remove from website</Button>
                    <Button variant="contained" color="error" style={{ height: '37px', marginRight: '4px' }} onClick={deleteProductButton}>Delete from database</Button>
                </div>
            </Card>
        </div>
    )
}

export default ProductCard;