import API from './axios';

export const login = async (formData) => {
    const { data } = await API.post('/auth/login', formData);
    if (data.token) {
        localStorage.setItem('studentProfile', JSON.stringify(data));
    }
    return data;
};

export const register = async (formData) => {
    return await API.post('/auth/register', formData);
};

export const loginAdmin = async (formData) => {
    const { data } = await API.post('/auth/admin/login', formData);
    if (data.token) {
        localStorage.setItem('adminProfile', JSON.stringify(data));
    }
    return data;
};

export const logout = () => {
    localStorage.removeItem('studentProfile');
    window.location.href = '/login';
};