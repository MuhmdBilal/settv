import React from 'react'
// import axios from "axios"
// import {BACKEND_URI} from "../../config"
// import { useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
// import { BACKEND_URI } from '../../config';
function PayButton({cartItems}) {

  // let getdata = JSON.parse(localStorage.getItem("setTV-User"))
    const handleCheckOut = ()=>{
         try{
      //  console.log("cartItems", cartItems, getdata._id);
      //  let user_id = getdata._id
      //  axios.post(`${BACKEND_URI}/api/v1/stripe/create-checkout-session`, {
      //   cartItems, 
      //   user_id
      //  }).then((res)=>{
      //   if(res.data.url){
      //     window.location.href = res.data.url
      //   }
      //  })
         }catch(e){
            console.log("e", e);
         }
    }
  return (
    <div>
        <div className="d-grid gap-2 mt-2">
      <Button variant="primary" onClick={handleCheckOut}>
        Check Out
      </Button>
      
    </div>
    </div>
  )
}

export default PayButton