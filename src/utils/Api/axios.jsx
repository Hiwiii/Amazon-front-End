import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: "http://localhost:5002",
    baseURL: "https://amazon-backend-deploy-2ohu.onrender.com",
});

export default  axiosInstance 