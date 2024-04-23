import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Typography } from "antd";
import CustomModal from "./CustomModal";
import { FaCartShopping } from "react-icons/fa6";


const CustomHeader = () => {
  const [openModal, setOpenModal] = useState(false);
  const cartItems = useSelector((state) => state.cartItems);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("auth");
    const userData = JSON.parse(localStorage.getItem("user"));
    if (authToken) {
      setToken(authToken);
    }
    if (userData) {
      setUser(userData);
    }
  }, []);

  //this refreshtoken function must only return true or false
  const callRefreshToken = async () => {
    try {
      const refresh = JSON.parse(localStorage.getItem("refresh"));
      const refreshToken = {
        refreshToken: refresh,
      };
      let response = await axios.post(
        "http://localhost:3900/users/verify-refresh-token",
        refreshToken
      );

      if (response.status == 200 && response.statusText == "OK") {
        let data = await response.data;
        if (data.token) {
          localStorage.setItem("auth", JSON.stringify(response.data.token));
          return true;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.log("error", error);
      return false;
    }
  };

  const handleUserProfile = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"));
      // console.log("userprofile token: ", token);
      let response = await axios.get("http://localhost:3900/users/profile", {
        headers: {
          authorization: `bearer ${token}`,
        },
      });
      console.log("response data", response.data);
      if (response.data.status) {
        navigate("/user-profile");
        // console.log("inside if response data status");
      } else {
        console.log("inside else response data status");
        if (response.data.tokenExpired) {
          console.log("inside else callrefreshtoken");

          const newToken = await callRefreshToken();
          if (newToken) {
            // console.log("inside else if callrefreshtoken");

            return await handleUserProfile();
          }
          if (!newToken) {
            //if refresh token is expired
            // console.log("inside else if not newToken");

            localStorage.clear();
            navigate("/login");
          }
          return console.log("Something went wrong");
        } else {
          console.log("inside else logout");
          //LOGOUT
          localStorage.clear();
          navigate("/login");
          return;
        }
      }
    } catch (error) {
      console.log("error", error);
      localStorage.clear();
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("refresh");
    localStorage.removeItem("auth");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // console.log("token ", token);
  return (
    <div className="flex flex-row justify-between shadow-xl text-black">
      <CustomModal openModal={openModal} setOpenModal={setOpenModal} />
      <Link
        to={"/"}
        className="no-underline text-2xl text-black mt-4 mb-4 ml-4 font-bold"
      >
        {" "}
        ShopMart{" "}
      </Link>

      <div className="flex mt-1 ">

        {token ? (
          <button
            onClick={() => handleLogout()}
            className="no-underline mr-4 text-xl text-black font-semibold"
          >
            Logout
          </button>
        ) : (
          <Link
            to={"/login"}
            className="no-underline mr-4 text-xl mt-3.5 text-black font-semibold"
          >
            Sign in
          </Link>
        )}
        {token && (
          <button
            onClick={() => handleUserProfile()}
            className="no-underline text-xl text-slate-500  mr-4 font-semibold"
          >
            {user.username.toUpperCase()}
            {/* {console.log("user profile: ", user)} */}
          </button>
        )}
        <Link
          to={"/profile"}
          className="no-underline text-xl mt-3.5 text-black font-semibold"
        >
          {" "}
          Profile{" "}
        </Link>
        <div
          className="mr-2 flex flex-row mt-2.5 cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          {/* <Image
            //  width={200}
            height={60}
            src={`https://png.pngtree.com/png-vector/20190501/ourmid/pngtree-add-to-cart--icon-design-png-image_1013293.jpg`}
            preview={false}
       
          />
              */}
          <FaCartShopping size={30} className="mt-1 ml-2" />

          {cartItems
            ?.filter((ele) => ele.selectedQuantity > 0)
            ?.map((item) => item)?.length > 0 && (
            <Typography.Paragraph className=" bg-red-500 rounded-[50%] ml-[-0.9rem] mt-[-0.7rem] z-10 pt-0.5  w-[1.75rem] h-[60%] text-white text-center">
              {
                cartItems
                  ?.filter((ele) => ele.selectedQuantity > 0)
                  ?.map((item) => item)?.length
              }
            </Typography.Paragraph>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomHeader;
