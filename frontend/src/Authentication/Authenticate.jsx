import React, { useContext, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import { cartNotification } from "../App";

const Authenticate = ({Component}) => {
  const notification = useContext(cartNotification);

    const navigate = useNavigate();
    const token = localStorage.getItem("auth");
    useEffect(()=>{
        if(!token){
            navigate("/login");
            notification("Looks like you havn't signed in yet!","error");
        }
    })
    
  return (
    <>
        {/* {token ? protectedComponent: navigate("/login")}
        {!token ? Component : navigate("/login")} */}
        {Component}

    </> 
  )
}

export default Authenticate