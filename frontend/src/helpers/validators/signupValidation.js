import * as Yup from 'yup';

export const customSignupValidation = Yup.object({
    username: Yup.string().min(3).required("Username is required"),
    email: Yup.string().email("Please enter valid email").required("Email is required"),
    password: Yup.string().min(7).required("Password is required"),
    cpassword: Yup.string().oneOf([Yup.ref("password")], "Password not matched").required("Confirm Password is required")
});