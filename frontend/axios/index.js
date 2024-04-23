import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Create an Axios instance with default headers
// console.log('process.env.API :>> ', process.env.NEXT_PUBLIC_API_URL);
const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        common: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            maxBodyLength: Infinity,
        },
    },
});
const setAuthorizationHeader = () => {
    const token = process?.browser && localStorage?.getItem('auth');
    return token ? `Bearer ${token}` : '';
};
axiosInstance.interceptors.request.use((config) => {
    // Set the Authorization header using the dynamically retrieved token
    config.headers.Authorization = setAuthorizationHeader();
    return config;
});
let refresh = false;
// export type AxiosCustomResponse = {
//     data: any;
//     status_code: number;
//     token?: string;
// };
axiosInstance.interceptors.response.use(
    (resp) => {
        if (resp.data?.status_code === 403) {
            refresh = true;
            // 
        }
        return resp.data;
    },
    async (error) => {
  const navigate = useNavigate();

        if ((error.response?.status === 401 || error.response?.status === 500) &&  
            !refresh
        //      &&
        //     (error.response.data.message === 'Token has expired' ||
        //         error.response.data.message === 'Invalid Token.' ||
        //         error.response.data.message === 'User not found')
        ) 
        {
            refresh = true;

            navigate('/login');
        }
        refresh = false;
        return Promise.reject(error);
        
    },
);

export default axiosInstance;
