import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, ChevronRight, ChevronLeft, Search } from 'lucide-react';

const projects = [
    {
        title: "ThrifCart",
        category: "AI E-commerce",
        image: "https://images.unsplash.com/photo-1472851294608-415522f96803?q=80&w=1000&auto=format&fit=crop",
        desc: "Product comparison app for grocery, rides, and e-commerce with AI-powered recommendations and price tracking.",
        tech: ["React Native", "Node.js", "TensorFlow", "MongoDB"]
    },
    {
        title: "Sarv Marg",
        category: "Smart Mobility",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
        desc: "Real-time road condition monitoring app using AI image analysis and shortest route optimization.",
        tech: ["Flutter", "Python", "Google Maps API", "AI"]
    },
    {
        title: "Job Finder Bot",
        category: "AI Recruitment",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000&auto=format&fit=crop",
        desc: "AI job search platform with resume scoring, job alerts, and chatbot-based job guidance.",
        tech: ["Django", "OpenAI GPT", "React", "Redis"]
    },
    {
        title: "Marketing Automation",
        category: "SaaS Platform",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
        desc: "End-to-end automation for social media, emails, lead generation, and analytics.",
        tech: ["React", "Node.js", "PostgreSQL", "AWS"]
    },
    {
        title: "Mahalaxmi Foods.in",
        category: "Local Commerce",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop",
        desc: "Local food ordering website supporting homemade food businesses with product listings, cart, and payment system.",
        tech: ["React", "Stripe", "MongoDB", "Node.js"]
    },
    {
        title: "Sahayak Nexus",
        category: "EdTech",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop",
        desc: "AI classroom BIOS for rural education with personalized learning, emotion tracking, and offline syncing.",
        tech: ["Flutter", "TensorFlow", "SQLite", "OpenCV"]
    },
    {
        title: "Risk-Based Proctoring",
        category: "Security Extension",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
        desc: "Smart proctoring extension analyzing behavior to ensure exam integrity without video surveillance.",
        tech: ["Python", "OpenCV", "React", "AI"]
    },
    {
        title: "Food Redistribution",
        category: "Social Impact",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop",
        desc: "AI-matched food donation system connecting surplus donors with needy recipients.",
        tech: ["Node.js", "React", "Maps API", "ML"]
    }
];

const Projects = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProjects = projects.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(projects.length / itemsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <section id="projects" className="py-20 relative">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <span className="text-cyan-400 font-medium tracking-wider uppercase text-sm">Portfolio</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Featured Projects</h2>
                        <p className="text-gray-400 mt-2">Explore our diverse portfolio of {projects.length}+ innovative solutions.</p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-lg border border-white/10 ${currentPage === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-white/10'}`}
                        >
                            <ChevronLeft />
                        </button>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-lg border border-white/10 ${currentPage === totalPages ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-white/10'}`}
                        >
                            <ChevronRight />
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
                    {currentProjects.map((project, index) => (
                        <div key={index} className="group relative rounded-2xl overflow-hidden glass border-0 h-[400px]">
                            {/* Image Overlay */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-10"></div>

                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />

                            <div className="absolute bottom-0 left-0 w-full p-6 z-20 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
                                <div className="flex justify-between items-end">
                                    <div className="w-full">
                                        <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2 block">{project.category}</span>
                                        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.desc}</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tech.map((t, i) => (
                                                <span key={i} className="text-[10px] text-gray-400 bg-white/10 px-2 py-1 rounded border border-white/5">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {/* Actions */}
                                <div className="flex gap-3 justify-end mt-2">
                                    <a href="#" className="p-2 rounded-full bg-white/10 text-white hover:bg-cyan-500 hover:text-white transition-colors backdrop-blur-sm" title="View Code">
                                        <Github size={18} />
                                    </a>
                                    <a href="#" className="p-2 rounded-full bg-white/10 text-white hover:bg-cyan-500 hover:text-white transition-colors backdrop-blur-sm" title="Live Demo">
                                        <ExternalLink size={18} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
