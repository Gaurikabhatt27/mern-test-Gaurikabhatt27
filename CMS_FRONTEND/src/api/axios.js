import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080/api',
});

API.interceptors.request.use((req) => {
    // Check for admin token first, then student token
    const adminProfile = localStorage.getItem('adminProfile');
    const studentProfile = localStorage.getItem('studentProfile');

    if (adminProfile) {
        const { token } = JSON.parse(adminProfile);
        req.headers.Authorization = `Bearer ${token}`;
    } else if (studentProfile) {
        const { token } = JSON.parse(studentProfile);
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;