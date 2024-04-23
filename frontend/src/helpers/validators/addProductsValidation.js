import * as Yup from "yup";

export const addProductsValidation = Yup.object({
    title: Yup.string().min(4).required("title is required"),
    description: Yup.string().min(4).required("description is required"),
    price: Yup.number().required("price is required"),
    title: Yup.string().required("Please enter the title"),

})