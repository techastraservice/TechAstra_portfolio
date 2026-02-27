import React, { useEffect } from 'react';
import { X, ExternalLink, Github } from 'lucide-react';

const ProjectModal = ({ isOpen, onClose, project }) => {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !project) return null;

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 transition-colors">

                {/* Header */}
                <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-start justify-between bg-white/50 dark:bg-white/5 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <div>
                            <span className="text-cyan-600 dark:text-cyan-400 text-sm font-bold uppercase tracking-wider block mb-1">{project.category}</span>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">{project.title}</h3>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8 bg-gray-50 dark:bg-transparent transition-colors">
                    {/* Project Image */}
                    {project.image && (
                        <div className="w-full h-64 sm:h-80 md:h-[400px] rounded-xl overflow-hidden relative shadow-md">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Description */}
                    <div className="prose prose-invert max-w-none">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About the Project</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-[15px] sm:text-base leading-relaxed transition-colors whitespace-pre-line">
                            {project.desc}
                        </p>
                    </div>

                    {/* Technologies Grid */}
                    {project.tech && project.tech.length > 0 && (
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2 transition-colors">
                                Technologies Used
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((t, i) => (
                                    <span key={i} className="text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-white/10 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none font-medium">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer with Actions */}
                <div className="p-6 border-t border-gray-100 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md flex flex-wrap items-center justify-end gap-4 transition-colors">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors font-medium flex items-center gap-2 shadow-sm dark:shadow-none"
                        >
                            <Github size={18} />
                            Source Code
                        </a>
                    )}
                    {project.liveLink && (
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 group"
                        >
                            Live Demo
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
