import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { logout } from '../api/auth';
import { Trash2, Search, LogOut, Plus } from 'lucide-react';

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
        if (window.confirm("Delete this course?")) {
            try {
                await API.delete(`/courses/${id}`);
                setCourses(courses.filter(course => course._id !== id));
            } catch (err) {
                alert("Could not delete course");
            }
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1>Course Dashboard</h1>
                <button onClick={logout} style={styles.logoutBtn}>
                    <LogOut size={18} /> Logout
                </button>
            </header>

            <section style={styles.searchBar}>
                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
                    <input 
                        type="text" 
                        placeholder="Search courses..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.iconBtn}><Search /></button>
                </form>
            </section>

            <div style={styles.grid}>
                {courses.map(course => (
                    <div key={course._id} style={styles.card}>
                        <h3>{course.courseName}</h3>
                        <p>{course.courseDescription}</p>
                        <small>Instructor: {course.instructor}</small>
                        <button 
                            onClick={() => handleDelete(course._id)} 
                            style={styles.deleteBtn}
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    searchBar: { marginBottom: '2rem' },
    input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '300px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' },
    card: { padding: '1.5rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'relative' },
    logoutBtn: { display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 15px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    deleteBtn: { position: 'absolute', top: '10px', right: '10px', color: '#dc3545', border: 'none', background: 'none', cursor: 'pointer' },
    iconBtn: { padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default Dashboard;