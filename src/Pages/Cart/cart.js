import React from "react";
import { useSelector } from "react-redux"
import axios from "../../Config/axios";

import { Card } from "react-bootstrap";
import { Button } from "@mui/material";

function Cart() {

    return (
        <div>
            <Card>
                <Card.Header>
                    My Cart
                </Card.Header>
                <Card.Body>
                    
                </Card.Body>
            </Card>
        </div>
    )
};

export default Cart;