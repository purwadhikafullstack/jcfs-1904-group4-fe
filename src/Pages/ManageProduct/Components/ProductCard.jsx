import React, { useState } from "react";

import { Button } from "@mui/material";
import { Card } from 'react-bootstrap'

function ProductCard(props) {
    const { product_id, product_name, price, product_image_name, product_desc } = props.products;

    const [formState, setFormState] = useState({
        productName: "",
        price: 0,
        stock: 0,
        category: "",
        description: ""
    });

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
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
                                name="productName"
                                type="text"
                                onChange={handleChange}
                                value={product_name}
                            ></input>
                        <Card.Title>Product Price (Rp.)</Card.Title>
                            <input 
                                className="mb-3 form-control"
                                name="price"
                                onChange={handleChange}
                                value={price}
                            ></input>
                        <Card.Title>Product Description</Card.Title>
                            <input 
                                className="mb-3 form-control"
                                name="description"
                                type="text"
                                onChange={handleChange}
                                value={product_desc}
                            ></input>
                        <Card.Title>Stock</Card.Title>
                            <input 
                                className="mb-3 form-control"
                                name="stock"
                                onChange={handleChange}
                            ></input>
                        <Card.Title className="mb-2">Category</Card.Title>
                            <select className="form-control">
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
                    <Button variant="contained" color="success">Save Changes</Button>
                    <Button variant="contained" color="primary" className="mx-5">Remove from website</Button>
                    <Button variant="contained" color="error" style={{ height: '37px', marginRight: '4px' }}>Delete from database</Button>
                </div>
            </Card>
        </div>
    )
}

export default ProductCard;