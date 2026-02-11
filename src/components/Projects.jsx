import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, ChevronRight, ChevronLeft, Search } from 'lucide-react';

import { useProjects } from '../context/ProjectContext';
import Reveal from './Reveal';

const Projects = () => {
    const { projects } = useProjects();
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
        <section id="projects" className="py-20 relative bg-white dark:bg-transparent transition-colors duration-300">
            <div className="container">
                <Reveal>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <div>
                            <span className="text-cyan-600 dark:text-cyan-400 font-medium tracking-wider uppercase text-sm transition-colors">Portfolio</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2 transition-colors">Featured Projects</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-2 transition-colors">Explore our diverse portfolio of {projects.length}+ innovative solutions.</p>
                        </div>

                        <div className="flex gap-2">
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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentProjects.map((project, index) => (
                        <Reveal key={index} delay={index * 100}>
                            <div className="group relative rounded-2xl overflow-hidden glass border-0 h-[400px] shadow-sm dark:shadow-none bg-white dark:bg-transparent transition-colors">
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
                                                    <span key={i} className="text-[10px] text-gray-300 bg-white/10 px-2 py-1 rounded border border-white/5">{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Action - Live Link */}
                                    {project.liveLink && (
                                        <div className="flex gap-3 justify-end mt-2">
                                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 text-white hover:bg-cyan-500 hover:text-white transition-colors backdrop-blur-sm" title="Live Demo">
                                                <ExternalLink size={18} />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
