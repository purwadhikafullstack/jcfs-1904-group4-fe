import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../Config/axios";

import TransactionCard from "./transactionCard";

import { Card } from "react-bootstrap";
import { Button } from "@mui/material";

function Transaction() {
    const user_id = useSelector((state) => state.auth.user_id);

    const [transactions, setTransactions] = useState([]);
    const [sortTransactions, setSortTransactions] = useState({
        sortBy: "all"
    });

    useEffect(() => {
        getTransactions();
    }, [sortTransactions]);

    const getTransactions = async () => { 

    if (sortTransactions.sortBy === "all") {
        
            try {
                const res = await axios.get(`/transactions/get/${user_id}`)
                const { data } = res;

                setTransactions(data.transactions)
            } catch (error) {
                alert("You do not have any transaction record")
            }

    } else if (sortTransactions.sortBy === "ongoing") {

            try {
                const res = await axios.get(`/transactions/get/ongoing/${user_id}`)
                const { data } = res;

                setTransactions(data.transactions)
            } catch (error) {
                alert("You do not have any ongoing transactions")
            }

    } else if (sortTransactions.sortBy === "arrived") {   

            try {
                const res = await axios.get(`/transactions/past/${user_id}`)
                const { data } = res;

                setTransactions(data.transactions)
            } catch (error) {
                alert("You do not have any past transactions")
            }

        };
    };

    const onSelectHandler = (e) => {
        setSortTransactions({ sortBy: e.target.value });
      };

    return (
        <div className="d-flex justify-content-center mt-5">
            <Card style={{ minHeight: '400px', marginInline: '20px', marginBottom: '50px', backgroundColor: 'white', boxShadow: '0 6px 6px 0 rgb(0, 0, 0, 0.2)' }}>
                <Card.Header style={{ fontSize: '30px' }}>My Transactions</Card.Header>
                <Card.Body className="d-flex justify-content-center">
                    <div className="d-flex flex-column">
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
                        <select className="form-control" style={{ display: 'flex', justifyContent: 'center' }} onChange={onSelectHandler}>
                            <option value="all">All</option>
                            <option value="ongoing">Ongoing Transactions</option>
                            <option value="arrived">Past Transactions</option>
                        </select>
                    </Card.Body>
                </Card>
                <Button color="error" style={{ marginTop: '15px' }} href="/instruction">Transfer Instructions</Button>
            </div>
        </div>
    )
}

export default Transaction;