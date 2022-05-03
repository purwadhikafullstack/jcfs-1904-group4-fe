import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../Config/axios";

import HistoryCard from "./historyCard";

import { Card } from "react-bootstrap";
import { Button } from "@mui/material";

function HistoryTransaction() {
    const wh_admin_id = useSelector((state) => state.auth.user_id);

    const [clientName, setClientName] = useState({
        keyword: ""
    });
    const [transactions, setTransactions] = useState([]);
    const [warehouse, setWarehouse] = useState([]);
    const [sortTransactions, setSortTransactions] = useState({
        sortBy: "all"
    });

    // useEffect(() => {
    //     getTransactions();
    // }, [sortTransactions]);

    // const getTransactions = async () => { 

    // if (sortTransactions.sortBy === "all") {
        
    //         try {
    //             const res = await axios.get(`/transactions/get/${user_id}`)
    //             const { data } = res;

    //             setTransactions(data.transactions)
    //         } catch (error) {
    //             alert("You do not have any transaction record")
    //         }

    // } else if (sortTransactions.sortBy === "ongoing") {

    //         try {
    //             const res = await axios.get(`/transactions/get/ongoing/${user_id}`)
    //             const { data } = res;

    //             setTransactions(data.transactions)
    //         } catch (error) {
    //             alert("You do not have any ongoing transactions")
    //         }

    // } else if (sortTransactions.sortBy === "arrived") {   

    //         try {
    //             const res = await axios.get(`/transactions/past/${user_id}`)
    //             const { data } = res;

    //             setTransactions(data.transactions)
    //         } catch (error) {
    //             alert("You do not have any past transactions")
    //         }

    //     };
    // };

    useEffect(() => {
        getTransactions();
    }, []);

    const getTransactions = async () => {
        try {
            const resId = await axios.get(`/users/wh_id/${wh_admin_id}`)
            const { warehouse_id } = resId.data;

            setWarehouse(warehouse_id[0]);
            const res = await axios.get(`/transactions/get/wh/${warehouse_id[0].warehouse_id}`)
            const { transactions } = res.data;

            setTransactions(transactions);
        } catch (error) {
            console.log(alert(error.message));
        }
    };
    
    const getClientTransactions = async () => {
        try {
            // Get transactions from user... and warehouse... 
            const res = await axios.get(`/transactions/search`,
            {
                params: {
                    warehouse_id: warehouse.warehouse_id,
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
        setSortTransactions({ sortBy: e.target.value });
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
                            <HistoryCard 
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
                        <select className="form-control" style={{ display: 'flex', justifyContent: 'center' }} onChange={onSelectHandler}>
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
                <Button color="error" style={{ marginTop: '15px' }} href="/instruction">Transfer Instructions</Button>
            </div>
        </div>
    )
};

export default HistoryTransaction;