import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_URL_REMOTE;

console.log(apiUrl);

const instance = axios.create({
    baseURL : apiUrl
});

export default instance;
