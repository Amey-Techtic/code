import axios from "axios";

const customAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

customAxios.interceptors.request.use(
    res=>{return res},
    err => {return Promise.reject(err)}
);

customAxios.interceptors.response.use(
    res=>{return res;},
    err=>{return Promise.reject(err)}
)

export default customAxios; 