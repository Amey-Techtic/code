import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import CustomInput from "../components/CustomInput";
import { cartNotification } from "../App";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { customLoginValidation } from "../helpers/validators/loginValidation";

const Login = () => {

  const notificationProvider = useContext(cartNotification);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  
  const { values, handleChange, handleBlur, handleSubmit, errors, resetForm, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: customLoginValidation,
      onSubmit: async (values) => {
        console.log(values);
        const loginData = {
          email: values.email,
          password: values.password,
        };
        await axios
          .post("http://localhost:3900/users/login", loginData)
          .then((res) => {
            console.log("res", res);
            if(res.data.auth){
              localStorage.setItem('user', JSON.stringify(res.data.user));
              localStorage.setItem('auth', JSON.stringify(res.data.auth));
              localStorage.setItem('refresh', JSON.stringify(res.data.refresh));
              notificationProvider(res.data.message, "success");
              resetForm();
              navigate("/");
            }

          })
          .catch((error) => {
            console.log("error", error);
            const errors = error.response.data.message || error.response.data;
            notificationProvider(errors, "error");
            resetForm();
          });
      },
    });
  return (
    <>
      <div className="shadow-lg rounded-md w-[35%] p-[1%] ml-auto mr-auto text-center mt-[10%]">
        <h1 className="text-xl mb-[2%] font-bold text-slate-500">Login</h1>
        <p className="text-slate-500">login with your registered credentials</p>
        <form onSubmit={handleSubmit}>
          <CustomInput 
              touched={touched.email}
              label="Email"
              errors={errors.email}
              name="email" 
              type="text"
              placeholder="Enter email" 
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
          />
          <CustomInput
            touched={touched.password}
            errors={errors.password}
            label="Password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <br/>
          <button className="bg-zinc-400 p-[2%] text-white rounded-md text-lg font-semibold" type="submit">
            Login
          </button>
          <br/>
          <Link className='text-sm text-slate-500 mt-4 hover:cursor-pointer' to={'/signup'}>New Customer? Start here </Link>
        </form>
      </div>
    </>
  )
}

export default Login
