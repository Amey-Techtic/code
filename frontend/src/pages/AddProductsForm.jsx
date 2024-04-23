
import CustomInput from "../components/CustomInput";
import { cartNotification } from "../App";
import axios from "axios";
import { useContext, useState } from "react";
import CustomHeader from "../components/CustomHeader";
// import { Link, useNavigate } from "react-router-dom";
const AddProductsForm = () => {

    const notificationProvider = useContext(cartNotification);

    console.log("inside add products form");
    const [image, setImage] = useState();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: 0,
        image: ""
    }) 

    const handleChange=(e)=>{
        const {name, value} = e.target;
        setImage(e.target.files[0]);
        setFormData((prev)=>[{
            ...prev,
            [name]: value
        }])
    }
    console.log("formData -->", formData);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3900/products/add-product",
                formData,
                {
                    headers: {"Content-Type": "multipart/form-data"}
                }
            );
            if(response.data.success){
                notificationProvider(response.data.message, "success");
    
            }
            else{
                notificationProvider(response.data.message, "error");
            }    
        } catch (error) {
            console.log("Error --> ", error);
        }
        
    }

  return (


    <>
    <CustomHeader/>
    <div>
       <div className="shadow-lg rounded-md w-[35%] p-[1%] ml-auto mr-auto text-center mt-[10%]">
        <h1 className="text-xl mb-[2%] font-bold text-slate-500">Add Products</h1>
        <p className="text-slate-500">Add your products here</p>
        <form onSubmit={handleSubmit}>
          <CustomInput 
              label="Title"
              name="title" 
              type="text"
              placeholder="Enter the title" 
              value={formData.title}
              onChange={handleChange}
          />
          <CustomInput
            label="Description"
            name="descripiton"
            type="text"
            placeholder="Enter the description"
            value={formData.description}
            onChange={handleChange}
          />
          <CustomInput
            label="Price"
            name="price"
            type="number"
            placeholder="Enter the price"
            value={formData.price}
            onChange={handleChange}
          />
          <CustomInput
            label="Upload File"
            accept="image/*"
            name="image"
            type="file"
            onChange={handleChange}
          />
          <br/>
          <button className="bg-zinc-400 p-[2%] text-white rounded-md text-lg font-semibold" type="submit">
            Submit
          </button>
          <br/>
        </form>
      </div>
    </div>
    </>
  )
}

export default AddProductsForm
