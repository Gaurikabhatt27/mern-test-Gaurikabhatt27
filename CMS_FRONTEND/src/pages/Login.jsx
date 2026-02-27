import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.message || "Invalid Credentials");
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2>Student Login</h2>
                <input 
                    type="email" placeholder="Email" required 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    style={styles.input}
                />
                <input 
                    type="password" placeholder="Password" required 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Login</button>
            </form>
        </div>
    );
};

export default Login;