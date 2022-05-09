import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../Config/axios";
import { useSelector } from "react-redux";

import { Button, Card } from "react-bootstrap";

function ProductDetail() {
  const params = useParams();
  const { product_id } = params
  const user_id = useSelector((state) => state.auth.user_id);
  const { role } = useSelector((state) => state.auth);
  
  const [product, setProduct] = useState({});
  const [localPrice, setLocalPrice] = useState([]);
  const [qtty, setQtty] = useState(1);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    getProducts();
    fetchProductPicture();
  }, [])

  const getProducts = async () => {
    try {
      const res = await axios.get(`/products/${product_id}`)
      const data = res.data.productsById[0];

      setProduct(data)
      setLocalPrice(data.price.toLocaleString('id-ID'))
    } catch (error) {
      console.log(alert(error.message))
    }
  };

  const imageURL = `http://localhost:2022/products/${product.product_image_name}`
  const fetchProductPicture = async () => {
      const res = await fetch(imageURL);
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImagePreview(imageObjectURL);
  };

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
      const res = await axios.get(`/cart/${user_id}`)
      const { cart } = res.data;

          if (cart.length) {
              const res = await axios.get(`/cart/${user_id}/${product_id}`)

              const { cartProduct } = res.data;

              if (cartProduct) {
              
                  const res = await axios.put(`/cart/quantity/${cartProduct.cart_id}`,
                      {
                        product_id: product_id,
                        quantity: cartProduct.quantity + qtty
                      })
      
                  alert("Successfully updated cart")

              } else {
                  const resGet = await axios.get(`/cart/id/${user_id}`)
                  const { cart_id } = resGet.data;

                  const res = await axios.post(`/cart/details`,
                      {
                          cart_id: cart_id.cart_id,
                          product_id: product_id,
                          quantity: qtty
                      })
  
                  alert("Successfully added to cart")
              } 

          } else {
              const res = await axios.post(`/cart/add/${user_id}`)
              const { insertId } = res.data;

              const resAdd = await axios.post(`/cart/details`,
                      {
                          cart_id: insertId,
                          product_id: product_id,
                          quantity: qtty
                      })
  
              alert("Successfully added to cart")
          }

    } catch (error) {
        console.log(alert(error.message))
    }
  };

  if (role === "client") {
  return (
    <>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '75px', marginInline: '30px'}}>
        <div>
          <Card style={{ width: '700px', height: '750px', marginInline: '30px', boxShadow: '3px 3px 3px 3px rgb(0, 0, 0, 0.1)' }}>
            <Card.Header style={{display: 'flex', justifyContent: 'center', fontSize: '22px', paddingTop: '10px', paddingBottom: '10px'}}>
              {product.product_name}
            </Card.Header>

              <Card.Img variant="top" src={imagePreview} 
                        style={{objectFit: 'cover', width: '698px', height: '450px'}}>
              </Card.Img>
              <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <Card.Title>Product Details</Card.Title>
                <Card.Text style={{marginTop: '18px'}}>
                  {product.product_desc}
                </Card.Text>
              </Card.Body>
          </Card>
        </div>

        <div>
          <Card style={{ padding: '20px', width: '400px', height: '225px', boxShadow: '3px 3px 3px 3px rgb(0, 0, 0, 0.1)' }}>
            
              <Card.Title style={{ fontSize: '30px' }}>Rp. {localPrice}</Card.Title>
              <div style={{display: 'flex', flexDirection: 'row', marginTop: '20px'}}>
                <Card.Title style={{ fontSize: '20px', marginTop: '8px' }}>
                  Quantity: {qtty}
                </Card.Title>
                <Button variant="outline-dark" style={{ paddingInline: '14px', paddingTop: '4px', marginInline: '20px', borderRadius: '50%', borderWidth: '2px', fontWeight: 'bold' }}
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
  )} else if (role === "") {
    return (
      <>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '75px', marginInline: '30px'}}>
          <div>
            <Card style={{ width: '700px', height: '750px', marginInline: '30px', boxShadow: '3px 3px 3px 3px rgb(0, 0, 0, 0.1)' }}>
              <Card.Header style={{display: 'flex', justifyContent: 'center', fontSize: '22px', paddingTop: '10px', paddingBottom: '10px'}}>
                {product.product_name}
              </Card.Header>
    
                <Card.Img variant="top" src={imagePreview} 
                          style={{objectFit: 'cover', width: '698px', height: '450px'}}>
                </Card.Img>
                <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                  <Card.Title>Product Details</Card.Title>
                  <Card.Text style={{marginTop: '18px'}}>
                    {product.product_desc}
                  </Card.Text>
                </Card.Body>
            </Card>
          </div>
    
          <div>
            <Card style={{ padding: '20px', width: '400px', height: '225px', boxShadow: '3px 3px 3px 3px rgb(0, 0, 0, 0.1)' }}>
              
                <Card.Title style={{ fontSize: '30px' }}>Rp. {localPrice}</Card.Title>
                <div style={{display: 'flex', flexDirection: 'row', marginTop: '20px'}}>
                  <Card.Title style={{ fontSize: '20px', marginTop: '8px' }}>
                    Quantity: {qtty}
                  </Card.Title>
                  <Button variant="outline-dark" style={{ paddingInline: '14px', paddingTop: '4px', marginInline: '20px', borderRadius: '50%', borderWidth: '2px', fontWeight: 'bold' }}
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
                  <Button variant="success" style={{width: '100%'}} href="/login">
                    Add to Cart
                  </Button>
                </div>
            </Card>
    
            <Card style={{display: 'flex', justifyContent: 'center', width: '400px', height: '100px', marginTop: '30px', boxShadow: '3px 3px 3px 3px rgb(0, 0, 0, 0.1)'}}>
                <Button variant="dark" style={{paddingInline: '14px', marginInline: '20px'}} href="/products">
                  Back to Products
                </Button>
            </Card>
          </div>
        </div>
      </>
    )}
};

export default ProductDetail;