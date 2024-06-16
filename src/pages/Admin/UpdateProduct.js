import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Select } from "antd";
import toast from "react-hot-toast";
import { useNavigate ,useParams} from "react-router-dom";
import base_url from "../../utils/api";
const { Option } = Select;


const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id,setId] = useState("");
  const [updatePhoto,setUpdatePhoto] = useState("");

  //get single product
  const getSingleProduct = async () =>{
      try {
        const { data } = await axios.get(`${base_url}/api/v1/product/single-product/${params.slug}`);
        setName(data.products.name);
        setId(data.products._id);
        setDescription(data.products.description);
        setQuantity(data.products.quantity);
        setPrice(data.products.price);
        setShipping(data.products.shipping);
        setCategory(data.products.category._id);
        setPhoto(data.products.photo)
      } catch(error)
      {
        console.log(error);
        toast.error("Error in getting single product");
      }
  }

  useEffect( () =>{
    getSingleProduct();
    //eslint-disable-next-line
  },[])

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
  const handleUpdate = async () =>{
    try {
      const productData = new FormData();
      productData.append("name",name);
      productData.append("description",description);
      productData.append("price",price);
      productData.append("quantity", quantity);
      productData.append("shipping",shipping);
      photo &&  productData.append("photo",photo);
      productData.append("category",category);
      const {data} = await axios.put(`${base_url}/api/v1/product/update-product/${id}`,productData);
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
      toast.error("Error in creating product");
    }
  }


  //deleting single product
  const handleDelete = async (p_id)=>{
    try {
        let answer = window.prompt("Are you Really want to delete this product");
        if(!answer) return;
        const {data} = await axios.delete(`${base_url}/api/v1/product/delete-product/${p_id}`);
        if(data.success)
        {
          toast.success(`product deleted successfully`);
          navigate("/dashboard/admin/products");
        }
        else
        {
          toast.error(data.message);
        }
    } catch (error) {
      console.log(error);
        toast.error("Something went wrong Deleting product")
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
            <h3>Update Products</h3>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value = {category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {updatePhoto ? updatePhoto.name : "upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                      setUpdatePhoto(e.target.files[0]);
                    }}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {updatePhoto ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(updatePhoto)}
                      alt={`${updatePhoto.name}`}
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={photo}
                      alt="photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="write a name"
                  className="form-control"
                  value={name}
                  onChange={(e)=>{setName(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  placeholder="write a Descrition"
                  className="form-control"
                  value={description}
                  onChange={(e)=>{setDescription(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="write a price"
                  className="form-control"
                  value={price}
                  onChange={(e)=>{setPrice(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="write a quantity"
                  className="form-control"
                  value={quantity}
                  onChange={(e)=>{setQuantity(e.target.value)}}
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
                }}
                value = { shipping ? "Yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
              </Select>
              </div>
              <div className="mb-3 flex flex-row">
                <button className="btn btn-primary m-2" onClick={handleUpdate}> Update Product </button>
                <button className="btn btn-danger m-2" onClick={ ()=> handleDelete(id)}> Delete Product </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
