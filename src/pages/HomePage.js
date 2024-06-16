import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { GiCompass, GiDiamondHard, GiStabbedNote } from "react-icons/gi";
import "../Styles/HomePage.css";
import { useAuth } from "../Context/Auth";
import axios from "axios";
import base_url from "../utils/api";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";

const HomePage = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const [auth, setAuth] = useAuth();
  const [feedback,setfeedback] = useState();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const res = await axios.post(`${base_url}/api/v1/auth/feedback`,{feedback});
      if(res && res.data.message)
      {
        toast.success(res.data.message);
        setfeedback();
      }
      
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  }


  const featured = async () => {
    try {
      const { data } = await axios.get(
        `${base_url}/api/v1/product/list-product/${1}`
      );
      if (data) {
        setProduct(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    featured();
  }, []);
  return (
    <Layout>
      <section className="hero">
        <article className="article">
          <h1>
            Search Less <br /> Buy More
          </h1>
          <p>
            Apni-Dukaan is an e-commerce platform which sells wide variety of
            products essentials. It is a one-stop destination for all your
            needs.
          </p>
          <button
            className="btn text-center mt-4 button"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
        </article>
        <article className="photo">
          <img src="/images/template.jpg" alt="photo" />
        </article>
      </section>

      <section className="text-center featured">
        <h2>Featured Products</h2>
        <div className="under_score"></div>
        <article>
          {product?.length ? (
           <img
           src={product[0]?.photo}
           alt="photo"
           onClick={() => navigate(`/product/${product[0].slug}`)}/>
          ):(
          <Loader ht={100} wd={100}/>
          )}
          
          <div className="feat_prd">
            {product?.length ? (
              <p
                className="p_tag1"
                onClick={() => navigate(`/product/${product[0].slug}`)}
              >
                {product[0]?.name}{" "}
              </p>
            ) : (
              <p className="p_tag1">Apni Dukaan</p>
            )}
            {product?.length ? (
              <p
                className="p_tag2"
                onClick={() => navigate(`/product/${product[0].slug}`)}
              >
                ₹ {product[0]?.price}{" "}
              </p>
            ) : (
              <p className="p_tag2">₹ 500</p>
            )}
          </div>
        </article>
        <div className="text-center mb-5 mt-3">
          <button
            className="btn all_prod button"
            onClick={() => navigate("/products")}
          >
            All Products
          </button>
        </div>
      </section>

      <section className="section_3">
        <div>
          <article className="service">
            <h3 style={{}}>
              Your wish
              <br />
              Our command
            </h3>
            <p>
              Customer satisfaction is the top-most priorty for Apni Dukaan. It
              is the only the trust and support of our customers that we are now
              reaching greater heights.
            </p>
          </article>
          <div className="service_conatiner">
            <article className="comp">
              <span>
                <GiCompass />
              </span>
              <h4>Mission</h4>
              <p className="text-center">
                Our mission is to provide our customers the best in class
                products and services at a very reasonable price.
              </p>
            </article>
            <article className="comp">
              <span>
                <GiDiamondHard />
              </span>
              <h4>Vision</h4>
              <p className="text-center">
                Our vision is to take Apni Dukaan to greater heights, by
                providing our customers best in class service.
              </p>
            </article>
            <article className="comp">
              <span>
                <GiStabbedNote />
              </span>
              <h4>History</h4>
              <p className="text-center">
                Apni Dukaan was started in July 22 with an initial aim to
                provide the best in class services to our customers.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section_4 container">
        <div className="row">
          <div className="col-md-6" style={{paddingRight:"3rem"}}>
            <h2>
              What did you think of us?
            </h2>
            <p className="cont_p mb-5 mt-3">
              Customer satisfaction is our top-most priorty. Today were are here
              only due to your trust and support, and our constant efforts to
              make the platform better everyday. Please provide your valuable
              feedback, and help the platform grow.
            </p>
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center ">
            {auth?.user?.email ? (
              <>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={auth?.user?.email}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      type="text"
                      placeholder="Give Your Feedback"
                      className="form-control"
                      value={feedback}
                      onChange={(e) => {
                        setfeedback(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                  <button type="submit" className="btn button mb-4">
                    Send Your Feedback
                  </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div>
                  <div className="mb-3">
                    <textarea
                      type="text"
                      placeholder="Give Your Feedback"
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <button
                      className="button btn pl-3 pr-3"
                      onClick={() => navigate("/login")}
                      style={{letterSpacing:"0.1rem"}}
                    >
                      LOGIN
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
