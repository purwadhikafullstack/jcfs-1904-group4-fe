import React, { useEffect, useState } from "react";

import { Button } from "@mui/material";
import { Card } from 'react-bootstrap'
import axios from "../../../Config/axios";

function ProductCard(props) {
    const { product_id, product_name, product_desc, product_image_name, price, category_id } = props.products

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [formState, setFormState] = useState({
        edit_product_name: product_name,
        edit_product_desc: product_desc,
        edit_price: price,
        edit_category_id: category_id
    });

    const { edit_product_name, edit_product_desc, edit_price, edit_category_id } = formState;

    const [productCategories, setProductCategories] = useState([]);

    useEffect(() => {
        fetchProductCategories();
        fetchProductPicture();
    }, [])

    const fetchProductCategories = async () => {
        try {
          const res = await axios.get("/categories/get");
          const { data } = res
  
          setProductCategories(data.categories);
        } catch (error) {
          console.log(alert(error.message));
        }
      };

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
                category_id: edit_category_id,
                price: edit_price
            });

            alert("Update was successful")
        } catch (error) {
            console.log(alert(error.message))
        }
    };

    const postPhoto = async () => {
        try {
            const formData = new FormData();
            formData.append("photo", image);

            const res = await axios.post(`/products/photo/${product_id}`, formData);

            alert("Photo successfully uploaded")
        } catch (error) {
            console.log(alert(error.message))
        }
    };

    const imageURL = `http://localhost:2022/products/${product_image_name}`
    const fetchProductPicture = async () => {
        const res = await fetch(imageURL);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImagePreview(imageObjectURL);
    };

    const onImageChange = (e) => {
        const image = e.target.files[0];
        setImage(image);
        setImagePreview(URL.createObjectURL(image));
    };

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
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

    const postPhotoButton = () => {
        postPhoto();
    };

    return (
        <div className="mb-4">
            <Card className="mb-3 ml-3" style={{ width: '1000px', height: '600px' }}>
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column justify-content-start p-4">
                        <Card.Title className="mt-1 mb-3 ml-2">Product ID : {product_id}</Card.Title>
                        <Card.Img variant="top" src={imagePreview} style={{ width: '250px', height: '250px', objectFit: 'cover' }}></Card.Img>
                        <input type="file" alt="Product Image" onChange={onImageChange} className="mt-4"></input>
                        <Button onClick={postPhotoButton} className="mt-3" style={{ width: '250px' }} variant="outlined">Save Image</Button>
                    </div>
                    <Card.Body className="mt-3">
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
                        <select className="form-control d-flex justify-content-center" onChange={handleChange} name="edit_category_id">
                            {productCategories.map((category) => 
                                <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                            )}
                        </select>
                    </Card.Body>
                </div>
                <div className="d-flex flex-row mt-3 justify-content-end mr-3">
                    <Button variant="contained" color="success" onClick={updateProductButton}>Save Changes</Button>
                    <Button variant="contained" color="primary" style={{ marginInline: '40px' }} onClick={removeProductButton}>Remove from website</Button>
                    <Button variant="contained" color="error" style={{ height: '37px', marginRight: '4px' }} onClick={deleteProductButton}>Delete from database</Button>
                </div>
            </Card>
        </div>
    )
}

export default ProductCard;