import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ShieldCheck } from 'lucide-react';
import './Auth.css'; // Reusing the premium auth styles for the background/cards

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="auth-container" style={{ flexDirection: 'column', gap: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem', zIndex: 10 }}>
                <h1 style={{
                    fontSize: '3.5rem',
                    fontWeight: 800,
                    margin: 0,
                    background: 'linear-gradient(to right, #60a5fa, #c084fc)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 10px 30px rgba(96, 165, 250, 0.3)'
                }}>
                    Welcome to EchoCMS
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginTop: '1rem' }}>
                    Select your portal to continue
                </p>
            </div>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', zIndex: 10 }}>

                {/* Student Card */}
                <div
                    className="auth-box"
                    style={{
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '3rem 2rem',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                    onClick={() => navigate('/login')}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div style={{
                        background: 'rgba(56, 189, 248, 0.1)',
                        padding: '1.5rem',
                        borderRadius: '50%',
                        marginBottom: '1.5rem'
                    }}>
                        <GraduationCap size={48} color="#38bdf8" />
                    </div>
                    <h2 style={{ marginBottom: '0.5rem' }}>Student Portal</h2>
                    <p style={{ color: '#94a3b8', textAlign: 'center', margin: 0 }}>
                        Access your enrolled courses, view materials, and track progress.
                    </p>
                </div>

                {/* Admin Card */}
                <div
                    className="auth-box"
                    style={{
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '3rem 2rem',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                    onClick={() => navigate('/admin/login')}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div style={{
                        background: 'rgba(16, 185, 129, 0.1)',
                        padding: '1.5rem',
                        borderRadius: '50%',
                        marginBottom: '1.5rem'
                    }}>
                        <ShieldCheck size={48} color="#10b981" />
                    </div>
                    <h2 style={{ marginBottom: '0.5rem' }}>Admin Portal</h2>
                    <p style={{ color: '#94a3b8', textAlign: 'center', margin: 0 }}>
                        Manage courses, oversee students, and administer the system.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Landing;
