import axios from 'axios';

const api = axios.create({
    baseURL: 'https://stockmanager-backend-p2ko.onrender.com',
});




export default api;
