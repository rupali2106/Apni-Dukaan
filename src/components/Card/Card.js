import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./Card.css"
import { FaSearch } from 'react-icons/fa';
const Card = ({P_Id,photo,name,price,slug}) => {
    const navigate = useNavigate();
  return (
    <>
     <article className=' card mb-4' onClick={()=>navigate(`/product/${slug}`)}>
        <div className='cntr'>
          <img src={photo} height={"175px"} alt="photo"/>
        </div>
        <div className='ftr'>
            <h5>{name}</h5>
            <p>₹ {price}</p>
        </div>
     </article>
    </>
)
}
export default Card;


