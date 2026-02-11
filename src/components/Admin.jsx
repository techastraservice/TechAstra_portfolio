import React, { useState } from 'react';
import { useProjects } from '../context/ProjectContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Admin = () => {
    const { addProject } = useProjects();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        image: '',
        desc: '',
        tech: '', // comma separated
        liveLink: '', // optional
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const techArray = formData.tech.split(',').map(item => item.trim());
        const newProject = { ...formData, tech: techArray };
        addProject(newProject);
        alert('Project added successfully!');
        navigate('/'); // Redirect to home to see the project
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Navbar /> {/* Reuse Navbar for consistency */}

            <div className="container mx-auto px-4 py-32">
                <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>
                <div className="max-w-2xl mx-auto bg-white dark:bg-white/5 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-white/10 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold mb-6">Add New Project</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">Project Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-black/50 border border-gray-300 dark:border-white/10 focus:ring-2 focus:ring-cyan-500 outline-none transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-black/50 border border-gray-300 dark:border-white/10 focus:ring-2 focus:ring-cyan-500 outline-none transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-black/50 border border-gray-300 dark:border-white/10 focus:ring-2 focus:ring-cyan-500 outline-none transition-colors"
                                required
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Live Link (Optional)</label>
                            <input
                                type="url"
                                name="liveLink"
                                value={formData.liveLink}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-black/50 border border-gray-300 dark:border-white/10 focus:ring-2 focus:ring-cyan-500 outline-none transition-colors"
                                placeholder="https://example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                                name="desc"
                                value={formData.desc}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-black/50 border border-gray-300 dark:border-white/10 focus:ring-2 focus:ring-cyan-500 outline-none transition-colors h-32"
                                required
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Technologies (comma separated)</label>
                            <input
                                type="text"
                                name="tech"
                                value={formData.tech}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-black/50 border border-gray-300 dark:border-white/10 focus:ring-2 focus:ring-cyan-500 outline-none transition-colors"
                                required
                                placeholder="React, Node.js, AI"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-cyan-500/25 transform hover:scale-[1.02]"
                        >
                            Add Project
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Admin;
