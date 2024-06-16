import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import {Link} from "react-router-dom";
import base_url from "../../utils/api";

const Products = () => {
  const [products, SetProducts] = useState([]);
  const [image,setImage] = useState();

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/v1/product/get-product`);
      if (data?.success) {
        SetProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in getting all Products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout title={"Dashboard - All Products"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3 className="text-center">All Products List </h3>
            <div className="d-flex flex-wrap">
            {products?.map( (p)=> (
                <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className = "product-link" >
                <div className="card m-2" style={{ width: "18rem" }} key={p._id} >
                <img src={p.photo}className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                   {p.description}
                  </p>
                </div>
              </div>
                </Link>
            ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
