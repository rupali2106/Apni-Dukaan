import {useState,useEffect} from "react";
import axios from "axios";
import base_url from "../utils/api";

const useCategory = () =>{
  const [categories,setCategories] = useState([]);
   const getCategories = async () =>{
    try {
        const {data} = await axios.get(`${base_url}/api/v1/category/get-category`);
        setCategories(data?.category);
    } catch (error) {
        console.log(error);
    }
   }
   useEffect(()=>{
    getCategories();
   },[]);
   return categories;
}

export default useCategory;
