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
            <h2 className="text-center w-full text-xl font-medium">Confirmation</h2>
            <FaTimes onClick={() => handleCon()} />
          </div>
          <div className="formerservice-feed-table1 pb-10">
            <img src={pic} alt="" />
            <h3>Order has been Successfully Placed</h3>
          </div>
        </div>
      )}
      
      <div className="flex gap-10 w-[90%] justify-between items-start max-lg:flex-col max-lg:gap-10 py-10">

        <div className="w-[45%]">
          <div className="flex items-center py-4">
            <button
              onClick={() => setSelectedCategory("feed")}
              className={`flex-1 text-center py-2 rounded-l-lg transition-colors 
                ${selectedCategory === "feed" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-100"}`}
            >
              Feed
            </button>
            <button
              onClick={() => setSelectedCategory("supplementary")}
              className={`flex-1 w-[28em]  text-center py-2 rounded-r-lg transition-colors 
                ${selectedCategory === "supplementary" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-100"}`}
            >
              Supplementary Food
            </button>
          </div>
          <div className="flex flex-wrap pt-4 gap-10 m-auto">
            {products.map((product) => (
              <div className="w-[15em] bg-[#DCECF9] flex flex-col gap-3 items-center justify-between p-4 rounded-lg shadow-lg mb-4">
                <div className="flex items-center text-start">
                  <div className="flex gap-6 items-center justify-between">
                    <h4 className="text-lg font-medium capitalize text-gray-700">{product.Manufacturer} {product.name}</h4>
                    <div className="text-md text-gray-500">₹ {product.price}</div>
                  </div>
                </div>        
                <div className="flex items-center">
                  <button 
                    onClick={() => updateQuantity(product, -1)} 
                    className="bg-gray-200 text-gray-700 w-8 h-8 flex items-center justify-center rounded-l hover:bg-gray-400 transition-colors">
                    -
                  </button>
                  <div className="bg-gray-100 w-12 text-center flex items-center justify-center">
                    <h3 className="text-lg">{getProductQuantity(product.id)}</h3>
                  </div>
                  <button 
                    onClick={() => addToCart(product)} 
                    className="bg-gray-200 text-gray-700 w-8 h-8 flex items-center justify-center rounded-r hover:bg-gray-400 transition-colors">
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-[45%] max-lg:w-[80%] rounded-md bg-[#e0f7fa] p-4 py-10 mt-4 flex items-center flex-col shadow-sm justify-between">

          <div className="cart-title">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-76.41q-33 0-56.5-23.5t-23.5-56.5q0-33 23.5-56.5t56.5-23.5q33 0 56.5 23.5t23.5 56.5q0 33-23.5 56.5T280-76.41Zm400 0q-33 0-56.5-23.5t-23.5-56.5q0-33 23.5-56.5t56.5-23.5q33 0 56.5 23.5t23.5 56.5q0 33-23.5 56.5T680-76.41Zm-428.02-640 90.5 189h279.04l103.78-189H251.98Zm-41.83-87.18h580.92q27.21 0 41.41 24.09 14.19 24.09 1.04 48.91l-136.5 246.68q-11.48 20.71-30.8 32.31-19.33 11.6-42.31 11.6H328.07l-41.85 76.41h477.37v87.18H280q-47.63 0-71.59-41.42-23.95-41.41-1.76-82.08L259.93-496 117.85-796.41H36.41v-87.18h135.74l38 80Zm132.33 276.18h279.04-279.04Z"/></svg>            
            <div className="font-medium text-lg pl-3">Cart</div>
          </div>

          <div className="space-y-2 py-6 w-[90%]"> 
            {cart && cart.map((item) => (
              <div className="min-w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-md" key={item.id}>

                <div className="flex items-center w-full">
                  <div className="mr-4 text-start">
                    <p className="text-lg font-medium">{item.Manufacturer} {item.name}</p>
                    <div className="text-md text-gray-500">₹ {item.price}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 min-w-fit">
                  {/* <button 
                    onClick={() => updateQuantity(item, -1)} 
                    className={`bg-gray-300 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center 
                      ${item.quantity <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400 transition-colors'}`}
                    disabled={item.quantity <= 0}
                  >
                    -
                  </button> */}
                  <span className="text-lg font-medium "><span className="font-light text-balance">Quantity: </span>{item.quantity}</span>
                  {/* <button 
                    onClick={() => updateQuantity(item, 1)} 
                    className="bg-gray-300 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
                    +
                  </button> */}
                </div>

                <div className="pl-8" onClick={() => updateQuantity(item, -item.quantity)} >
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M280.37-121.87q-35.72 0-60.86-25.14t-25.14-60.86v-506.5h-44.5v-86H356.5v-43.5h247.52v43.5h207.11v86h-44.5v506.5q0 35.72-25.14 60.86t-60.86 25.14H280.37Zm400.26-592.5H280.37v506.5h400.26v-506.5ZM360.7-283.74h80.5v-355h-80.5v355Zm159.1 0h80.5v-355h-80.5v355ZM280.37-714.37v506.5-506.5Z"/></svg>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full flex flex-col items-center">
            <div className="py-4 flex items-center w-[90%] justify-between gap-6">
              <button className="px-4 py-2 min-w-fit text-[#06AD9D] rounded-sm border border-[#06AD9D]" onClick={cancelCart}>Cancel</button>
              <button className="px-4 py-2 min-w-fit bg-[#06AD9D] text-white rounded-sm" onClick={handleSubmit}>
                Place Order
              </button>
            </div>

            <div className="mt-2 w-[90%] text-center px-10 py-2 bg-[#4695B8] text-white rounded-md" >Grand Total : ₹{getTotal()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
