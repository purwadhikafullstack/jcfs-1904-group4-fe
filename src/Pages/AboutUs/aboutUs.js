import React from "react";

import { Card, Tabs, Tab } from "react-bootstrap";

function AboutUs() {
    return (
        <div className="p-5">
            <h1>ezfurniture LTD.</h1>
            <Card style={{ width: '100%', marginTop: '30px' }}>
                <Card.Header>
                    <Tabs justify variant="pills" defaultActiveKey="profile">
                        <Tab eventKey="profile" title="Company Profile">
                            <Card.Body style={{ height: '700px', display: 'flex', justifyContent: 'flex-start', marginTop: '20px' }}>
                                <div className="d-flex flex-row" style={{ width: '100%' }}>
                                    <div style={{ width: '50%' }}>
                                        <Card.Title style={{ fontSize: '30px' }}>Company Profile</Card.Title>
                                        <h5 className="mt-5">
                                            ezfurniture LTD. was founded by two young engineers, Jayson and Mujaddid, in 2022 
                                            who realized that Indonesia needed a new breakthorugh in selling modern yet stylish furniture to fill local homes.
                                            Since it was founded, the company has been striving in the furniture industry and has successfully satisfied the majority
                                            of customers.
                                        </h5>
                                        <h5 className="mt-4">
                                            Currently there are 4 ezfurniture warehouses spread across Indonesia with affordable pricing to make sure every
                                            social class in the country have the same chance to purchase quality furniture.
                                        </h5>
                                    </div>
                                    <div style={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
                                        <Card.Img variant="top" src={'https://i.pinimg.com/originals/d5/8e/8b/d58e8b81cea5327608f037ba6633ac59.jpg'} 
                                        style={{ width: '600px', height: '600px', objectFit: 'cover' }}/>
                                    </div>
                                </div>
                            </Card.Body>
                        </Tab>
                        <Tab eventKey="locations" title="Our Locations">
                            <Card.Body style={{ height: '700px', display: 'flex', justifyContent: 'flex-start', marginTop: '20px' }}>
                                <Card.Title style={{ fontSize: '30px', marginTop: '20px', display: 'flex', justifyContent: 'center' }}>Store Locations</Card.Title>
                                <Card.Title style={{ fontSize: '20px', marginTop: '50px' }}>Jakarta Warehouse</Card.Title>
                                <Card.Subtitle className="mt-3">Jl. Pulo Gadung no. 99, 12345</Card.Subtitle>
                                <Card.Title style={{ fontSize: '20px', marginTop: '30px' }}>Yogyakarta Warehouse</Card.Title>
                                <Card.Subtitle className="mt-3">Jl. Malioboro no. 99, 12345</Card.Subtitle>
                                <Card.Title style={{ fontSize: '20px', marginTop: '30px' }}>Medan Warehouse</Card.Title>
                                <Card.Subtitle className="mt-3">Jl. MH. Thamrin no. 99, 12345</Card.Subtitle>
                                <Card.Title style={{ fontSize: '20px', marginTop: '30px' }}>Makassar Warehouse</Card.Title>
                                <Card.Subtitle className="mt-3">Jl. Jend. Sudriman no. 99, 12345</Card.Subtitle>
                            </Card.Body>
                        </Tab>
                        <Tab eventKey="contact" title="Contact Us">
                            <Card.Body style={{ height: '700px', display: 'flex', justifyContent: 'flex-start', marginTop: '20px' }}>
                                <Card.Title style={{ fontSize: '30px', marginTop: '20px', display: 'flex', justifyContent: 'center' }}>Contact Us</Card.Title>
                                <Card.Title className="mt-5">
                                    <i class="bi bi-envelope" style={{ marginRight: '15px' }}></i>
                                    Email: ezfurnitureID@gmail.com
                                </Card.Title>
                                <Card.Title className="mt-5">
                                    <i class="bi bi-telephone" style={{ marginRight: '15px' }}></i>
                                    Jakarta Warehouse
                                    <Card.Subtitle className="mt-3">+628123456789</Card.Subtitle>
                                </Card.Title>
                                <Card.Title className="mt-5">
                                    <i class="bi bi-telephone" style={{ marginRight: '15px' }}></i>
                                    Yogyakarta Warehouse
                                    <Card.Subtitle className="mt-3">+628123456789</Card.Subtitle>
                                </Card.Title>
                                <Card.Title className="mt-5">
                                    <i class="bi bi-telephone" style={{ marginRight: '15px' }}></i>
                                    Medan Warehouse
                                    <Card.Subtitle className="mt-3">+628123456789</Card.Subtitle>
                                </Card.Title>
                                <Card.Title className="mt-5">
                                    <i class="bi bi-telephone" style={{ marginRight: '15px' }}></i>
                                    Makassar Warehouse
                                    <Card.Subtitle className="mt-3">+628123456789</Card.Subtitle>
                                </Card.Title>
                            </Card.Body>
                        </Tab>
                        <Tab eventKey="socials" title="Our Socials">
                            <Card.Body style={{ height: '700px', display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                                <i class="bi bi-twitter" style={{ fontSize: '60px', marginLeft: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <h4 className="ml-5">@ezfurnitureIDN</h4>
                                </i>    
                                <i class="bi bi-instagram" style={{ fontSize: '60px', marginTop: '30px', marginLeft: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <h4 className="ml-5">@ezfurniture</h4>
                                </i>
                                <i class="bi bi-facebook" style={{ fontSize: '60px', marginTop: '30px', marginLeft: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <h4 className="ml-5">ezfurniture Indonesia</h4>
                                </i>
                                <i class="bi bi-youtube" style={{ fontSize: '60px', marginTop: '30px', marginLeft: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <h4 className="ml-5">ezfurniture Indonesia</h4>
                                </i>
                            </Card.Body>
                        </Tab>
                    </Tabs>
                </Card.Header>
            </Card>
        </div>
    )
};

export default AboutUs;