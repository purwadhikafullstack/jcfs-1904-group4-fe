import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import { Card, FormControl, InputGroup } from "react-bootstrap";
import { Button } from "@mui/material";
import axios from "../../Config/axios";

function Client() {
    const [address, setAddress] = useState()
    const user_id = useSelector((state) => state.auth.user_id);

    const getAddress = async () => {
        try {
            const res = await axios.get(`/address/${user_id}`)
            const { data } = res;
            setAddress(data.address)
        } catch (error) {
            console.log(alert(error.message))
        }
    };

    useEffect(() => {
        getAddress();
    }, []);

    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
            <Card style={{width: '1000px', height: '870px'}}>
                <Card.Header style={{fontSize: '30px', display: 'flex', justifyContent: 'center'}}>
                    <i class="bi bi-person-circle" style={{marginRight: '18px'}}></i>
                    My Profile
                </Card.Header>

                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: '50px'}}>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginInline: '30px'}}>

                        <Card border="secondary" style={{ width: '420px', height: '350px'}}>
                            <Card.Header>Profile Picture</Card.Header>
                            <div style={{display: 'flex', justifyContent: 'center', marginTop: '70px'}}>
                                <Card.Img variant="top" src="http://cdn.onlinewebfonts.com/svg/img_24787.png" style={{objectFit: 'cover', width: '100px', heigh: '100px'}}></Card.Img>
                            </div>
                            <Card.Body style={{display: 'flex', justifyContent: 'center'}}>
                                <div>
                                    <Button color="primary" style={{marginInline: '10px'}}>Add / Edit</Button>
                                </div>
                            </Card.Body>
                        </Card>

                        <Card border="secondary" style={{ width: '350px', height: '350px' }}>
                            <Card.Header>Profile Data</Card.Header>
                            <Card.Body>
                                <input type="text" className="form-control mt-1" placeholder="Fullname" aria-label="Username" aria-describedby="basic-addon1"
                                    name="full_name" value="" 
                                />
                                <input type="text" className="form-control mt-3" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"
                                    name="email" value=""
                                />
                                <input type="text" className="form-control mt-3" placeholder="Phone Number" aria-label="Username" aria-describedby="basic-addon1"
                                    name="phone_number" value=""
                                />
                                <input type="text" className="form-control mt-3" placeholder="Age" aria-label="Username" aria-describedby="basic-addon1"
                                    name="age" value=""
                                />
                                <select className="form-control mt-3">
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </Card.Body>
                        </Card>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '35px', }}>
                        <Button color="primary" style={{width: '850px'}}>Save Changes</Button>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'center', marginInline: '30px'}}>
                        <Card border="secondary" style={{width: '850px', height: '270px', marginTop: '30px'}}>
                            <Card.Header>
                                <i class="bi bi-house-fill" style={{marginRight: '15px'}}></i>
                                My Default Address</Card.Header>
                            <Card.Body>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <h6>Address:</h6>
                                    <h6>City:</h6>
                                    <h6>Province:</h6>
                                    <h6>Village:</h6>
                                    <h6>Postal Code:</h6>
                                </div>
                                <div className="mt-2" style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                    <Button variant="outlined" color="primary" style={{fontSize: '15px', height: '40px', marginLeft: '10px'}} href="/address">
                                        Add / Edit Address
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>

            </Card>
        </div>
    )
};

export default Client;