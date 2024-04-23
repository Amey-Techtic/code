import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const UnprotectedRoutesAuthenticate = ({Component}) => {
    const token = localStorage.getItem("auth");
    const navigate = useNavigate();
    useEffect(()=>{
        if(token){
            navigate("/");
        }
    },[])
  return (
    <>
        {Component}
    </>
    
  )
}

export default UnprotectedRoutesAuthenticate;

