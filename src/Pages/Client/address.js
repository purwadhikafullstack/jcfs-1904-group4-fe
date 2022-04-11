import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"

import { Card, FormControl, InputGroup } from "react-bootstrap";
import { Button } from "@mui/material";
import axios from "../../Config/axios";
import { ArrowBack } from "@mui/icons-material";

function Address() {
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
        <div>
            <div className="d-flex justify-content-center mt-4">
                <Button variant="outlined" color="primary" className="mx-2" href="/client" startIcon={<ArrowBack />}>Back to My Account</Button>
                <Button variant="contained" color="primary" className="mx-2" href="/" style={{color: 'white'}}>Products</Button>
            </div>
            
            <div className="d-flex justify-content-center mt-3" style={{marginBottom: '40px'}}>
                <div className="d-flex flex-column">
                    <Card style={{width: '1000px', height: '550px'}}>
                        <Card.Header>
                            <i class="bi bi-plus-lg" style={{marginRight: '15px'}}></i>
                            Add New Address</Card.Header>
                        <Card.Body>
                            <InputGroup className="mb-3">
                                <FormControl
                                placeholder="Full Address"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value=""
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <FormControl
                                placeholder="Province"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value=""
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <FormControl
                                placeholder="City"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value=""
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <FormControl
                                placeholder="District"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value=""
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <FormControl
                                placeholder="Village"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value=""
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <FormControl
                                placeholder="Postal Code"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value=""
                                />
                            </InputGroup>

                            <h5 className="ml-2">Set as default address ?</h5>
                            <select className="form-control mt-3">
                                <option>Yes</option>
                                <option>No</option>
                            </select>

                            <Button variant="outlined" color="success" className="mt-4" style={{width: '200px'}}>
                                Add Address
                            </Button>
                        </Card.Body>
                    </Card>
                    <Card style={{width: '1000px', height: '650px', marginTop: '40px'}}>
                        <Card.Header>
                            <i class="bi bi-pencil" style={{marginRight: '15px'}}></i>
                            Edit Address
                        </Card.Header>

                        <Card.Body>
                            <h5 className="ml-2">Which address to edit ?</h5>
                            <select className="form-control mt-3">
                            {/* {address.map((add) => 
                                <option key={add.address_id} value={add.address_id}>{add.detail_address}</option>
                            )} */}
                            </select>
                            <InputGroup className="my-3">
                                <FormControl
                                placeholder="Full Address"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value=""
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <FormControl
                                placeholder="Province"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value=""
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <FormControl
                                placeholder="City"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value=""
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <FormControl
                                placeholder="District"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value=""
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <FormControl
                                placeholder="Village"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value=""
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <FormControl
                                placeholder="Postal Code"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value=""
                                />
                            </InputGroup>

                            <h5 className="ml-2">Set as default address ?</h5>
                            <select className="form-control mt-3">
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>

                            <Button variant="outlined" color="success" className="mt-4" style={{width: '200px'}}>
                                Save Changes
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Address;