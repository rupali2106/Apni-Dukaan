import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/Cart";
import { AiOutlineReload } from "react-icons/ai";
import "../Styles/ProductPage.css";
import Card from "../components/Card/Card.js";
import base_url from "../utils/api";
import { BsFillGridFill } from "react-icons/bs";
import { IoRefreshCircleSharp } from "react-icons/io5";
import useCategory from "../hooks/useCategory";
import Loader from "../components/Loader";

const Products = () => {
  const categories = useCategory();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, SetRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("");

  // //get toal count
  // const getTotal = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${base_url}/api/v1/product/count-product`
  //     );
  //     setTotal(data?.total);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // //load more
  // const loadMore = async () => {
  //   try {
  //     setLoading(true);
  //     if (sort === "") {
  //       const { data } = await axios.get(
  //         `${base_url}/api/v1/product/list-product/${page}`
  //       );
  //       setLoading(false);
  //       setProducts([...products, ...data?.products]);
  //       getTotal();
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };

  // //get all products
  // const getAllProducts = async () => {
  //   try {
  //     setLoading(true);
  //     const { data } = await axios.get(
  //       `${base_url}/api/v1/product/list-product/${page}`
  //     );
  //     setLoading(false);
  //     if (data?.success) {
  //       setProducts(data.products);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //     toast.error("Error in showing products");
  //   }
  // };

  // // //get all filter products
  // const filterProducts = async () => {
  //   try {
  //     const { data } = await axios.post(
  //       `${base_url}/api/v1/product/filter-product`,
  //       { checked, radio}
  //     );
  //     setTotal(data?.products.length);
  //     setProducts(data?.products);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Error in filtering products");
  //   }
  // };

  
  //initializing loadMore
  // useEffect(() => {
  //   if (page === 1) {
  //     return;
  //   } else {
  //     if (checked.length || radio.length || sort !== "") {
  //       getSortProduct();
  //     } else {
  //       loadMore();
  //     }
  //   }
  // }, [page,checked.length,radio.length,sort]);

  
  //we page first loaded
  // useEffect(() => {
  //   if (!checked.length && !radio.length && sort === "") getAllProducts();
  //   setTotal(products.length);
  // }, [checked.length, radio.length, sort]);

  //  useEffect(() => {
  //   if (checked.length || radio.length) {
  //     getSortProduct();
  //   }
  // }, [checked, radio,]);

  //filter by category
  const handleFilter = async (value, id) => {
    try {
      let all = [...checked];
      if (value) {
        all.push(id);
      } else {
        all = all.filter((c) => c !== id);
      }
      setPage(1);
      setChecked(all);
    } catch (error) {
      console.log(error);
      toast.error("Error in handling filter");
    }
  };

  //get sort product + filter + pagination
  const getSortProduct = async () => {
    try {
      const { data } = await axios.post(
        `${base_url}/api/v1/product/sort-product`,
        { sort, page, checked, radio }
      );
      setTotal(data?.count);
      if (page === 1) {
        setProducts(data?.products);
      } else{
        setProducts([...products, ...data?.products]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in Sorting products");
    }
  };

  //initializing products 
  useEffect(() => {
    setSort("price-lowest");
  }, []);

//handling changes
  useEffect(() => {
    if (checked.length || radio.length || sort !== "") {
      getSortProduct();
    }
  }, [sort, checked, radio,page]);

  return (
    <Layout title={"ALL Products - Best offers "}>
      <div className="pathroute">
        <h2>
          <span className="p1" onClick={() => navigate("/")}>
            Home
          </span>
          <span>/</span>
          <span className="p2">Products</span>
        </h2>
      </div>
      <div className="prdct">
        <div className="prdct_cont">
          <section className="filter">
            <div className="filter_cont">
              <h5>Category</h5>
              <div className="d-flex flex-column">.
                {categories.length ?  categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                    style={{ color: "#617d98", fontWeight: "630" }}
                  >
                    {c.name}
                  </Checkbox>
                )) : (
                  <Loader ht={60} wd={60}/>
                )}
              </div>
              <h5>Price</h5>
              <div className="d-flex flex-column">
                <Radio.Group onChange={(e) => {SetRadio(e.target.value);setPage(1)}}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio
                        value={p.Array}
                        style={{ color: "#617d98", fontWeight: "630" }}
                      >
                        {p.name}{" "}
                      </Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            </div>
            <button
              className="btn button reset"
              onClick={() => window.location.reload()}
            >
              Clear Filters
            </button>
          </section>
          <section className="prdct_main pt-3">
            <div className=" sorting mb-2">
              <div>
                <BsFillGridFill
                  className="sort_icon"
                  style={{ marginRight: "0.5vh" }}
                />
                <IoRefreshCircleSharp
                  className="sort_icon"
                  onClick={() => window.location.reload()}
                  style={{ marginleft: "0.5vh" }}
                />
              </div>
              <p>{total ? total : products.length} Prodcuts Found</p>

              <form className="sort_form">
                <label htmlFor="sort" className="sort_label">
                  Sort By
                </label>
                <select
                  name="sort"
                  id="sort"
                  className="sort-input"
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setPage(1);
                    setProducts([]);
                  }}
                >
                  <option value="price-lowest">Price (lowest)</option>
                  <option value="price-highest">Price (highest)</option>
                  <option value="name-a">Name (A-Z)</option>
                  <option value="name-z">Name (Z-A)</option>
                </select>
              </form>
            </div>
            <div className="d-flex flex-wrap  justify-content-center">
              {products.length ?  products?.map((p) => (
                <Card
                  P_Id={p._id}
                  photo={p.photo}
                  name={p.name}
                  price={p.price}
                  slug={p.slug}
                />
              )):(
                <Loader ht={100} wd={100}/>
              )}
            </div>
            <div className="text-center">
              {products && products.length < total && (
                <button
                  className="btn loadmore"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                    setTotal(products.length);
                  }}
                  style={{ fontSize: "1.6rem", color: "green" }}
                >
                  {loading ? (
                    ""
                  ) : (
                    <>
                      {" "}
                      <AiOutlineReload />
                    </>
                  )}
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
