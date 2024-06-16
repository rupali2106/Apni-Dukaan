import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../Context/Cart";
import { useAuth } from "../Context/Auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "../Styles/CartStyles.css";
import base_url from "../utils/api";
import { RiDeleteBin7Line } from "react-icons/ri";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((p) => (total += p.price));
      return total.toLocaleString("en-INDIA", {
        style: "currency",
        currency: "INR",
      });
      console.log(auth?.token)
    } catch (error) {
      console.log(error);
    }
  };

  //remove item
  const removeCartItem = async (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${base_url}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  //payment handling
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${base_url}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Done Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  return (
    <Layout>
      {cart.length === 0 ? (
        <div className="pathroute">
          <h2>
            <span className="p1"> Your Cart is Empty</span>
          </h2>
        </div>
      ) : (
        <>
          <div className="pathroute">
            <h2>
              <span className="p1">Home</span>
              <span>/</span>
              <span className="p2"> Cart</span>
            </h2>
          </div>
          <div className="cart-page">
            <div className="container">
              <div className="row" style={{ margin: "20px 0px 20px 0px" }}>
                <div className="col-md-12 p-0 m-0">
                  {cart?.map((p) => (
                    <>
                      <div className="mt-4 cart_contain">
                        <div className="cart_contain_2">
                          <img
                            src={p.photo}
                            alt={p.name}
                            width="90px"
                            height="90px"
                            style={{ borderRadius: "5px", objectFit: "cover"}}
                          ></img>
                          <div>
                            <p
                              style={{ color: "#617d98", marginBottom: "15px" }}
                            >
                              Item
                            </p>
                            <h6 style={{ color: "black" }}>{p.name}</h6>
                          </div>
                        </div>
                        <div style={{ flex: "5" }} className="med">
                          <p style={{ color: "#617d98", marginBottom: "15px" }}>
                            Description
                          </p>
                          <p style={{ color: "#ab7a5f" }}>
                            {p.description.substring(0, 30)}...
                          </p>
                        </div>
                        <div style={{ flex: "2" }}>
                          <p style={{ color: "#617d98", marginBottom: "15px" }}>
                            Price
                          </p>
                          <p style={{ color: "#617d98" }}> ₹ {p.price}</p>
                        </div>
                        <div
                          style={{
                            flex: "1",
                            alignItems: "center",
                            paddingBottom: "13px",
                          }}
                        >
                          <RiDeleteBin7Line
                            style={{ color: "red", fontSize: "25px" }}
                            className="text-center"
                            onClick={() => removeCartItem(p._id)}
                          />
                        </div>
                      </div>
                      <hr className="mb-2" />
                    </>
                  ))}
                </div>
                <div className="cart_contain_3">
                  <button
                    className="btn button"
                    onClick={() => navigate("/products")}
                  >
                    Continue Shopping
                  </button>
                  <button
                    className="btn"
                    style={{ backgroundColor: "black", color: "white" }}
                    onClick={() => setCart([])}
                  >
                    Clear Cart
                  </button>
                </div>
                <hr className="mt-5" />
                <div className="payment">
                  <div className="payment_1">
                    {auth?.user && auth?.user?.address &&(
                      <div className="mt-2 text-center payment_2">
                        {!clientToken || !cart?.length ? (
                          ""
                        ) : (
                          <>
                            <DropIn
                              options={{
                                authorization: clientToken,
                                paypal: {
                                  flow: "vault",
                                },
                              }}
                              onInstance={(instance) => setInstance(instance)}
                            />
                            <div className="mb-1 payment_3">
                              <h6>Test Credentials</h6>
                              <p>Card No. : 4111 1111 1111 1111</p>
                              <p>Date : 05/26</p>
                            </div>

                            <button
                              className="btn button"
                              onClick={handlePayment}
                              disabled={
                                loading || !instance || !auth?.user?.address 
                              }
                            >
                              {loading ? "...loading" : "Make Payment"}
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="money">
                    <div className="text-center money_1">
                      <h5>Cart Summary</h5>
                      <p>Total | checkout | Payment</p>
                      <hr />
                      <h3>Total : {totalPrice()}</h3>
                      {auth?.user?.address ? (
                        <>
                          <div className="mb-3">
                            <h6>Current Address</h6>
                            <h6>{auth?.user?.address}</h6>
                            <button
                              className="btn button"
                              onClick={() =>
                                navigate("/dashboard/user/profile")
                              }
                            >
                              Update Address 
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="mb-3">
                          {auth?.token === "" ? (
                            <button
                              className="btn button"
                              onClick={() =>
                                navigate("/login", { state: "/cart" })
                              }
                            >
                              Please Login to checkout
                            </button>
                          ) : (
                            <button
                              className="btn button"
                              onClick={() =>
                                navigate("/dashboard/user/profile")
                              }
                            >
                              Update Address to checkout
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default CartPage;
