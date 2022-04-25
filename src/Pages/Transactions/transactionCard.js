import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../Config/axios";

import './style.css';    
import { Card } from "react-bootstrap";
import { Button } from "@mui/material";

function TransactionCard(props) {
    const user_id = useSelector((state) => state.auth.user_id);

    const { transaction_id, recipient, invoice_number, amount_price, status, created_at } = props.data

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const onImageChange = (e) => {
        const image = e.target.files[0];
        setImage(image);
        setImagePreview(URL.createObjectURL(image));
    };

    const imageURL = `http://localhost:2022/transaction/${user_id}-transaction-${transaction_id}.jpg`
    const fetchTransactionPhoto = async () => {
        const res = await fetch(imageURL);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImagePreview(imageObjectURL);
    };

    const postPhoto = async () => {
        try {
            const formData = new FormData();
            formData.append("photo", image);

            const res = await axios.post(`/transactions/photo/${user_id}/${transaction_id}`, formData);

            alert("Upload was successful")
        } catch (error) {
            console.log(alert(error.message))
        }
    };

    useEffect(() => {
        fetchTransactionPhoto();
    }, []);

    return (
        <div>
            <Card className='kartu' style={{ width: '750px', marginBottom: '20px', boxShadow: '0 4px 4px 0 rgb(0, 0, 0, 0.2)' }}>
                <Card.Body>
                    <div className="d-flex flex-row">
                        <div style={{ marginRight: '70px' }}>
                            <Card.Title className="mb-3">Invoice number:</Card.Title>
                            <Card.Subtitle className="mb-5">{invoice_number}</Card.Subtitle>
                            <Card.Subtitle className="mb-3">Recipient: {recipient}</Card.Subtitle>
                            <Card.Subtitle className="mb-3">Total Price: Rp. {amount_price.toLocaleString('id-ID')}</Card.Subtitle>
                            {status === "waiting_payment" && (
                                <Card.Subtitle className="mb-3">Status: Waiting Payment</Card.Subtitle>
                            ) || status === "waiting_confirmation" && (
                                <Card.Subtitle className="mb-3">Status: Waiting Confirmation</Card.Subtitle>
                            ) || status === "payment_accepted" && (
                                <Card.Subtitle className="mb-3">Status: Payment Accepted</Card.Subtitle>
                            ) || status === "payment_rejected" && (
                                <Card.Subtitle className="mb-3">Status: Payment Rejected</Card.Subtitle>
                            ) || status === "shipped" && (
                                <Card.Subtitle className="mb-3">Status: Shipped</Card.Subtitle>
                            ) || status === "arrived" && (
                                <Card.Subtitle className="mb-3">Status: Arrived</Card.Subtitle>
                            )}
                            <Card.Subtitle>Date: {created_at}</Card.Subtitle>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', width: '400px', marginTop: '10px', marginBottom: '20px' }}>
                            <div className="d-flex flex-column">
                                <div className="d-flex justify-content-center">
                                    <Card.Img
                                        variant="top"
                                        alt="No file uploaded yet" 
                                        src={imagePreview} 
                                        style={{ objectFit: 'cover', width: '200px', height: '200px', borderRadius: '3px' }}
                                    >
                                    </Card.Img>
                                </div>
                                <input type="file" alt="Profile Picture" onChange={onImageChange} style={{ width: '250px', marginBottom: '20px', marginTop: '20px' }}></input>
                                <Button variant="outlined" color="success" onClick={postPhoto} style={{ width: '100%' }}>
                                    Upload Image
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
};

export default TransactionCard;