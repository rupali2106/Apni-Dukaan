import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/Form/CategoryForm";
import {Modal} from 'antd';
import base_url from "../../utils/api";

const CreateCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name,setName] = useState();
  const [visible,setVisible] = useState(false);
  const [selected,setSelected] = useState(null);
  const [updateName,setUpdateName] = useState("");

  const handleSubmit = async (e)=>{
      e.preventDefault();
      try {
        const {data} = await axios.post(`${base_url}/api/v1/category/create-category`,{name});
        if(data.success)
        {
          toast.success(`${data.category.name} created`);
          getAllCategory();
        }
        else
        {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong on category form")
      }
  }

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in getting all category");
    }
  };

  //handling edit
  const handleUpdate = async(e)=>{
    e.preventDefault();
    try {
        const {data} = await axios.put(`${base_url}/api/v1/category/update-category/${selected._id}`,{name:updateName});
        if(data.success)
        {
          toast.success(`${data.category.name} is updated`);
          setSelected(null);
          setVisible(false);
          setUpdateName("");
          getAllCategory();
        }
        else
        {
          toast.error(data.message);
        }
    } catch (error) {
      console.log(error);
        toast.error("Something went wrong in editing category")
    }
  }

  //deleting the single category
  const handleDelete = async (id)=>{
    try {
        const {data} = await axios.delete(`${base_url}/api/v1/category/delete-category/${id}`);
        if(data.success)
        {
          toast.success(`Item deleted successfully`);
          getAllCategory();
        }
        else
        {
          toast.error(data.message);
        }
    } catch (error) {
      console.log(error);
        toast.error("Something went wrong Deleting category")
    }
  }
    useEffect(() => {
      getAllCategory();
    },[]);
  return (
    <Layout title={"Dashboard - Create Categories"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Mange Categories</h1>
            <div className="p-3 w-50">
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>  
                {categories?.map(c => (              
                  <tr>
                      <>
                      <td key={c._id}>{c.name}</td>
                      <td>
                        <button className="btn btn-primary ms-2" onClick={()=>{setVisible(true) ; setUpdateName(c.name) ; setSelected(c)}}> Edit </button>
                        <button className="btn btn-danger ms-2" onClick={()=>handleDelete(c._id)}> Delete </button>
                      </td>
                      </>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
              <CategoryForm value={updateName} setValue={setUpdateName} handleSubmit={handleUpdate}/>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategories;
