import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaShopify ,FaCartPlus} from "react-icons/fa";
import { useAuth } from "../../Context/Auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../Context/Cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand" style={{display:"flex",flexDirection:"row", fontSize:"30px",letterSpacing:"0.5px",alignItems:"center"}}>
              <FaShopify style={{marginRight:"5px",fontSize:"35px"}}/> Apni <div style={{color:"#696969",marginLeft:"10px"}}>Dukaan</div>
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/products" className="nav-link">
                  Products
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  to={"/categories"}
                  class="nav-link dropdown-toggle  "
                  data-bs-toggle="dropdown"
                >
                  categories
                </Link>
                <ul class="dropdown-menu">
                  <li>
                    <Link to={`/categories`} className="dropdown-item d_item">
                      All categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        to={`/category/${c.slug}`}
                        className="dropdown-item d_item"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu change-dropdown-menu">
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }/orders`}
                        className="dropdown-item"
                      >
                        Orders
                      </NavLink>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }/profile`}
                        className="dropdown-item"
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/login"
                        onClick={handleLogout}
                        className="dropdown-item"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}
              <li className="nav-item" style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                <NavLink to="/cart" className="nav-link">
                <Badge count={cart?.length} showZero offset={[10, -5]}>
                 <FaCartPlus style={{fontSize:"27px"}} className="text-center"/> 
                </Badge>
                </NavLink>
            </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
