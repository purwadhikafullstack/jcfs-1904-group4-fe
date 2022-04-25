import React from "react";

import { Card } from "react-bootstrap";

function Instructions() {
    return (
        <div className="d-flex justify-content-center">
            <Card style={{ width: '800px', height: '880px', marginTop: '50px', marginRight: '50px', marginBottom: '50px' }}>
                <Card.Header className="d-flex justify-content-center" style={{ fontSize: '20px' }}>Transfer Instructions</Card.Header>
                <Card.Body style={{ padding: '30px' }}>
                    <Card.Title className="mb-4">BCA Bank Transfer</Card.Title>
                    <Card.Subtitle className="mb-3">1. Select transfer between accounts</Card.Subtitle>
                    <Card.Subtitle className="mb-3">2. Enter the BCA account number (company name: ezfurniture)</Card.Subtitle>
                    <Card.Subtitle className="mb-3">3. Fill in the total amount of your purchase</Card.Subtitle>
                    <Card.Subtitle className="mb-3">4. Fill in the references with the invoice number (INV/123456789)</Card.Subtitle>
                    <Card.Subtitle className="mb-3">5. Check all the details</Card.Subtitle>
                    <Card.Subtitle className="mb-5">6. Press confirm transfer</Card.Subtitle>

                    <Card.Title className="mb-4">BRI Bank Transfer</Card.Title>
                    <Card.Subtitle className="mb-3">1. Select transfer between accounts</Card.Subtitle>
                    <Card.Subtitle className="mb-3">2. Enter the BRI account number (company name: ezfurniture)</Card.Subtitle>
                    <Card.Subtitle className="mb-3">3. Fill in the total amount of your purchase</Card.Subtitle>
                    <Card.Subtitle className="mb-3">4. Fill in the references with the invoice number (INV/123456789)</Card.Subtitle>
                    <Card.Subtitle className="mb-3">5. Check all the details</Card.Subtitle>
                    <Card.Subtitle className="mb-5">6. Press confirm transfer</Card.Subtitle>

                    <Card.Title className="mb-4">Mandiri Bank Transfer</Card.Title>
                    <Card.Subtitle className="mb-3">1. Select transfer between accounts</Card.Subtitle>
                    <Card.Subtitle className="mb-3">2. Enter the Mandiri account number (company name: ezfurniture)</Card.Subtitle>
                    <Card.Subtitle className="mb-3">3. Fill in the total amount of your purchase</Card.Subtitle>
                    <Card.Subtitle className="mb-3">4. Fill in the references with the invoice number (INV/123456789)</Card.Subtitle>
                    <Card.Subtitle className="mb-3">5. Check all the details</Card.Subtitle>
                    <Card.Subtitle className="mb-5">6. Press confirm transfer</Card.Subtitle>
                </Card.Body>
            </Card>
            <Card style={{ width: '300px', height: '225px', marginTop: '50px' }}>
                <Card.Header className="d-flex justify-content-center" style={{ fontSize: '20px' }}>Bank Account Number</Card.Header>
                <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '30px' }}>
                    <Card.Title className="mb-3">Bank BCA: 1234567890</Card.Title>
                    <Card.Title className="mb-3">Bank BRI: 1234509876</Card.Title>
                    <Card.Title className="mb-3">Bank Mandiri: 0987654321</Card.Title>
                </Card.Body>
            </Card>
        </div>
    )
};

export default Instructions;