import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../Context";
import { useNavigate,Navigate } from "react-router-dom";
import "../static/css/Feed.css";
import Search from "./Search";
import pic from "../static/img/pic.gif";

const Feed = () => {
  const {
    feedProducts,
    supplementaryProducts,
    currorder,
    setCurrorder,
    createOrder,
    staff,
    formerID,
    cart,
    setCart,
    ShowOrderCon,
    setShowOrderCon,
  } = useGlobalContext();

  const [selectedCategory, setSelectedCategory] = useState("feed");
  const navigate = useNavigate();
  useEffect(() => {
    if (formerID === -1) {
      navigate("/formerId");
    }
    setCart([]);
  }, []);

  if (formerID === -1) {
    return <h1>Loading</h1>;
  }
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (product, amount) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + amount };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

  const getTotal = () => {
    if(cart===undefined){
      return 0;
    }
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmit = async () => {
    await createOrder("",getTotal());
  };

  const handleCon = () => {
    setShowOrderCon(false);
  };

  const getProductQuantity = (productId) => {
    if(cart===undefined){
      setCart([])
      return 0;
    }
    const product = cart.find((item) => item.id === productId);
    return product ? product.quantity : 0;
  };

  const cancelCart = () => {
    setCart([])
  }

  const products =
    selectedCategory === "feed" ? feedProducts : supplementaryProducts;

  console.log(products);

  return (
    <div className="App">
      <Search/>
      {ShowOrderCon && (
        <div className="formerservice-feed1">
          <div className="formerservice-feed-head1">
            <h2>Confirmation</h2>
            <FaTimes onClick={() => handleCon()} />
          </div>
          <div className="formerservice-feed-table1">
            <img src={pic} alt="" />
            <h3>Order has been Successfully Placed</h3>
          </div>
        </div>
      )}
      <div className="top-bar">
        <label>
          <input
            type="radio"
            value="feed"
            checked={selectedCategory === "feed"}
            onChange={() => setSelectedCategory("feed")}
          />
          Feed
        </label>
        <label>
          <input
            type="radio"
            value="supplementary"
            checked={selectedCategory === "supplementary"}
            onChange={() => setSelectedCategory("supplementary")}
          />
          Supplementary food
        </label>
      </div>
      <div className="content">
        <div className="product-list">
          {products.map((product) => (
            <div className="product" key={product.id}>
              <div className="product-details">
                <h4> {product.Manufacturer}   {product.name}</h4>
                <p>INR {product.price}</p>
              </div>
              <div className="quantity-control">
                <button onClick={() => updateQuantity(product, -1)}>-</button>
                <div className="quantity-control-qty">
                  <h3>{getProductQuantity(product.id)}</h3>
                </div>
                <button onClick={() => addToCart(product)}>+</button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart">
          <div className="cart-title">
            <svg
              width="30"
              height="29"
              viewBox="0 0 30 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.7498 8.83331V5.99998H20.2498V8.83331H11.7498ZM8.9165 28.6666C8.13734 28.6666 7.47032 28.3892 6.91546 27.8344C6.3606 27.2795 6.08317 26.6125 6.08317 25.8333C6.08317 25.0541 6.3606 24.3871 6.91546 23.8323C7.47032 23.2774 8.13734 23 8.9165 23C9.69567 23 10.3627 23.2774 10.9175 23.8323C11.4724 24.3871 11.7498 25.0541 11.7498 25.8333C11.7498 26.6125 11.4724 27.2795 10.9175 27.8344C10.3627 28.3892 9.69567 28.6666 8.9165 28.6666ZM23.0832 28.6666C22.304 28.6666 21.637 28.3892 21.0821 27.8344C20.5273 27.2795 20.2498 26.6125 20.2498 25.8333C20.2498 25.0541 20.5273 24.3871 21.0821 23.8323C21.637 23.2774 22.304 23 23.0832 23C23.8623 23 24.5294 23.2774 25.0842 23.8323C25.6391 24.3871 25.9165 25.0541 25.9165 25.8333C25.9165 26.6125 25.6391 27.2795 25.0842 27.8344C24.5294 28.3892 23.8623 28.6666 23.0832 28.6666ZM0.416504 3.16665V0.333313H5.05609L11.0769 13.0833H20.9936L26.5186 3.16665H29.7415L23.5082 14.4291C23.2484 14.9014 22.9002 15.2673 22.4634 15.5271C22.0266 15.7868 21.5484 15.9166 21.029 15.9166H10.4748L8.9165 18.75H25.9165V21.5833H8.9165C7.854 21.5833 7.04532 21.1229 6.49046 20.2021C5.9356 19.2812 5.91789 18.3486 6.43734 17.4041L8.34984 13.9333L3.24984 3.16665H0.416504Z"
                fill="#1C1B1F"
              />
            </svg>

            <h3>Cart</h3>
          </div>
          {cart && cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-content">
                <p>{item.Manufacturer}    {item.name}</p>
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item, 1)}>+</button>
                </div>
              </div>
              <div>INR {item.price}</div>
              <FaTimes
                className="remove-item"
                onClick={() => updateQuantity(item, -item.quantity)}
              />
            </div>
          ))}
          <div className="check-but">
            <button className="cancel" onClick={cancelCart}>Cancel</button>
            <button className="place-order" onClick={handleSubmit}>
              Place Order
            </button>
          </div>
          <div className="total">Grand Total: INR {getTotal()}</div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
