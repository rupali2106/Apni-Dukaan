import { Oval } from 'react-loader-spinner';

import React from 'react'

const Loader = ({ht,wd}) => {
  return (
    <div style={{display:"flex", justifyContent:"center",alignItems:"center",width:"100%" ,height:"70%",flexDirection:"row"}}>
     <Oval
  height={ht}
  width={wd}
  color="#ab7a5f"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="white"
  strokeWidth={3}
  strokeWidthSecondary={3}

/>
    </div>
  )
}

export default Loader