import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_URL_REMOTE;

const instance = axios.create({
    baseURL : apiUrl
});

export default instance;
