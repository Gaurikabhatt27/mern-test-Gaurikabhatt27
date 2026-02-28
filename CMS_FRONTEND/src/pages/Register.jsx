import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/auth';
import './Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            alert("Registration successful! Please login.");
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Create Account</h2>
                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text" placeholder="Full Name" required
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email" placeholder="Email Address" required
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password" placeholder="Password" required
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="auth-btn">Register</button>

                    <div className="auth-links">
                        <p>Already have an account? <Link to="/login">Sign in here</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;