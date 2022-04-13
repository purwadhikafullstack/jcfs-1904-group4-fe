import React from "react";
import "./style.css"
import {Card, Button} from "react-bootstrap";

function ProductCard(props) {
    const { product_id, product_name, price, product_image_name } = props.product

    return (
        <div>
            <Card className="kartu" style={{ width: '250px', height: '450px', borderRadius: '5px', boxShadow: '0 4px 4px 0 rgb(0, 0, 0, 0.2)', backgroundColor: '#eaeaea', marginInline: '20px', marginBottom: '40px'}}>
                <Card.Img variant="top" src={product_image_name} style={{width: '248px', height: '248px', objectFit: 'cover'}}/>
                <Card.Body>
                    <Card.Title>{product_name}</Card.Title>
                    <Card.Subtitle style={{fontSize: '20px'}}>Rp. {price}</Card.Subtitle>
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                    <Button variant="outline-danger" style={{width: '100%'}} href={`/products/${product_id}`}>
                        Details
                    </Button>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                        <Button style={{backgroundColor: 'rgb(33, 37, 41)', borderColor: 'rgb(33, 37, 41)'}}>Buy Now</Button>
                        <Button variant="success">Add to Cart</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
};

export default ProductCard;