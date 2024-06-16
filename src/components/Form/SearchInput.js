import React from "react";
import { useSearch } from "../../Context/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import base_url from "../../utils/api";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${base_url}/api/v1/product/search-product/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control "
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          style={{borderRadius:"8px 0px 0px 8px",backgroundColor:"#e0e0e0",boxShadow:"none"}}
        />
        <button className="btn " type="submit" style={{padding:"2px 8px", marginRight:"5px",borderRadius:"0px 8px 8px 0",backgroundColor:"#e0e0e0"}}>
         <BiSearch style={{color:"black"}}/>
        </button>
      </form>
    </div>
  );
};

export default SearchInput;