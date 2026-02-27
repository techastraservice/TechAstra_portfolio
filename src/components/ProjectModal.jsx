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
            <div className="relative w-full max-w-5xl max-h-[90vh] md:min-h-[400px] bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200 transition-colors">

                {/* Close Button - Floating */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/80 rounded-full transition-colors text-gray-400 hover:text-white backdrop-blur-sm shadow-sm"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Left Side: Image */}
                {project.image && (
                    <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-50 dark:bg-white/5 flex items-center justify-center p-6 md:p-10">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="max-w-full max-h-full object-contain rounded-xl shadow-md"
                        />
                    </div>
                )}

                {/* Right Side: Content */}
                <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar bg-[#0a0a0a] transition-colors">
                    <div className="p-6 md:p-8 space-y-6 flex-1 mt-8 md:mt-0">
                        {/* Header Info */}
                        <div>
                            <span className="text-cyan-400 text-sm font-bold uppercase tracking-wider block mb-2">{project.category}</span>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white transition-colors pr-8">{project.title}</h3>
                        </div>

                        {/* Description */}
                        <div className="prose prose-invert max-w-none">
                            <h4 className="text-lg font-semibold text-white mb-2">About the Project</h4>
                            <p className="text-gray-300 text-[15px] sm:text-base leading-relaxed transition-colors whitespace-pre-line">
                                {project.desc}
                            </p>
                        </div>

                        {/* Technologies Grid */}
                        {project.tech && project.tech.length > 0 && (
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2 transition-colors">
                                    Technologies Used
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="text-sm text-gray-300 bg-[#1a1a1a] px-3 py-1.5 rounded-lg border border-white/5 shadow-sm font-medium">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer with Actions */}
                    <div className="p-6 md:p-8 border-t border-white/5 bg-[#0a0a0a] flex flex-col sm:flex-row items-center gap-4 transition-colors">
                        {project.liveLink && (
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 group"
                            >
                                Live Demo
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        )}
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:flex-1 px-6 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition-colors font-medium flex items-center justify-center gap-2 shadow-sm"
                            >
                                <Github size={20} />
                                Source Code
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
