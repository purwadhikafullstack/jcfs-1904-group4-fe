import React, { useEffect, useState } from "react";
import axios from "../../Config/axios";

import TransactionsCard from "./superCard";

import { Card } from "react-bootstrap";
import { Button } from "@mui/material";

function SuperTransaction() {
    const [clientName, setClientName] = useState({
        keyword: ""
    });
    const [transactions, setTransactions] = useState([]);
    const [filterTransactions, setFilterTransactions] = useState({
        filterBy: "all"
    });

    useEffect(() => {
        getTransactions();
    }, [filterTransactions]);

    const getTransactions = async () => { 

        if (filterTransactions.filterBy === "all") {
            
                try {
                    const res = await axios.get(`/transactions/all`)
                    const { data } = res;
    
                    setTransactions(data.transactions)
                } catch (error) {
                    alert("No transactions found")
                }
    
        } else if (filterTransactions.filterBy === "ongoing") {
    
                try {
                    const res = await axios.get(`/transactions/ongoing`)
                    const { data } = res;
    
                    setTransactions(data.transactions)
                } catch (error) {
                    alert("None ongoing transactions")
                }
    
        } else if (filterTransactions.filterBy === "arrived") {   
    
                try {
                    const res = await axios.get(`/transactions/past`)
                    const { data } = res;
    
                    setTransactions(data.transactions)
                } catch (error) {
                    alert("None past transactions")
                }
    
            };
        };
    
    const getClientTransactions = async () => {
        try {
            // Get transactions from user... and warehouse... 
            const res = await axios.get(`/transactions/search`,
            {
                params: {
                    recipient_name: clientName.keyword
                }
            })
            const { transactions } = res.data;

            setTransactions(transactions);
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    const onSelectHandler = (e) => {
        setFilterTransactions({ filterBy: e.target.value });
    };

    const onSearchButton = () => {
        getClientTransactions();
    };

    const handleChange = (e) => {
        setClientName({ ...clientName, [e.target.name]: e.target.value });
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            <Card style={{ minHeight: '450px', minWidth: '790px', marginInline: '20px', marginBottom: '50px', backgroundColor: 'white', boxShadow: '0 6px 6px 0 rgb(0, 0, 0, 0.2)' }}>
                <Card.Header style={{ fontSize: '30px' }}>Transactions</Card.Header>
                <Card.Body className="d-flex justify-content-center">
                    <div className="d-flex flex-column">
                        {transactions.map((card) => (
                            <TransactionsCard 
                                key={card.transaction_id}
                                data={card}
                            />
                        ))}
                    </div>
                </Card.Body>
            </Card>
            <div className="d-flex flex-column">
                <Card style={{ width: '350px' }}>
                    <Card.Header style={{ fontSize: '20px' }}>Filter Transactions</Card.Header>
                    <Card.Body style={{ padding: '20px' }}>
                        <select className="form-control d-flex justify-content-center" onChange={onSelectHandler}>
                            <option value="all">All</option>
                            <option value="ongoing">Ongoing Transactions</option>
                            <option value="arrived">Past Transactions</option>
                        </select>
                        <Card.Subtitle className="mt-3">Search by Recipient's Name</Card.Subtitle>
                        <input type="text" className="form-control mt-2" placeholder="Recipient Name" aria-label="Username" aria-describedby="basic-addon1"
                               onChange={handleChange} name="keyword">
                        </input>
                        <Button onClick={onSearchButton} className="mt-3" variant="contained">Search</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
};

export default SuperTransaction;