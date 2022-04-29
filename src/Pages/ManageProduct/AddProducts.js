import React, { useState } from "react";
import axios from "../../Config/axios";

import { Card, Button } from "react-bootstrap";

function AddProducts() {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [formState, setFormState] = useState({
        product_name: "",
        product_desc: "",
        price: 0,
        is_deleted: 0
    });
    const [category, setCategory] = useState({
        category_id: 1
    });
    const [productId, setProductId] = useState([]);
    console.log(productId)

    const postProduct = async () => {
        try {
            const res = await axios.post('/products/new',
            {
                product_name: formState.product_name,
                product_desc: formState.product_desc,
                price: formState.price,
                is_deleted: formState.is_deleted
            });

            const { insertId } = res.data;
            setProductId(insertId);

            const resCat = await axios.post(`/products/category/${insertId}`,
            {
                category_id: category.category_id
            });

            alert("Product succesfully added")
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    const postPhoto = async () => {
        try {
            const formData = new FormData();
            formData.append("photo", image);

            const res = await axios.post(`/products/photo/${productId}`, formData);

            alert("Photo successfully uploaded")
        } catch (error) {
            console.log(alert(error.message))
        }
    };

    const onImageChange = (e) => {
        const image = e.target.files[0];
        setImage(image);
        setImagePreview(URL.createObjectURL(image));
    };

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    };

    const categoryChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.tagret.value })
    };

    const addProductButton = () => {
        postProduct();
    };

    const postPhotoButton = () => {
        postPhoto();
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            <Card style={{ width: '1000px', height: '700px' }}>
                <Card.Header className="d-flex justify-content-center" style={{ fontSize: '25px' }}>
                    <i class="bi bi-plus-lg" style={{ color: 'green', marginRight: '12px' }}></i>
                    Add Products
                </Card.Header>
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column justify-content-start p-4">
                        <Card.Img variant="top" src={imagePreview} style={{ width: '250px', height: '250px', objectFit: 'cover' }}></Card.Img>
                        <input type="file" className="mt-3" onChange={onImageChange}></input>
                        <Button onClick={postPhotoButton} style={{ width: '250px', marginTop: '20px' }} variant="danger">Save Image</Button>
                    </div>
                    <Card.Body>
                        <Card.Title>Product Name</Card.Title>
                            <input
                                className="mb-3 form-control"
                                name="product_name"
                                type="text"
                                onChange={handleChange}
                            ></input>
                        <Card.Title>Product Price (Rp.)</Card.Title>
                            <input 
                                className="mb-3 form-control"
                                name="price"
                                onChange={handleChange}
                            ></input>
                        <Card.Title>Product Description</Card.Title>
                            <input 
                                className="mb-3 form-control"
                                name="product_desc"
                                type="text"
                                onChange={handleChange}
                            ></input>
                        <Card.Title>Stock</Card.Title>
                            <input 
                                className="mb-3 form-control"
                                name="stock"
                                onChange={handleChange}
                            ></input>
                        <Card.Title className="mb-2">Category</Card.Title>
                            <select className="form-control" onChange={categoryChange} name="category_id">
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
                        <Card.Title className="mt-4">Add to website?</Card.Title>
                            <select className="form-control" onChange={handleChange} name="is_deleted">
                                <option value="0">Yes</option>
                                <option value="1">No</option>
                            </select>
                    </Card.Body>
                </div>
                <div className="d-flex flex-row mt-5 justify-content-end mr-3">
                    <Button variant="success" onClick={addProductButton} style={{ width: '100%', marginLeft: '20px' }}>Add</Button>
                </div>
            </Card>
        </div>
    )
};

export default AddProducts;