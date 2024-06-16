import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-center mb-5">
        <h4 className="title" style={{fontFamily:"-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif",fontSize:"2.5rem",color:"#102a42"}}>Dashboard</h4>
      <div className="list-group">
        <NavLink to = "/dashboard/user/profile" className="list-group-item list-group-item-action" >
          Profile
        </NavLink>
        <NavLink to = "/dashboard/user/orders" className="list-group-item list-group-item-action">
          Orders
        </NavLink>
      </div>
      </div>
    </>
  );
};

export default UserMenu;
