import {Routes,Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login"
import Dashboard from "./pages/User/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./components/Routes/AdminRoute";
import CreateCategories from "./pages/Admin/CreateCategories";
import CreateProducts from "./pages/Admin/CreateProducts";
import AdminOrders from "./pages/Admin/AdminOrders";
import Orders from "./pages/User/Orders";
import Profile from "./pages/User/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element = {<HomePage/>} />
        <Route path='/products' element = {<ProductsPage/>} />
        <Route path="/dashboard" element={<PrivateRoute/>}>
           <Route path="user" element={<Dashboard/>}/>
           <Route path="user/orders" element={<Orders/>}/>
           <Route path="user/profile" element={<Profile/>}/>
        </Route>
        <Route path="/dashboard" element={<AdminRoute/>}>
           <Route path="admin" element={<AdminDashboard/>}/>
           <Route path="admin/create-category" element={<CreateCategories/>}/>
           <Route path="admin/create-product" element={<CreateProducts/>}/>
           <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
           <Route path="admin/products" element={<Products/>}/>
           <Route path="admin/orders" element={<AdminOrders/>}/>
        </Route>
        <Route path="/product/:slug" element = {<ProductDetails/>} />
        <Route path="/cart" element = {<CartPage/>} />
        <Route path="/categories" element = {<Categories/>} />
        <Route path="/category/:slug" element = {<CategoryProduct/>} />
        <Route path='/search' element = {<Search/>} />
        <Route path='/register' element = {<Register/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/forgot-password' element = {<ForgotPassword/>} />
        <Route path='/about' element = {<About/>} />
        <Route path='/contact' element = {<Contact/>} />
        <Route path='/policy' element = {<Policy/>} />
        <Route path='/*' element = {<PageNotFound/>} />
      </Routes>
    </>
  );
}

export default App;
