import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth';
import './Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || "Invalid Credentials");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Student Login</h2>
                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
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

                    <button type="submit" className="auth-btn">Sign In</button>

                    <div className="auth-links">
                        <p>Don't have an account? <Link to="/register">Register here</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;