import React from 'react'
import UserMenu from "../../components/Layout/UserMenu"; 
import Layout from "../../components/Layout/Layout"; 
import { useAuth } from '../../Context/Auth';

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Apni Dukaan"}>
      <div style={{minHeight:"20vh", backgroundColor:"#eaded7",marginTop:"3px", marginBottom:"8vh",display:"flex", alignItems:"center",justifyContent:"start"}}>
         <h2 className="title"style={{marginLeft:"6vw",fontFamily:"-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif",fontSize:"2.2rem"}}>
          <span style={{color:"#795744"}}>Home</span><span>/</span><span style={{color:"#453227"}}> Dashboard</span>
         </h2>
      </div>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-4">
            <UserMenu/>
          </div>
          <div className="col-md-8 mb-5" style={{minHeight:"30vh"}}>
          <div className='card  form-container mt-0' style={{backgroundColor:"#f1f5f8", width:"auto"}}>
            <h3> {auth?.user?.name}</h3>
            <h3> {auth?.user?.email}</h3>
            <h3> {auth?.user?.phone}</h3>
            <h3> {auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard