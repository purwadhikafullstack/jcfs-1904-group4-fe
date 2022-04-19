import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../Config/axios";
import { useSelector } from "react-redux";

import { Button, Card } from "react-bootstrap";

function ProductDetail() {
  const params = useParams();
  const { product_id } = params
  const user_id = useSelector((state) => state.auth.user_id);
  
  const [product, setProduct] = useState({});
  const [cartState, setCartState] = useState([]);
  const [qtty, setQtty] = useState(1);

  const getProducts = async () => {
    try {
      const res = await axios.get(`/products/${product_id}`)
      const data = res.data.productsById[0];
      setProduct(data)
    } catch (error) {
      console.log(alert(error.message))
    }
  };

  useEffect(() => {
    getProducts()
  }, [])

  const quantityBtnHandler = (type) => {
    switch (type) {
      case "increment":
        setQtty(qtty + 1);
        break;
      case "decrement":
        setQtty(qtty - 1);
        break;
    }
  };

  const addToCartHandler = async () => {
    try {
        const res = await axios.get(`/cart/${user_id}/${product_id}`)
        const { quantity } = res.data;

        setCartState(quantity)

        const resCart = await axios.get(`/cart/id/${user_id}`)
        const { cart_id } = resCart.data;

        if (quantity) {

            try {
                const res = await axios.put(`/cart/quantity/${cart_id}`,
                {
                  product_id: product.product_id,
                  quantity: quantity.quantity + qtty
                })

                alert("Successfully added to cart")
            } catch (error) {
                console.log(alert(error.message))
            }

        } else {

            try {
                const res = await axios.post(`/cart/add`,
                {
                  cart_id: cart_id.cart_id,
                  product_id: product.product_id,
                  quantity: qtty
                })

                alert("Successfully added to cart")
            } catch (error) {
                console.log(alert(error.message))
            }

        }

    } catch (error) {
        console.log(alert(error.message))
    }
  };

  return (

    <>
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '75px', marginInline: '30px'}}>
      <div>
        <Card style={{ width: '700px', height: '750px', marginInline: '30px', boxShadow: '3px 3px 3px 3px rgb(0, 0, 0, 0.1)' }}>
          <Card.Header style={{display: 'flex', justifyContent: 'center', fontSize: '22px', paddingTop: '10px', paddingBottom: '10px'}}>
            {product.product_name}
          </Card.Header>

            <Card.Img variant="top" src={product.product_image_name} 
                      style={{objectFit: 'cover', width: '698px', height: '450px'}}>
            </Card.Img>
            <Card.Body style={{display: 'flex', flexDirection: 'column'}}>
              <Card.Title>Product Details</Card.Title>
              <Card.Text style={{marginTop: '18px'}}>
                {product.product_desc}
              </Card.Text>
            </Card.Body>
        </Card>
      </div>

      <div>
        <Card style={{padding: '20px', width: '400px', height: '225px', boxShadow: '3px 3px 3px 3px rgb(0, 0, 0, 0.1)'}}>
          
            <Card.Title style={{fontSize: '30px'}}>Rp. {product.price}</Card.Title>
            <div style={{display: 'flex', flexDirection: 'row', marginTop: '20px'}}>
              <Card.Title style={{fontSize: '20px', marginTop: '8px'}}>
                Quantity: {qtty}
              </Card.Title>
              <Button variant="outline-dark" style={{paddingInline: '14px', paddingTop: '4px', marginInline: '20px', borderRadius: '50%', borderWidth: '2px', fontWeight: 'bold'}}
                 onClick={() => {
                   quantityBtnHandler("decrement")
                 }}
                 disabled={qtty === 1}
              >
                  -
              </Button>
              <Button variant="outline-dark" style={{borderRadius: '50%', borderWidth: '2px', fontWeight: 'bold', paddingTop: ' 3px'}}
                 onClick={() => {
                  quantityBtnHandler("increment")
                }}
              >
                  +
              </Button>
            </div>
            <div style={{marginTop: '40px', display: 'flex', justifyContent: 'center', width: '100%'}}>
              <Button variant="success" style={{width: '100%'}} onClick={addToCartHandler}>
                Add to Cart
              </Button>
            </div>
        </Card>

        <Card style={{display: 'flex', justifyContent: 'center', width: '400px', height: '100px', marginTop: '30px', boxShadow: '3px 3px 3px 3px rgb(0, 0, 0, 0.1)'}}>
            <Button variant="dark" style={{paddingInline: '14px', marginInline: '20px'}} href="/">
              Back to Products
            </Button>
        </Card>
      </div>
    </div>
    </>

  );
};

export default ProductDetail;