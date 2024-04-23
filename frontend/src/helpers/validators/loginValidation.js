import * as Yup from 'yup';

export const customLoginValidation = Yup.object({
    email: Yup.string().email("Please enter valid email").required("Email is required"),
    password: Yup.string().min(7).required("Password is required"),
});