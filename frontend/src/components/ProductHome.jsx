import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button, Image, Typography, Space, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../services/Actions/action";
import { cartNotification } from "../App";
import CustomHeader from "./CustomHeader";
import PaginationComponent1 from "./PaginationComponent1";
const { Paragraph } = Typography;

const ProductHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);

  const [pageCount, setPageCount] = useState(0); //for total pages

  const dispatch = useDispatch(); //we can dipatch any reducer action function using useDispatch
  const CartItem = useSelector((state) => state.cartItems); //using useSelector we can use any reducer functions
  const notificationProvider = useContext(cartNotification);

  async function getproductData() {
    try {
      const limit = 10;
      const response = await axios.get(
        `http://localhost:3900/products/get-products?search=${""}&category=${"All"}&page=${page}&limit=${limit}`
      );
      if (response.data.success) {
        const data = response.data;
        // console.log("response.data.products", response.data.productData.productData);
        setProducts(data.productData);
        setPageCount(data.pagination.pageCount);
        setLoading(false);
      } else {
        setLoading(false);
        return <div>{response.data.message}</div>;
      }
    } catch (error) {
      console.log("error ", error);
      setLoading(false);
      return <div>{error.message}</div>;
    }
  }

  //handle next
  const handleNext = () => {
    setPage(()=>{
      if(page === pageCount) return page; //if page is equal to page count that means already reached max page count so just return the same page
      return page + 1;
    })
  };

  //handle previous
  const handlePrevious = () => {
    setPage(()=>{
      if(page === 1) return page;
      return page - 1;
    })
  };

  useEffect(() => {
    console.log("Inside useEffect");

    getproductData();
  }, [page]);

  // //to count page by products data length
  // useEffect(() => {
  //   //formula to count pages by data length
  //   const pageDataCount = Math.ceil(products.length / 10);
  //   //here we have divided product length by 10 to show 10 products per page

  //   setPageCount(pageDataCount);

  //   if (page) {
  //     const limit = 10;
  //     const skip = limit * page; //10 * 1 = 10
  //     const dataskip = products.slice(page === 1 ? 0 : skip - limit, skip);
  //     setPageData(dataskip);
  //   }
  // }, [products]);
  // //   console.log(products);

  const handleAddCart = (item) => {
    let filterArray = CartItem.some((ele) => ele.title == item.title);
    if (!filterArray) {
      dispatch(
        addToCart({
          title: item.title,
          image: item.image,
          price:
            Math.trunc(item.price) < 100
              ? Math.trunc(item.price) * 100
              : Math.trunc(item.price),
          selectedQuantity: 1,
        })
      );
      notificationProvider(
        `${item.title} was successfully add in your cart!`,
        "success"
      );
      return;
      // props.addToCartHandler();
    } else {
      notificationProvider(
        `${item.title} is already present in your cart!`,
        "info"
      );
      return;
    }
  };

  // console.log("CartItem", CartItem);
  return (
    <>
      {/* <Dashboard> */}
        <CustomHeader />
      <div className="text-black">
        {/* ProductHome component body */}
        <div id="parent-div" className="flex flex-row gap-[10%]">
          <div id="sidebarMenu" className="shadow-xl flex flex-col w-[30%] rounded-lg mt-10 ml-[5%] h-fit">

            <input type="text" placeholder="Search product here..." className="mt-[25%] border-2
            p-2 w-[90%] flex flex-row mx-auto rounded-lg border-zinc-100 outline-none"/>
            <div className="text-xl mt-[10%] ml-[10%] font-bold">
              Filter 
            </div>
            <div className="flex flex-row align-middle ml-[10%] gap-2 p-2 mb-[25%]">
              
              
            <div className="flex flex-col justify-center gap-y-5">
                <input type="checkbox"/>
                <input type="checkbox"/>
                <input type="checkbox"/>

              </div>
              
              <div className="flex flex-col justify-center text-lg font-semibold gap-y-2">
                <label>Electronics</label>

                <label>Fashion</label>
                <label>Accessories</label>

              </div>
            </div>
            
          </div>

          <div className="grid grid-cols-3 mt-10 gap-7 mr-[5%] w-[90%]">
            {console.log("products", products)}
            {products?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col w-[100%] p-4 shadow-xl justify-between items-center rounded-lg"
              >
                <Image
                  className="flex justify-center align-middle m-0"
                  height={216}
                  src={`${item.image}`}
                  preview={false}
                />

                <Paragraph className="text-center text-lg mt-4 h-[33%]">
                  {item.title}
                </Paragraph>

                <Paragraph className="text-xl text-center h-fit !mb-1.5">
                  &#8377;
                  {Math.trunc(item?.price) < 100
                    ? Math.trunc(item?.price) * 100
                    : Math.trunc(item?.price)}
                </Paragraph>

                <Space>
                  <Button
                    className="bg-red-500 text-white m-auto font-semibold text-lg p-2 h-auto w-fit "
                    onClick={() => handleAddCart(item)}
                  >
                    Add To Cart
                  </Button>
                </Space>
              </div>
            ))}
          </div>
        </div>
        
      </div>
      <PaginationComponent1 
      handlePrevious={handlePrevious} 
      handleNext = {handleNext}
      setPage={setPage}
      page={page}
      pageCount={pageCount}
      />
      {/* </Dashboard> */}
      {loading && (
        <div className="flex flex-col align-middle text-center mt-[19rem]">
          <Spin size="large" />
          <div className="mt-2.5 text-lg font-semibold text-blue-500">
            Loading...
          </div>
        </div>
      )}
      {!products && (
        <div className="text-lg text-center -mt-10 font-semibold">
          No Products found!
        </div>
      )}
      
    </>
  );
};

export default ProductHome;
