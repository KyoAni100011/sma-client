import axios from 'axios';


const instance = axios.create({
    baseURL : import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_BACKEND_URL_REMOTE 
    : import.meta.env.VITE_BACKEND_URL_LOCAL,  
});

export default instance;

