import React, { useState } from 'react';
import { useProjects } from '../context/ProjectContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Logo from '../assets/techastra-logo.png'; // Import the logo

const Admin = () => {
    const { addProject } = useProjects();
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginCredentials, setLoginCredentials] = useState({
        email: '',
        password: ''
    });

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        image: '',
        desc: '',
        tech: '', // comma separated
        liveLink: '', // optional
    });

    const handleLoginChange = (e) => {
        setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // Placeholder credentials as requested
        if (loginCredentials.email === 'admin@techastra.com' && loginCredentials.password === 'admin123') {
            setIsAuthenticated(true);
        } else {
            alert('Invalid credentials! Please try again.');
        }
    };

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

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0d0d12] text-gray-100 flex flex-col relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>

                <div className="flex-grow flex items-center justify-center px-4 relative z-10">
                    <div className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-2xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">

                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-150%] group-hover:animate-shimmer"></div>

                        <div className="flex flex-col items-center mb-10">
                            <div className="w-24 h-24 mb-4 relative">
                                <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-full"></div>
                                <img src={Logo} alt="Tech Astra" className="w-full h-full object-contain relative z-10 drop-shadow-lg" />
                            </div>
                            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent tracking-wide">
                                ADMIN ACCESS
                            </h2>
                            <p className="text-gray-400 text-sm mt-2 font-light tracking-wider">SECURE GATEWAY</p>
                        </div>

                        <form onSubmit={handleLoginSubmit} className="space-y-6">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={loginCredentials.email}
                                    onChange={handleLoginChange}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-black/40 border border-white/5 focus:border-cyan-500/50 focus:bg-black/60 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all text-gray-200 placeholder-gray-600"
                                    placeholder="Enter Admin Email"
                                    required
                                />
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={loginCredentials.password}
                                    onChange={handleLoginChange}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-black/40 border border-white/5 focus:border-cyan-500/50 focus:bg-black/60 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all text-gray-200 placeholder-gray-600"
                                    placeholder="Enter Password"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 px-6 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-bold tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transform hover:-translate-y-1 active:scale-95 mt-4"
                            >
                                LOGIN TO DASHBOARD
                            </button>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Navbar /> {/* Reuse Navbar for consistency */}

            <div className="container mx-auto px-4 py-32">
                <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Admin Dashboard</h1>
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
