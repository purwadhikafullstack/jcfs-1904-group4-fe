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
  const [quantity, setQuantity] = useState(1);

  console.log(cartState)

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
        setQuantity(quantity + 1);
        break;
      case "decrement":
        setQuantity(quantity - 1);
        break;
    }
  };

  const addToCartHandler = async () => {
    try {
        const res = await axios.get(`/cart/${user_id}/${product_id}`)
        const { data } = res;
        setCartState(data.cart)

        if (res.data.length) {

            try {
                const res = await axios.put(`/cart/quantity/${user_id}`,
                {
                    product_id: product.product_id,
                    quantity: cartState.quantity + quantity
                })

                alert("Successfully added to cart")
            } catch (error) {
                console.log(alert(error.message))
            }

        } else {

            try {
                const res = await axios.post(`/cart/add`,
                {
                    user_id: user_id,
                    product_id: product.product_id,
                    product_name: product.product_name,
                    product_price: product.price,
                    product_image_name: product.product_image_name,
                    quantity: quantity
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
            <Card.Body>
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
                Quantity: {quantity}
              </Card.Title>
              <Button variant="outline-dark" style={{paddingInline: '14px', paddingTop: '4px', marginInline: '20px', borderRadius: '50%', borderWidth: '2px', fontWeight: 'bold'}}
                 onClick={() => {
                   quantityBtnHandler("decrement")
                 }}
                 disabled={quantity === 1}
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
            <div style={{marginTop: '40px', display: 'flex', justifyContent: 'space-between', width: '100%'}}>
              <Button variant="success" style={{width: '45%'}} onClick={addToCartHandler}>
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


    // <div className="container">
    //   <div className="row mt-3">
    //     <div className="col-6">
    //       <img style={{ width: "100%" }} src={product_image_name} alt="" />
    //     </div>
    //     <div className="col-6 d-flex flex-column justify-content-center">
    //       <h4>{product_name}</h4>
    //       <h5>Rp {price}</h5>
    //       <p>{product_desc}</p>
    //       <div className="d-flex flex-row align-items-center">
    //         <button
    //           onClick={() => {
    //             quantityBtnHandler("decrement");
    //           }}
    //           className="btn btn-primary "
    //         >
    //           -
    //         </button>
    //         <strong className="text-center mx-4">{quantity}</strong>
    //         <button
    //           onClick={() => {
    //             quantityBtnHandler("increment");
    //           }}
    //           className="btn btn-primary "
    //         >
    //           +
    //         </button>
    //       </div>
    //       <button onClick={addToCartHandler} className="btn btn-success mt-3">
    //         Add to cart
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ProductDetail;