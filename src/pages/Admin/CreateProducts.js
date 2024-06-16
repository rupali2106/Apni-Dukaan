import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Select } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import base_url from "../../utils/api";
const { Option } = Select;


const CreateProducts = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in getting all category");
    }
  };

  //handleCreate 
  const handleCreate = async () =>{
    try {
      const productData = new FormData();
      productData.append("name",name);
      productData.append("description",description);
      productData.append("price",price);
      productData.append("quantity", quantity);
      productData.append("shipping",shipping);
      productData.append("photo",photo);
      productData.append("category",category);
      const {data} = await axios.post(`${base_url}/api/v1/product/create-product`,productData);
      if (data?.success) {
        toast.success(`${data.product.name} is creted`);
        navigate("/dashboard/admin/products")
      }
      else
      {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error increating product");
    }
  }

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"Dashboard - Create Products"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Products</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3 text-white"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12 text-white">
                  {photo ? photo.name : "upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`${photo.name}`}
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3 text-white">
                <input
                  type="text"
                  placeholder="write a name"
                  className="form-control"
                  value={name}
                  onChange={(e)=>{setName(e.target.value)}}
                />
              </div>
              <div className="mb-3 text-white">
                <textarea
                  type="text"
                  placeholder="write a Descrition"
                  className="form-control"
                  value={description}
                  onChange={(e)=>{setDescription(e.target.value)}}
                />
              </div>
              <div className="mb-3 text-white">
                <input
                  type="number"
                  placeholder="write a price"
                  className="form-control"
                  value={price}
                  onChange={(e)=>{setPrice(e.target.value)}}
                />
              </div>
              <div className="mb-3 text-white">
                <input
                  type="number"
                  placeholder="write a quantity"
                  className="form-control"
                  value={quantity}
                  onChange={(e)=>{setQantity(e.target.value)}}
                />
              </div>
              <div className="mb-3">
              <Select
                bordered={false}
                placeholder="Select shipping status"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setShipping(value);
                }}>
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
              </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}> Create Product </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProducts;
