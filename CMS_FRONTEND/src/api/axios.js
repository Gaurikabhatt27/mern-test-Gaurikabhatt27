import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080/api',
});

API.interceptors.request.use((req) => {
    const profile = localStorage.getItem('studentProfile');
    if (profile) {
        const { token } = JSON.parse(profile);
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;