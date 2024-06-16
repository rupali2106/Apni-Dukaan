import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import base_url from '../utils/api';
import Card from "../components/Card/Card.js";

const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products,setProducts] = useState([]);
    const [category,setCategory] = useState([]);

    const getProductByCat = async() =>{
        try {
            const {data} = await axios.get(`${base_url}/api/v1/product/category-product/${params?.slug}`);
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() =>{
        if(params?.slug)
        {
            getProductByCat();
        }
    },[params?.slug]);
  return (
    <Layout>
      <div className="pathroute d-flex flex-column justify-content-center align-items-baseline">
          <h2>
          <span className="p1" onClick={()=>navigate("/")} >Home</span>
              <span>/</span>
              <span className="p2">{category?.name}</span>
          </h2>
          <h4 className='text-center' style={{color:"#617d98"}}>{products.length < 1 ? "No Products found" : `Found ${products.length} Results`}</h4>
        </div>
        <div className='container mb-5'>
            <div className='text-center'>
              <div className="d-flex flex-wrap mt-4 justify-content-center">
            {products?.map( (p)=> (
                <Card P_Id = {p?._id} photo = {p?.photo} name = {p?.name} price = {p?.price} slug={p.slug}/>
            ))}
            </div>
            </div>
        </div>

    </Layout>
  )
}

export default CategoryProduct