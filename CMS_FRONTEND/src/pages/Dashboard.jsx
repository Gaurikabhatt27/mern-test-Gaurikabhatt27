import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { logout } from '../api/auth';
import { Trash2, Search, LogOut } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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

    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <header className="dashboard-header">
                    <h1>Course Dashboard</h1>
                    <button onClick={logout} className="logout-btn">
                        <LogOut size={18} /> Logout
                    </button>
                </header>

                <section className="search-section">
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            placeholder="Search courses by name or keyword..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="search-btn"><Search size={20} /></button>
                    </form>
                </section>

                {courses.length === 0 ? (
                    <div className="empty-state">
                        <h2>No courses found</h2>
                        <p>Try adjusting your search or wait for new courses to be added.</p>
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

export default Dashboard;