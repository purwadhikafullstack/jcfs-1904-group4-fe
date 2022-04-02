import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../Config/axios";
import { useSelector } from "react-redux";

function ProductDetail() {
  const params = useParams();
  const userId = useSelector((state) => state.auth.id);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  console.log(product)

  // const getProducts = async () => {
  //   try {
  //     const res = await axios.get("/products/:product_id", { params: { product_id: params.product_id } })
  //     const { data } = res;
  //     console.log({ data })
  //     setProduct(data.products)
  //   } catch (error) {
  //     console.log(alert(error.message))
  //   }
  // };

  useEffect(() => {
    axios
      .get("/products/:product_id", { params: { product_id: params.product_id } })
      .then((res) => {
        setProduct(res.data[0]);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  // useEffect(() => {
  //   getProducts()
  // }, [])

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

  const addToCartHandler = () => {
    axios
      .get("/carts", { params: { productId: product.id, userId } })
      .then((res) => {
        if (res.data.length) {
          // Update quantity
          const cart = res.data[0];
          axios
            .patch(`/carts/${cart.id}`, { quantity: cart.quantity + quantity })
            .then((res) => alert("Berhasil update cart"))
            .catch((err) => alert("Gagal update cart"));
        } else {
          // Create new cart
          const newCart = {
            ...product,
            id: new Date().getTime(),
            productId: product.id,
            quantity,
            userId,
          };

          axios
            .post("/carts", newCart)
            .then((res) => alert("Berhasil membuat cart"))
            .catch((err) => alert("Gagal membuat cart"));
        }
      })
      .catch((err) => {
        alert("Gagal mengambil cart");
      });
  };

  const { productImage, productName, price, description } = product;
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-6">
          <img style={{ width: "100%" }} src={productImage} alt="" />
        </div>
        <div className="col-6 d-flex flex-column justify-content-center">
          <h4>{productName}</h4>
          <h5>Rp {price}</h5>
          <p>{description}</p>
          <div className="d-flex flex-row align-items-center">
            <button
              onClick={() => {
                quantityBtnHandler("decrement");
              }}
              className="btn btn-primary "
            >
              -
            </button>
            <strong className="text-center mx-4">{quantity}</strong>
            <button
              onClick={() => {
                quantityBtnHandler("increment");
              }}
              className="btn btn-primary "
            >
              +
            </button>
          </div>
          <button onClick={addToCartHandler} className="btn btn-success mt-3">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;