import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

import { Card } from "react-bootstrap";
import { Button } from "@mui/material";
import axios from "../../Config/axios";

function Client() {
    const [address, setAddress] = useState([]);
    const [profileData, setProfileData] = useState({
        full_name: "",
        email: "",
        age: "",
        gender: ""
    });
    const { user_id } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setProfileData({...profileData, [e.target.name]: e.target.value})
    };

    const getAddress = async () => {
        try {
            const res = await axios.get(`/address/${user_id}`);
            const { data } = res;
            setAddress(data.address[0]);

        } catch (error) {
            console.log(alert(error.message))
        }
    };

    const saveData = async () => {
        try {
            const res = await axios.put(`/users/${user_id}`,
            {
                full_name: profileData.full_name,
                gender: profileData.gender,
                email: profileData.email,
                age: profileData.age,
            });

            alert("Update was successful")
        } catch (error) {
            console.log(alert(error.message))
        }
    };

    useEffect(() => {
        getAddress();
    }, []);

    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
            <Card style={{width: '1000px', height: '800px'}}>
                <Card.Header style={{fontSize: '30px', display: 'flex', justifyContent: 'center'}}>
                    <i class="bi bi-person-circle" style={{marginRight: '18px'}}></i>
                    My Profile
                </Card.Header>

                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: '50px'}}>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginInline: '30px'}}>

                        <Card border="secondary" style={{ width: '420px', height: '275px'}}>
                            <Card.Header>Profile Picture</Card.Header>
                            <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                                <Card.Img variant="top" src="http://cdn.onlinewebfonts.com/svg/img_24787.png" style={{objectFit: 'cover', width: '100px', heigh: '100px'}}></Card.Img>
                            </div>
                            <Card.Body style={{display: 'flex', justifyContent: 'center'}}>
                                <div>
                                    <Button color="primary" style={{marginInline: '10px'}}>Add / Edit</Button>
                                </div>
                            </Card.Body>
                        </Card>

                        <Card border="secondary" style={{ width: '350px', height: '275px' }}>
                            <Card.Header>Profile Data</Card.Header>
                            <Card.Body>
                                <input type="text" className="form-control" placeholder="Fullname" aria-label="Username" aria-describedby="basic-addon1"
                                    name="full_name" onChange={handleChange} 
                                />
                                <input type="text" className="form-control mt-3" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"
                                    name="email" onChange={handleChange}
                                />
                                <input type="text" className="form-control mt-3" placeholder="Age" aria-label="Username" aria-describedby="basic-addon1"
                                    name="age" onChange={handleChange}
                                />
                                <select className="form-control mt-3" onChange={handleChange} name="gender">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </Card.Body>
                        </Card>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '35px', }}>
                        <Button color="primary" style={{width: '850px'}} onClick={saveData}>Save Changes</Button>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'center', marginInline: '30px'}}>
                        <Card border="secondary" style={{width: '850px', height: '270px', marginTop: '30px'}}>
                            <Card.Header>
                                <i class="bi bi-house-fill" style={{marginRight: '15px'}}></i>
                                My Default Address</Card.Header>
                            <Card.Body>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <h6>Address: {address.detail_address}</h6>
                                    <h6>City: {address.city}</h6>
                                    <h6>Province: {address.province}</h6>
                                    <h6>Village: {address.village}</h6>
                                    <h6>Postal Code: {address.postal_code}</h6>
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