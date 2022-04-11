import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"

import { Card, FormControl, InputGroup } from "react-bootstrap";
import { Button } from "@mui/material";
import axios from "../../Config/axios";
import { ArrowBack } from "@mui/icons-material";

function Address() {
    const [address, setAddress] = useState([])
    const [formState, setFormState] = useState({
        detail_address: '',
        province: '',
        city: '',
        district: '',
        village: '',
        postal_code: '',
        is_default: '1'
    });
    const [editFormState, setEditFormState] = useState({
        detail_address: '',
        province: '',
        city: '',
        district: '',
        village: '',
        postal_code: '',
        is_default: '1'
    });
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

    const handleChange = (e) => {
        setFormState({...formState, [e.target.name]: e.target.value})
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
                    <Card style={{width: '1000px', height: '530px'}}>
                        <Card.Header>
                            <i class="bi bi-plus-lg" style={{marginRight: '15px'}}></i>
                            Add New Address</Card.Header>
                        <Card.Body>
                            <input type="text" className="form-control mt-2" placeholder="Full Address" aria-label="Username" aria-describedby="basic-addon1"
                                   onChange={handleChange} name="detail_address" value=""
                            />
                            <input type="text" className="form-control mt-2" placeholder="Province" aria-label="Username" aria-describedby="basic-addon1"
                                   onChange={handleChange} name="province" value=""
                            />
                            <input type="text" className="form-control mt-2" placeholder="City" aria-label="Username" aria-describedby="basic-addon1"
                                   onChange={handleChange} name="city" value=""
                            />
                            <input type="text" className="form-control mt-2" placeholder="District" aria-label="Username" aria-describedby="basic-addon1"
                                   onChange={handleChange} name="district" value=""
                            />
                            <input type="text" className="form-control mt-2" placeholder="Village" aria-label="Username" aria-describedby="basic-addon1"
                                   onChange={handleChange} name="village" value=""
                            />
                            <input type="text" className="form-control mt-2" placeholder="Postal Code" aria-label="Username" aria-describedby="basic-addon1"
                                   onChange={handleChange} name="postal_code" value=""
                            />

                            <h5 className="ml-2 mt-4">Set as default address ?</h5>
                            <select className="form-control mt-3" onChange={handleChange} name="is_default">
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>

                            <Button variant="outlined" color="success" className="mt-4" style={{width: '200px'}}>
                                Add Address
                            </Button>
                        </Card.Body>
                    </Card>
                    <Card style={{width: '1000px', height: '610px', marginTop: '40px'}}>
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
                            <input type="text" className="form-control mt-2" placeholder="Full Address" aria-label="Username" aria-describedby="basic-addon1"
                                   onChange={handleChange} name="detail_address"
                            />
                            <input type="text" className="form-control mt-2" placeholder="Province" aria-label="Username" aria-describedby="basic-addon1"
                                   onChange={handleChange} name="province"
                            />
                            <input type="text" className="form-control mt-2" placeholder="City" aria-label="Username" aria-describedby="basic-addon1"
                                   onChange={handleChange} name="city"
                            />
                            <input type="text" className="form-control mt-2" placeholder="District" aria-label="Username" aria-describedby="basic-addon1"
                                   onChange={handleChange} name="district"
                            />
                            <input type="text" className="form-control mt-2" placeholder="Village" aria-label="Username" aria-describedby="basic-addon1"
                                   onChange={handleChange} name="village"
                            />
                            <input type="text" className="form-control mt-2" placeholder="Postal Code" aria-label="Username" aria-describedby="basic-addon1"
                                   onChange={handleChange} name="postal_code"
                            />

                            <h5 className="ml-2 mt-4">Set as default address ?</h5>
                            <select className="form-control mt-3" onChange={handleChange} name="is_default">
                                <option value="1">Yes</option>
                                <option value="0">No</option>
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