import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../Config/axios';

import { Card } from 'react-bootstrap';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

function Address() {
  const user_id = useSelector((state) => state.auth.user_id);

  const [address, setAddress] = useState([]);
  const [editChosenAddress, setEditChosenAddress] = useState({
    detail_address: '',
    province: '',
    city: '',
    district: '',
    village: '',
    postal_code: '',
    is_default: '1',
  });
  const [chooseAddress, setChooseAddress] = useState({
    address_id: '',
  });
  const [formState, setFormState] = useState({
    detail_address: '',
    province: '',
    city: '',
    district: '',
    village: '',
    postal_code: '',
    is_default: '1',
  });

  useEffect(() => {
    getAddress();
  }, []);

  useEffect(() => {
    if (address.length) {
      setChooseAddress({ address_id: address[0].address_id });
    }
  }, [address]);

  useEffect(() => {
    if (chooseAddress.address_id) {
      getChosenAddress();
    }
  }, [chooseAddress]);

  const getAddress = async () => {
    try {
      const res = await axios.get(`/address/${user_id}`);
      const { data } = res;

      setAddress(data.address);
    } catch (error) {
      console.log(alert(error.message));
    }
  };

  const getChosenAddress = async () => {
    try {
      const res = await axios.get(`/address/chosen/${chooseAddress.address_id}`);
      const { data } = res;

      setEditChosenAddress(data.address[0]);
    } catch (error) {
      console.log(alert(error.message));
    }
  };

  const patchAddress = async () => {
    try {
      const resDefault = await axios.get(`/address/default/${user_id}`);
      const { address } = resDefault.data;

      const resRemove = await axios.put(`/address/removeDefault/${address[0].address_id}`);

      const res = await axios.put(`/address/put/${chooseAddress.address_id}`, {
        detail_address: editChosenAddress.detail_address,
        province: editChosenAddress.province,
        city: editChosenAddress.city,
        district: editChosenAddress.district,
        village: editChosenAddress.village,
        postal_code: editChosenAddress.postal_code,
        is_default: editChosenAddress.is_default,
      });

      alert('Update was successful');
    } catch (error) {
      console.log(alert(error.message));
    }
  };

  const postNewAddress = async () => {
    try {
      if (formState.is_default === 1) {
        const resDefault = await axios.get(`/address/default/${user_id}`);
        const { address } = resDefault.data;

        const resRemove = await axios.put(`/address/removeDefault/${address[0].address_id}`);
        const res = await axios.post(`/address/new`, {
          user_id: user_id,
          detail_address: formState.detail_address,
          province: formState.province,
          city: formState.city,
          district: formState.district,
          village: formState.village,
          postal_code: formState.postal_code,
          is_default: formState.is_default,
        });

        alert('Address Successfully Added');
      } else {
        const res = await axios.post(`/address/new`, {
          user_id: user_id,
          detail_address: formState.detail_address,
          province: formState.province,
          city: formState.city,
          district: formState.district,
          village: formState.village,
          postal_code: formState.postal_code,
          is_default: formState.is_default,
        });

        alert('Address Successfully Added');
      }
    } catch (error) {
      console.log(alert(error.message));
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const selectAddress = (e) => {
    setChooseAddress({ ...chooseAddress, [e.target.name]: e.target.value });
  };

  const editChange = (e) => {
    setEditChosenAddress({ ...editChosenAddress, [e.target.name]: e.target.value });
  };

  if (address.length) {
    return (
      <div>
        <div className="d-flex justify-content-center mt-4">
          <Button variant="outlined" color="primary" className="mx-2" href="/client" startIcon={<ArrowBack />}>
            Back to My Account
          </Button>
          <Button variant="contained" color="primary" className="mx-2" href="/products" style={{ color: 'white' }}>
            Shop Now
          </Button>
        </div>

        <div className="d-flex justify-content-center mt-3" style={{ marginBottom: '40px' }}>
          <div className="d-flex flex-column">
            <Card style={{ width: '1000px', height: '530px' }}>
              <Card.Header>
                <i class="bi bi-plus-lg" style={{ marginRight: '15px' }}></i>
                Add New Address
              </Card.Header>
              <Card.Body>
                <input type="text" className="form-control mt-2" placeholder="Full Address" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} name="detail_address" />
                <input type="text" className="form-control mt-2" placeholder="Province" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} name="province" />
                <input type="text" className="form-control mt-2" placeholder="City" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} name="city" />
                <input type="text" className="form-control mt-2" placeholder="District" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} name="district" />
                <input type="text" className="form-control mt-2" placeholder="Village" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} name="village" />
                <input type="text" className="form-control mt-2" placeholder="Postal Code" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} name="postal_code" />

                <h5 className="ml-2 mt-4">Set as default address ?</h5>
                <select className="form-control mt-3" onChange={handleChange} name="is_default">
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>

                <Button variant="outlined" color="success" className="mt-4" style={{ width: '200px' }} onClick={postNewAddress}>
                  Add Address
                </Button>
              </Card.Body>
            </Card>

            <Card style={{ width: '1000px', height: '610px', marginTop: '40px' }}>
              <Card.Header>
                <i class="bi bi-pencil" style={{ marginRight: '15px' }}></i>
                Edit Address
              </Card.Header>

              <Card.Body>
                <h5 className="ml-2">Which address to edit ?</h5>
                <select className="form-control mt-3" onChange={selectAddress} name="address_id">
                  {address.map((add) => (
                    <option key={add.address_id} value={add.address_id}>
                      {add.detail_address}
                    </option>
                  ))}
                </select>
                <input type="text" className="form-control mt-2" placeholder="Full Address" aria-label="Username" aria-describedby="basic-addon1" onChange={editChange} name="detail_address" value={editChosenAddress.detail_address} />
                <input type="text" className="form-control mt-2" placeholder="Province" aria-label="Username" aria-describedby="basic-addon1" onChange={editChange} name="province" value={editChosenAddress.province} />
                <input type="text" className="form-control mt-2" placeholder="City" aria-label="Username" aria-describedby="basic-addon1" onChange={editChange} name="city" value={editChosenAddress.city} />
                <input type="text" className="form-control mt-2" placeholder="District" aria-label="Username" aria-describedby="basic-addon1" onChange={editChange} name="district" value={editChosenAddress.district} />
                <input type="text" className="form-control mt-2" placeholder="Village" aria-label="Username" aria-describedby="basic-addon1" onChange={editChange} name="village" value={editChosenAddress.village} />
                <input type="text" className="form-control mt-2" placeholder="Postal Code" aria-label="Username" aria-describedby="basic-addon1" onChange={editChange} name="postal_code" value={editChosenAddress.postal_code} />

                <h5 className="ml-2 mt-4">Set as default address ?</h5>
                <select className="form-control mt-3" name="is_default" onChange={editChange}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>

                <Button variant="outlined" color="success" className="mt-4" style={{ width: '200px' }} onClick={patchAddress}>
                  Save Changes
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="d-flex justify-content-center mt-4">
          <Button variant="outlined" color="primary" className="mx-2" href="/client" startIcon={<ArrowBack />}>
            Back to My Account
          </Button>
          <Button variant="contained" color="primary" className="mx-2" href="/products" style={{ color: 'white' }}>
            Shop Now
          </Button>
        </div>

        <div className="d-flex justify-content-center mt-3" style={{ marginBottom: '40px' }}>
          <div className="d-flex flex-column">
            <Card style={{ width: '1000px', height: '530px' }}>
              <Card.Header>
                <i class="bi bi-plus-lg" style={{ marginRight: '15px' }}></i>
                Add New Address
              </Card.Header>
              <Card.Body>
                <input type="text" className="form-control mt-2" placeholder="Full Address" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} name="detail_address" />
                <input type="text" className="form-control mt-2" placeholder="Province" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} name="province" />
                <input type="text" className="form-control mt-2" placeholder="City" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} name="city" />
                <input type="text" className="form-control mt-2" placeholder="District" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} name="district" />
                <input type="text" className="form-control mt-2" placeholder="Village" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} name="village" />
                <input type="text" className="form-control mt-2" placeholder="Postal Code" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} name="postal_code" />

                <h5 className="ml-2 mt-4">Set as default address ?</h5>
                <select className="form-control mt-3" onChange={handleChange} name="is_default">
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>

                <Button variant="outlined" color="success" className="mt-4" style={{ width: '200px' }} onClick={postNewAddress}>
                  Add Address
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Address;
