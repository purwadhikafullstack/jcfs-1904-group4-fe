import React from "react";

import { Card } from "react-bootstrap";
import { Button } from "@mui/material";


function Client() {

    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
            <Card style={{width: '1000px', height: '750px'}}>
                <Card.Header style={{fontSize: '30px', display: 'flex', justifyContent: 'center'}}>
                    <i class="bi bi-person-circle" style={{marginRight: '18px'}}></i>
                    My Profile
                </Card.Header>

                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-around', width: '800px'}}>

                        <Card border="success" style={{ width: '350px', height: '250px'}}>
                            <Card.Header>Profile Picture</Card.Header>
                            <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                                <Card.Img variant="top" src="http://cdn.onlinewebfonts.com/svg/img_24787.png" style={{objectFit: 'cover', width: '100px', heigh: '100px'}}></Card.Img>
                            </div>
                            <Card.Body style={{display: 'flex', justifyContent: 'center'}}>
                                <div>
                                    <Button color="success" style={{marginInline: '10px'}}>Edit</Button>
                                    <Button variant="contained" color="success" style={{marginInline: '10px'}}>Save</Button>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card border="success" style={{ width: '350px', height: '250px' }}>
                            <Card.Header>Profile Data</Card.Header>
                            <Card.Body>
                            <Card.Title>Success Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk
                                of the card's content.
                            </Card.Text>
                            </Card.Body>
                        </Card>

                    </div>
                </div>

                <div style={{marginTop: '40px', display: 'flex', justifyContent: 'center'}}>
                    <Card border="success" style={{width: '750px', height: '250px'}}></Card>
                </div>
            </Card>
        </div>
    )
};

export default Client;