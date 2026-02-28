import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { logout } from '../api/auth';
import { Trash2, Search, LogOut, Plus } from 'lucide-react';

const AdminDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        courseName: '',
        courseDescription: '',
        instructor: ''
    });
    const [error, setError] = useState('');

    const fetchCourses = async (query = '') => {
        try {
            const { data } = await API.get(`/courses?search=${query}`);
            setCourses(data);
        } catch (err) {
            console.error("Failed to fetch courses", err);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchCourses(searchTerm);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                await API.delete(`/courses/${id}`);
                setCourses(courses.filter(course => course._id !== id));
            } catch (err) {
                alert("Could not delete course. Make sure you are an admin or have permissions.");
            }
        }
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const { data } = await API.post('/courses', formData);
            // Append new course to list
            setCourses([...courses, data.course || data]);
            // Close modal and reset form
            setShowModal(false);
            setFormData({ courseName: '', courseDescription: '', instructor: '' });
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create course");
        }
    };

    return (
        <div className="dashboard-container">
            {/* Modal Overlay */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content auth-box" style={{ maxWidth: '500px', margin: '0 20px' }}>
                        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Add New Course</h2>
                        {error && <div className="auth-error">{error}</div>}

                        <form onSubmit={handleAddCourse}>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Course Name"
                                    required
                                    value={formData.courseName}
                                    onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                                />
                            </div>
                            <div className="input-group">
                                <textarea
                                    placeholder="Course Description"
                                    required
                                    rows="4"
                                    value={formData.courseDescription}
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '12px',
                                        color: '#fff',
                                        fontFamily: 'inherit',
                                        resize: 'vertical'
                                    }}
                                    onChange={(e) => setFormData({ ...formData, courseDescription: e.target.value })}
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Instructor Name"
                                    required
                                    value={formData.instructor}
                                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="auth-btn"
                                    style={{ background: 'rgba(255,255,255,0.1)', flex: 1 }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="auth-btn"
                                    style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', flex: 1 }}
                                >
                                    Create Course
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="dashboard-content">
                <header className="dashboard-header">
                    <h1>Admin Dashboard</h1>
                    <button onClick={logout} className="logout-btn">
                        <LogOut size={18} /> Logout
                    </button>
                </header>

                <section className="search-section" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <form onSubmit={handleSearch} className="search-form" style={{ maxWidth: '500px', margin: 0 }}>
                        <input
                            type="text"
                            placeholder="Search courses by name or keyword..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="search-btn"><Search size={20} /></button>
                    </form>

                    <button
                        onClick={() => setShowModal(true)}
                        className="search-btn"
                        style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', gap: '8px' }}
                    >
                        <Plus size={20} /> Add New Course
                    </button>
                </section>

                {courses.length === 0 ? (
                    <div className="empty-state">
                        <h2>No courses found</h2>
                        <p>Try adjusting your search or add a new course.</p>
                    </div>
                ) : (
                    <div className="dashboard-grid">
                        {courses.map(course => (
                            <div key={course._id} className="course-card">
                                <h3>{course.courseName}</h3>
                                <p>{course.courseDescription}</p>
                                <small>Instructor: {course.instructor}</small>
                                <button
                                    onClick={() => handleDelete(course._id)}
                                    className="delete-btn"
                                    title="Delete Course"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
