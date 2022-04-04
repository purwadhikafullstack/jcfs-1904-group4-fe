import React from "react";

import { Card, FormControl, InputGroup } from "react-bootstrap";
import { Button } from "@mui/material";


function Client() {

    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
            <Card style={{width: '1000px', height: '770px'}}>
                <Card.Header style={{fontSize: '30px', display: 'flex', justifyContent: 'center'}}>
                    <i class="bi bi-person-circle" style={{marginRight: '18px'}}></i>
                    My Profile
                </Card.Header>

                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', marginTop: '50px'}}>
                    <div style={{display: 'flex', flexDirection: 'column', marginInline: '30px'}}>

                        <Card border="success" style={{ width: '450px', height: '250px'}}>
                            <Card.Header>Profile Picture</Card.Header>
                            <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                                <Card.Img variant="top" src="http://cdn.onlinewebfonts.com/svg/img_24787.png" style={{objectFit: 'cover', width: '100px', heigh: '100px'}}></Card.Img>
                            </div>
                            <Card.Body style={{display: 'flex', justifyContent: 'center'}}>
                                <div>
                                    <Button color="success" style={{marginInline: '10px'}}>Add / Edit</Button>
                                </div>
                            </Card.Body>
                        </Card>

                        <Card border="success" style={{width: '450px', height: '250px', marginTop: '30px'}}>
                            <Card.Header>Address</Card.Header>
                            <Card.Body>
                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                        placeholder="Add New Address"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        />
                                    </InputGroup>
                                    <Button color="success" style={{fontSize: '15px', height: '40px', marginLeft: '10px'}}>Add</Button>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                        placeholder="Edit Address"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        />
                                    </InputGroup>
                                    <Button color="success" style={{fontSize: '15px', height: '40px', marginLeft: '10px'}}>Save</Button>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                    <select className="form-control">
                                        <option>Address 1</option>
                                        <option>Address 2</option>
                                        <option>Address 3</option>
                                    </select>
                                    <Button color="success" style={{fontSize: '15px', height: '40px', marginLeft: '10px'}}>Delete</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                    <div style={{marginInline: '30px'}}>
                        <Card border="success" style={{ width: '350px', height: '530px' }}>
                            <Card.Header>Profile Data</Card.Header>
                            <Card.Body>
                                <InputGroup className="mb-3">
                                    <FormControl
                                    placeholder="Firstname"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value="Firstname"
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <FormControl
                                    placeholder="Lastname"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value="Lastname"
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <FormControl
                                    placeholder="Lastname"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value="Email"
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <FormControl
                                    placeholder="Lastname"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value="Age"
                                    />
                                </InputGroup>
                                <select className="form-control">
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                                <div style={{marginTop: '20px'}}>
                                    <Card.Title>Default Address</Card.Title>
                                    <select className="form-control" style={{marginTop: '13px'}}>
                                        <option>Address 1</option>
                                        <option>Address 2</option>
                                        <option>Address 3</option>
                                    </select>
                                </div>
                                <div style={{marginTop: '20px'}}>
                                    <Card.Title>Edit Address</Card.Title>
                                    <select className="form-control" style={{marginTop: '13px'}}>
                                        <option>Address 1</option>
                                        <option>Address 2</option>
                                        <option>Address 3</option>
                                    </select>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button color="error" style={{marginTop: '45px', width: '850px'}}>Save Changes</Button>
                </div>
            </Card>
        </div>
    )
};

export default Client;