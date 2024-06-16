import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../Context/Auth";
import moment from "moment";
import base_url from "../../utils/api";
import { useNavigate } from "react-router-dom";
import "../../Styles/order.css";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/v1/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      {orders.length === 0 ? (
        <>
        <div className="pathroute">
          <h2>
            <span className="p1"> Your Have No Items</span>
          </h2>
        </div>
        <div className="text-center mt-5">
            <button
              className="btn"
              style={{ backgroundColor: "#ab7a5f", color: "white" }}
              onClick={() => navigate("/products")}
            >
              Shop More
            </button>
          </div>
        </>
      ) : (
        <>
      <div className="pathroute">
        <h2>
          <span className="p1" onClick={()=>navigate("/")}>Home</span>
          <span>/</span>
          <span className="p2"> Orders</span>
        </h2>
      </div>
      <div className="container mt-2">
        <div className="row">
          {orders?.map((o, i) => {
            return (
              <>
                <div className="col-md-12 mb-5  p-3 border shadow">
                  <div cls>
                    <h5>
                      <span>Status : </span>
                      <span
                        style={{
                          color: `${
                            o?.status === "Delivered" ? "green" : "orange" || o?.status === "Cancel" ? "red" : "orange"
                          }`,
                        }}
                      >
                        {o?.status}
                      </span>{" "}
                    </h5>
                    <h5>
                      <span>Payment : </span>
                      <span
                        style={{
                          color: `${o?.payment.success ? "green" : "orange"}`,
                        }}
                      >
                        {o?.payment.success ? "Success" : "Failed"}
                      </span>{" "}
                    </h5>
                    <h5>
                      <span>Time : </span>
                      <span style={{ color: "#617d98" }}>
                        {moment(o?.createAt).fromNow()}
                      </span>{" "}
                    </h5>
                    <h5>
                      <span>No. of Items : </span>
                      <span style={{ color: "#617d98" }}>
                        {o?.products?.length}
                      </span>{" "}
                    </h5>
                    <h5>
                      <span>Price : </span>
                      <span style={{ color: "#617d98" }}>
                        ₹ {o?.products[0].price}
                      </span>{" "}
                    </h5>
                  </div>
                  <div className="mt-3 ">
                    <h5>
                      <span>Delivery : </span>
                    </h5>
                    <p className="mt-2 ">{auth?.user?.address}</p>
                  </div>
                  <div className="mt-4 head_cont">
                    <div className="head_cont_1">
                      <img
                        src={o?.products[0]?.photo}
                        alt={o?.products[0]?.name}
                        width="75px"
                        height="75px"
                        style={{ borderRadius: "5px" ,objectFit:"cover"}}
                      ></img>
                      <div>
                        <h6 style={{ color: "black" }}>{auth?.user?.name}</h6>
                        <p style={{ color: "#617d98" }}>
                          {o?.products[0]?.name}
                        </p>
                      </div>
                    </div>
                    <div style={{ flex: "4" }}>
                      <p style={{ color: "#ab7a5f" }}>
                        {o?.products[0]?.description?.substring(0, 30)}
                      </p>
                    </div>
                    <div style={{ flex: "4" }}>
                      <p style={{ color: "#617d98" }}>
                        Price : ₹ {o?.products[0].price}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
          <div className="text-center mb-5">
            <button
              className="btn"
              style={{ backgroundColor: "#ab7a5f", color: "white" }}
              onClick={() => navigate("/products")}
            >
              Shop More
            </button>
          </div>
        </div>
      </div>
      </>
      )}
    </Layout>
  );
};

export default Orders;
