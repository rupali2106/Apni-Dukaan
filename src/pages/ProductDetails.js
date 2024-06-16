import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import { useCart } from "../Context/Cart";
import toast from "react-hot-toast";
import "../Styles/ProductDetailsStyles.css";
import base_url from "../utils/api";
import Card from "../components/Card/Card.js";

const ProductDetails = () => {
  const [cart,setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${base_url}/api/v1/product/single-product/${params.slug}`
      );
      setProduct(data?.products);
      getSimilarProducts(data?.products?._id,data?.products?.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar products
  const getSimilarProducts = async(pid,cid) =>{
    try {
      const {data} = await axios.get(`${base_url}/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  }

  //initialization
  useEffect(() => {
    if(params?.slug)
    {
        getProduct();
    }
  }, [params?.slug]);
  console.log(product);
  return (
    <Layout>
      <div className="pathroute">
        <h2 >
          <span className="p1">Home</span>
          <span>/</span>
          <span className="p2">Products</span>
          <span>/</span>
          <span className="p2">{product?.slug}</span>
        </h2>
      </div>
      <div className="prod">
        <div className="back_btn">
           <button className="btn button" onClick={()=>navigate("/products")}>
            Back to Products
           </button>
        </div>
        <div className="main_cont">
          <div className="img_cont">
            <img src={product?.photo} alt="photo"/>
          </div>
          <div className="body_cont mb-3">
            <h1 >{product.name}</h1>
            <h4 >₹ {product.price}.00</h4>
            <h5 ><span>Available : </span><span className="ans">{product.quantity ? "In Stocks" : "Out Of Stocks"}</span></h5>
            <h5 ><span>SKU : </span><span className="ans" style={{marginLeft:"6vw"}}>{product._id}</span></h5>
            <h5 ><span>Shipping : </span><span className="ans">{product.shipping ? "Available" : "Not Available"}</span></h5>
            <h5>Description </h5>
            <articl style={{width:"20vw",opacity:"0.9"}}>
              <p>{product?.description?.substring(0, 60)}..</p>
            </articl>
            <button
                      className="btn button mt-3 mb-3"
                      onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, product])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                    <hr/>
          </div>
        </div>
        <div>
          {relatedProduct && <h3 className="text-center mt-5 mb-5 smilar">Similar Products</h3>}
          <div className="d-flex flex-wrap mt-4 justify-content-center mb-3">
            {relatedProduct?.map( (p)=> (
                <Card P_Id = {p._id} photo = {p.photo} name = {p.name} price = {p.price} slug={p.slug}/>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="row container product-details">
        <div className="col-md-6">
            <img className="card-img-top" src={product.photo} alt={product.name} height="300px" width={"350px"} />
        </div>
        <div className="col-md-6 product-details-info">
            <h1 className="text-center">Product details</h1>
            <h6>Name : {product.name}</h6>
            <h6>Descrition : {product.description}</h6>
            <h6>Price : 
            {product?.price?.toLocaleString("en-INDIA", {
              style: "currency",
              currency: "INR",
            })}
            </h6>
            <h6>Category : {product?.category?.name}</h6>
            <button className="btn btn-secondary ms-1" onClick={() =>{setCart([...cart,product]) ;localStorage.setItem('cart',JSON.stringify([...cart,product])) ;toast.success("Item Added to cart")}} >Add to Cart</button>
        </div>
      </div>
      <hr/>
      <div className="row continer similar-products">
      <h4 className="text-center">Related Products</h4>
      {relatedProduct.length < 1 && (<p className="text-center">No Similar Product Found</p>)}
            <div className="d-flex flex-wrap">
            {relatedProduct?.map( (p)=> (
                <div className="card m-2" key={p._id}>
                <img
                  src={p?.photo}
                  className="card-img-top"
                  alt={p?.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p?.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p?.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
            </div>
      </div> */}
    </Layout>
  );
};

export default ProductDetails;
