import React from 'react'
import Layout from "../components/Layout/Layout";
import { useSearch } from '../Context/Search';
import { useNavigate } from 'react-router-dom';
import { useCart } from "../Context/Cart";
import toast from "react-hot-toast";
import Card from "../components/Card/Card"

const Search = () => {
  const navigate = useNavigate();
    const [cart,setCart] = useCart();
    const [values,setValues] = useSearch();
  return (
    <Layout title={"Search Results"}>
       <div className="pathroute d-flex flex-column justify-content-center align-items-baseline">
          <h2>
          <span className="p1" onClick={()=>navigate("/")} >Home</span>
              <span>/</span>
              <span className="p2">Search Results</span>
          </h2>
          <h4 className='text-center' style={{color:"#617d98"}}>{values?.results.length < 1 ? "No Products found" : `Found ${values.results.length} Results`}</h4>
        </div>
        <div className='container'>
            <div className='text-center'>
              <div className="d-flex flex-wrap mt-4 justify-content-center">
            {values?.results?.map( (p)=> (
                <Card P_Id = {p._id} photo = {p.photo} name = {p.name} price = {p.price} slug={p.slug}/>
            ))}
            </div>
            </div>
        </div>

    </Layout>
  )
}

export default Search