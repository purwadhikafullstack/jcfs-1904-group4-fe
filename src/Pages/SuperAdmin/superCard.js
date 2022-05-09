import React, { useEffect, useState } from "react";
import axios from "../../Config/axios";
  
import { Card } from "react-bootstrap";
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

function TransactionsCard(props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const { warehouse_id, transaction_id, recipient, invoice_number, amount_price, status, created_at, user_id } = props.data;

    const [imagePreview, setImagePreview] = useState("");
    const [transactionDetails, setTransactionDetails] = useState([]);
    const [transactionAddress, setTransactionAddress] = useState([]);

    useEffect(() => {
        getTransactionDetails();
        fetchTransactionPhoto();
        getTransactionAddress();
    }, [])

    const imageURL = `http://localhost:2022/transaction/${user_id}-transaction-${transaction_id}.jpg`
    const fetchTransactionPhoto = async () => {
        const res = await fetch(imageURL);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImagePreview(imageObjectURL);
    };

    const getTransactionDetails = async () => {
        try {
            const res = await axios.get(`/transactions/get/details/${transaction_id}`)
            const { transactions } = res.data;

            setTransactionDetails(transactions)
        } catch (error) {
            alert("You do not have any transaction record")
        }
    };

    const getTransactionAddress = async () => {
        try {
            const res = await axios.get(`/address/transaction/${transaction_id}`)
            const { address } = res.data;

            setTransactionAddress(address[0])
        } catch (error) {
            alert("An error occured")
        }
    };

    return (
        <div>
            <Card style={{ width: '750px', marginBottom: '20px', boxShadow: '0 4px 4px 0 rgb(0, 0, 0, 0.2)' }}>
                <Card.Body>
                    <div className="d-flex flex-row">
                        <div style={{ marginRight: '70px' }}>
                            <Card.Title className="mb-3" style={{ fontSize: '25px' }}>Invoice number:</Card.Title>
                            <Card.Subtitle className="mb-5">{invoice_number}</Card.Subtitle>
                            <Card.Subtitle className="mb-3">Warehouse: {warehouse_id}</Card.Subtitle>
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
                        <div>
                            <Card.Title className="mb-5" style={{ fontSize: '25px' }}>Shipping Address:</Card.Title>
                            <Card.Subtitle className="mb-3">Address: {transactionAddress.detail_address}</Card.Subtitle>
                            <Card.Subtitle className="mb-3">Province: {transactionAddress.province}</Card.Subtitle>
                            <Card.Subtitle className="mb-3">City: {transactionAddress.city}</Card.Subtitle>
                            <Card.Subtitle className="mb-3">District: {transactionAddress.district}</Card.Subtitle>
                            <Card.Subtitle className="mb-3">Village: {transactionAddress.village}</Card.Subtitle>
                            <Card.Subtitle className="mb-3">Postal Code: {transactionAddress.postal_code}</Card.Subtitle>
                        </div>
                    </div>

                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        >
                        <ExpandMoreIcon />
                    </ExpandMore>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography style={{ fontSize: '25px' }}>Purchase Details:</Typography>
                            <table className="mt-3" style={{ width: '100%' }}>
                                <tbody>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                                    {transactionDetails.map((detail) =>
                                        <tr key={detail.product_id}d>
                                            <td>{detail.product_id}</td> 
                                            <td>{detail.product_name}</td>
                                            <td>{detail.quantity}</td>
                                            <td>Rp. {detail.price.toLocaleString('id-ID')}</td>
                                        </tr>
                                    )}
                                </tbody> 
                            </table>

                            <Typography style={{ fontSize: '25px', marginTop: '30px' }}>Transfer Evidence:</Typography>
                            <div style={{ display: 'flex', justifyContent: 'center', width: '700px', marginTop: '20px', marginBottom: '20px' }}>
                                <div className="d-flex flex-column">
                                    <div className="d-flex justify-content-center flex-column">
                                        <Card.Img
                                            variant="top"
                                            alt="No file uploaded yet" 
                                            src={imagePreview} 
                                            style={{ objectFit: 'cover', width: '550px', height: '550px', borderRadius: '3px' }}
                                        >
                                        </Card.Img>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Collapse>
                </Card.Body>
            </Card>
        </div>
    )
};

export default TransactionsCard;