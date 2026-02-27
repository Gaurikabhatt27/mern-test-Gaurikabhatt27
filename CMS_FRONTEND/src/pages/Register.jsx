import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/auth';

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
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2>Student Registration</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
                <input 
                    type="text" placeholder="Full Name" required 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    style={styles.input}
                />
                <input 
                    type="email" placeholder="Email Address" required 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    style={styles.input}
                />
                <input 
                    type="password" placeholder="Password" required 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                    style={styles.input}
                />
                
                <button type="submit" style={styles.button}>Register</button>
                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </form>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f4' },
    form: { padding: '2rem', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '350px', textAlign: 'center' },
    input: { width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' },
    button: { width: '100%', padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default Register;