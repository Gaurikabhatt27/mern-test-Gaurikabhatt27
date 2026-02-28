import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginAdmin } from '../api/auth';

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginAdmin(formData);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || "Invalid Admin Credentials");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Admin Login</h2>
                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="email" placeholder="Admin Email" required
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password" placeholder="Password" required
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="auth-btn" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                        Admin Sign In
                    </button>

                    <div className="auth-links">
                        <p>Not an admin? <Link to="/login">Student Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
