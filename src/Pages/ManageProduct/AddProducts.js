import React, { useEffect, useState } from "react";
import axios from "../../Config/axios";

import { Card, Button } from "react-bootstrap";

function AddProducts() {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [formState, setFormState] = useState({
        product_name: "",
        product_desc: "",
        price: 0,
        is_deleted: 0,
        category_id: 1
    });

    const [productId, setProductId] = useState([]);
    const [productCategories, setProductCategories] = useState([]);

    useEffect(() => {
        fetchProductCategories();
    }, []);

    const fetchProductCategories = async () => {
        try {
          const res = await axios.get("/categories/get");
          const { data } = res
  
          setProductCategories(data.categories);
        } catch (error) {
          console.log(alert(error.message));
        }
    };

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

            alert("Product succesfully added")
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    const postNewProductCategory = async () => {
        try {
            const res = await axios.post(`/products/category/${productId}`,
            {
                category_id: formState.category_id
            });

        } catch (error) {
            console.log(alert(error.message))
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

    const addProductButton = () => {
        postProduct();
        postNewProductCategory();
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
                        <Card.Title className="mb-3">Category</Card.Title>
                            <select className="form-control d-flex justify-content-center" onChange={handleChange} name="category_id">
                                {productCategories.map((category) => 
                                    <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                                )}
                            </select>
                        <Card.Title className="mt-4 mb-2">Add to website?</Card.Title>
                            <select className="form-control" onChange={handleChange} name="is_deleted">
                                <option value="0">Yes</option>
                                <option value="1">No</option>
                            </select>
                    </Card.Body>
                </div>
                <div className="d-flex flex-row mt-4 justify-content-end mr-3">
                    <Button variant="success" onClick={addProductButton} style={{ width: '100%', marginLeft: '20px' }}>Add</Button>
                </div>
            </Card>
        </div>
    )
};

export default AddProducts;