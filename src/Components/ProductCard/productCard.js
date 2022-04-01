import React from "react";
import {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button
} from "reactstrap";

function ProductCard(props) {
    const { product_name, price, product_image_name } = props
    console.log(props)

    return (
        <div>
            <Card style={{width: '275px', height: '420px', boxShadow: "0 6px 6px 0 rgb(0, 0, 0, 0.2)"}}>
                <CardImg
                    alt="Card image cap"
                    src={product_image_name}
                    top
                    width="100%"
                    height="400px"
                    contain
                />
                <CardBody>
                    <CardTitle tag="h4">
                        {product_name}
                    </CardTitle>
                    <CardSubtitle
                        className="my-2 text-muted"
                        tag="h5"
                    >
                        Rp. {price}
                    </CardSubtitle>
                    <Button color="light" style={{width: '100%', marginTop: '10px'}}>
                        Details
                    </Button>
                    <div style={{width: '100%', marginTop: '50px', justifyContent: 'space-between', display: 'flex'}}>
                        <Button color="dark">
                            Buy Now
                        </Button>
                        <Button color="success">
                            Add to Cart
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
};

export default ProductCard;