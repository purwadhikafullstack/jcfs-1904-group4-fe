import React from "react";
import {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    CardLink
} from "reactstrap";
import "./style.css"
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductCard() {

    return (
        <div>
            <Card className="card">
                <CardImg
                    alt="Card image cap"
                    src="https://picsum.photos/256/186"
                    top
                    width="100%"
                    height="400px"
                    contain
                />
                <CardBody>
                    <CardTitle tag="h4">
                        Product Name
                    </CardTitle>
                    <CardSubtitle
                        className="my-2 text-muted"
                        tag="h5"
                    >
                        Price
                    </CardSubtitle>
                    <CardLink className="details">
                        Details
                    </CardLink>
                    <div className="button">
                        <Button className="buy">
                            Buy Now
                        </Button>
                        <Button className="cart">
                            Add to Cart
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
};

export default ProductCard;