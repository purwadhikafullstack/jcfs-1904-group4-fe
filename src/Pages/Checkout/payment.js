import React from "react";
import axios from "../../Config/axios";

import { Card } from "react-bootstrap";

function Payment() {


    return (
        <div className="d-flex justify-content-center mt-5">
            <Card style={{ width: '750px', height: '750px' }}>
                <Card.Header style={{ display: 'flex', justifyContent: 'center', fontSize: '25px' }}>
                    Payment
                </Card.Header>
                <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <div className="d-flex justify-content-center my-3">
                        <Card.Title>
                            SUCCESS!
                            <i class="bi bi-check-circle-fill" style={{ marginLeft: '10px', color: 'green' }}></i>
                        </Card.Title>
                    </div>
                    
                    <Card.Subtitle style={{ padding: '5px', marginLeft: '20px', fontSize: '17px' }}>
                        Your order was successful! Please complete the payment as soon as possible and upload the proof of payment for us to confirm and proceed with the shipping.
                    </Card.Subtitle>

                    <Card.Title className="mt-4 ml-4">Bank Transfer (Account Number) :</Card.Title>
                    <div className="ml-5">
                        <li>BCA : 1234567891</li>
                        <li>Mandiri : 1234567891</li>
                        <li>BRI : 1234567891</li>
                    </div>
                    
                </Card.Body>
            </Card>
        </div>
    )
};

export default Payment;