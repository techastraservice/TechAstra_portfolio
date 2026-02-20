import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, ChevronRight, ChevronLeft, Search } from 'lucide-react';

import { useProjects } from '../context/ProjectContext';
import Reveal from './Reveal';

const Projects = () => {
    const { projects } = useProjects();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerPage(4); // 2x2 Grid on mobile
            } else {
                setItemsPerPage(6); // 2x3 or 3x2 on desktop
            }
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        <section id="projects" className="py-20 relative bg-white dark:bg-transparent transition-colors duration-300">
            <div className="container">
                <Reveal>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <div>
                            
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2 transition-colors">Featured Projects</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-2 transition-colors">Explore our diverse portfolio of {projects.length}+ innovative solutions.</p>
                        </div>

                        {/* Desktop Nav - Hidden on Mobile */}
                        <div className="hidden md:flex gap-2">
                            <button
                                onClick={prevPage}
                                disabled={currentPage === 1}
                                className={`p-2 rounded-lg border border-gray-200 dark:border-white/10 transition-colors ${currentPage === 1 ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10'}`}
                            >
                                <ChevronLeft />
                            </button>
                            <button
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                                className={`p-2 rounded-lg border border-gray-200 dark:border-white/10 transition-colors ${currentPage === totalPages ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10'}`}
                            >
                                <ChevronRight />
                            </button>
                        </div>
                    </div>
                </Reveal>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    {currentProjects.map((project, index) => (
                        <Reveal key={index} delay={index * 100}>
                            <div className="group relative rounded-2xl overflow-hidden glass border-0 h-[300px] md:h-[400px] shadow-sm dark:shadow-none bg-white dark:bg-transparent transition-colors">
                                {/* Image Overlay */}
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-10"></div>

                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />

                                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 z-20 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
                                    <div className="flex justify-between items-end">
                                        <div className="w-full">
                                            <span className="text-cyan-400 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1 md:mb-2 block">{project.category}</span>
                                            <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2 truncate">{project.title}</h3>
                                            <p className="text-gray-300 text-xs md:text-sm mb-2 md:mb-4 line-clamp-2 hidden md:block">{project.desc}</p>
                                            <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-4">
                                                {project.tech.slice(0, 3).map((t, i) => (
                                                    <span key={i} className="text-[9px] md:text-[10px] text-gray-300 bg-white/10 px-1.5 py-0.5 md:px-2 md:py-1 rounded border border-white/5">{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Action - Live Link */}
                                    {project.liveLink && (
                                        <div className="flex gap-3 justify-end mt-2">
                                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="p-1.5 md:p-2 rounded-full bg-white/10 text-white hover:bg-cyan-500 hover:text-white transition-colors backdrop-blur-sm" title="Live Demo">
                                                <ExternalLink size={14} className="md:w-[18px] md:h-[18px]" />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* Mobile Bottom Navigation */}
                <div className="flex md:hidden justify-center mt-8 gap-4">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className={`p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm transition-colors ${currentPage === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-white/10 hover:border-cyan-500/50'}`}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <div className="flex items-center text-gray-400 font-mono text-sm">
                        {currentPage} / {totalPages}
                    </div>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className={`p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm transition-colors ${currentPage === totalPages ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-white/10 hover:border-cyan-500/50'}`}
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Projects;
