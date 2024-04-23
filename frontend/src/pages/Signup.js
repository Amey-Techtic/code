import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import CustomInput from "../components/CustomInput";
import { customSignupValidation } from "../helpers/validators/signupValidation";
import { cartNotification } from "../App";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {
  const notificationProvider = useContext(cartNotification);
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    cpassword: "",
  };
 
  const { values, handleChange, handleBlur, handleSubmit, errors, resetForm, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: customSignupValidation,
      onSubmit: async (values) => {
        const signupData = {
          username: values.username,
          email: values.email,
          password: values.password,
        };
        await axios
          .post("http://localhost:3900/users/signup", signupData)
          .then(async (res) => {
            notificationProvider(res.data.message, "success");
            resetForm();
            navigate("/login");
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
      {/* {contextHolder} */}
      <div className="shadow-lg rounded-md w-[35%] p-[1%] ml-auto mr-auto text-center mt-[10%]">
        <h1 className="text-xl mb-[2%] font-bold text-slate-500">Sign Up</h1>
        <p className="text-slate-500">
          register your credentials here to login
        </p>
        <form onSubmit={handleSubmit}>
          <CustomInput
            touched={touched.username}
            label="Username"
            errors={errors.username}
            name="username"
            type="text"
            placeholder="Enter username"
            value={values.username}
            onBlur={handleBlur}
            onChange={handleChange}
          />
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
            label="Password"
            errors={errors.password}
            name="password"
            type="password"
            placeholder="Enter password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <CustomInput
            touched={touched.cpassword}
            label="Confirm Password"
            errors={errors.cpassword}
            name="cpassword"
            type="password"
            placeholder="Enter password"
            value={values.cpassword}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <br />
          <button
            className="bg-zinc-400 p-[2%] mt-2 text-white rounded-md text-lg font-semibold"
            type="submit"
          >
            Submit
          </button>
        </form>
        <Link className='text-sm text-slate-500 mt-4 hover:cursor-pointer' to={'/login'}>Already have as account? Click here</Link>
      </div>
    </>
  );
};

export default Signup;
