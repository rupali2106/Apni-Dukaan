import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Styles/All_Categories.css";
import Card from "../components/Card/Card.js";
import base_url from "../utils/api";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Loader from "../components/Loader";


const Categories = () => {
  const categories = useCategory();
  const navigate = useNavigate();
  let [arr, setArr] = useState([]);
  const all_products = async () => {
    let prodPromises = [];
    try {
      categories.map((c) => {
        const prodPromise = axios.get(
          `${base_url}/api/v1/product/category-product/${c?.slug}`
        );
        prodPromises.push(prodPromise);
      });
      let data = await Promise.all(prodPromises);
      data = data.map((obj) => obj.data);
      setArr(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    all_products();
  }, [categories]);
 
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Layout title={"All Categories"}>
      <div className="pathroute">
        <h2>
          <span className="p1" onClick={() => navigate("/")}>
            Home
          </span>
          <span>/</span>
          <span className="p2">All Categories</span>
        </h2>
      </div>
      <div className="container d-flex flex-column cat_main mb-5">
        {arr ? arr.map((obj) => {
          return (
            <>
              <div className="cat_head text-center mt-2 ">
                <h2 className="mb-5">{(obj?.category?.slug).toUpperCase()}</h2>
                <div>
                <Slider {...settings}>
                  {obj.products.map((p) => {
                    return (
                      <div style={{width : "22vw"}}>
                        <Card
                          P_Id={p._id}
                          photo={p.photo}
                          name={p.name}
                          price={p.price}
                          slug={p.slug}
                        />
                      </div>
                    );
                  })}
                   </Slider>
                </div>
              </div>
            </>
          );
        }): (
          <Loader ht={100} wd={100}/>
        )}
      </div>
    </Layout>
  );
};

export default Categories;

// import React from 'react'
// import Carousel from 'react-grid-carousel'

// const Categories = () => {
//   return (
//     <>
//     <Carousel cols={2} rows={1} gap={10} loop>
//       <Carousel.Item>
//         <img width="100%" src="https://picsum.photos/800/600?random=1" />
//       </Carousel.Item>
//       <Carousel.Item>
//         <img width="100%" src="https://picsum.photos/800/600?random=2" />
//       </Carousel.Item>
//       <Carousel.Item>
//         <img width="100%" src="https://picsum.photos/800/600?random=3" />
//       </Carousel.Item>
//       <Carousel.Item>
//         {/* anything you want to show in the grid */}
//       </Carousel.Item>
//       {/* ... */}
//     </Carousel>
//     </>
//   )
// }

// export default Categories
