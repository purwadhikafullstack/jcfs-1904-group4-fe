import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../Config/axios";

import TransactionCard from "./transactionCard";

import { Card } from "react-bootstrap";
import { Button } from "@mui/material";

function Transaction() {
    const user_id = useSelector((state) => state.auth.user_id);

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        getAllTransactions();
    }, []);

    const getAllTransactions = async () => {
        try {
            const res = await axios.get(`/transactions/get/${user_id}`)
            const { data } = res;

            setTransactions(data.transactions)
        } catch (error) {
            console.log(alert(error.message))
        }
    };

    const getOngoingTransactions = async () => {
        try {
            const res = await axios.get(`/transactions`)
        } catch (error) {
            console.log(alert(error.message))
        }
    };

    const getPastTransactions = async () => {
        try {
            const res = await axios.get(`/transactions`)
        } catch (error) {
            console.log(alert(error.message))
        }
    };


    return (
        <div className="d-flex justify-content-center mt-5">
            <Card style={{ width: '900px', minHeight: '400px', marginInline: '20px', backgroundColor: 'white', boxShadow: '0 6px 6px 0 rgb(0, 0, 0, 0.2)' }}>
                <Card.Header style={{ fontSize: '30px' }}>My Transactions</Card.Header>
                <Card.Body>
                    <div  className="d-flex justify-content-center">
                        {transactions.map((trans) => (
                            <TransactionCard 
                                key={trans.transaction_id}
                                data={trans}
                            />
                        ))}
                    </div>
                </Card.Body>
            </Card>
            <div className="d-flex flex-column">
                <Card style={{ width: '350px', height: '125px' }}>
                    <Card.Header style={{ fontSize: '20px' }}>Filter Transactions</Card.Header>
                    <Card.Body style={{ padding: '20px' }}>
                        <select className="form-control" style={{ display: 'flex', justifyContent: 'center' }}>
                            <option value="az">Default</option>
                            <option value="highPrice">Price: High - Low</option>
                            <option value="lowPrice">Price: Low - High</option>
                            <option value="az">Name: A - Z</option>
                            <option value="za">Name: Z - A</option>
                        </select>
                    </Card.Body>
                </Card>
                <Button color="error" style={{ marginTop: '15px' }} href="/instruction">Transfer Instructions</Button>
            </div>
        </div>
    )
}

export default Transaction;