import React from 'react';
import { X, Linkedin, Github, User } from 'lucide-react';
import { useTeam } from '../context/TeamContext';

const TeamModal = ({ isOpen, onClose }) => {
    const { teamMembers } = useTeam();

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-5xl max-h-[90vh] flex flex-col bg-white dark:bg-[#0a0a0f] rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10 transition-colors"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-white/5 shrink-0 bg-white/80 dark:bg-[#0f0f16]/80 backdrop-blur-xl transition-colors">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3 transition-colors">
                        Our Expert Team
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    {teamMembers && teamMembers.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 pt-6 pb-8">
                            {teamMembers.map((member) => {
                                const CardWrapper = member.linkedin ? 'a' : 'div';
                                const wrapperProps = member.linkedin ? {
                                    href: member.linkedin,
                                    target: "_blank",
                                    rel: "noreferrer"
                                } : {};

                                return (
                                    <CardWrapper
                                        key={member.id}
                                        {...wrapperProps}
                                        className={`flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-2 bg-gray-50 dark:bg-[#13131a] rounded-3xl p-8 border border-gray-200 dark:border-white/10 hover:border-cyan-500/30 dark:hover:border-cyan-500/30 hover:shadow-[0_10px_30px_rgba(6,182,212,0.1)] ${member.linkedin ? 'cursor-pointer' : ''}`}
                                    >
                                        <div className="relative mb-6">
                                            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-cyan-500 p-1 overflow-hidden shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300 bg-white dark:bg-[#13131a]">
                                                <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full" />
                                            </div>
                                            <div className="absolute bottom-0 right-0 md:bottom-1 md:right-1 w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center border-[3px] border-gray-50 dark:border-[#13131a] shadow-md group-hover:scale-110 transition-transform">
                                                <User className="w-5 h-5 text-white" />
                                            </div>
                                        </div>

                                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                            {member.name}
                                        </h3>
                                        <p className="text-cyan-600 dark:text-cyan-500 font-medium text-sm transition-colors tracking-wide">
                                            {member.role}
                                        </p>

                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-4 leading-relaxed transition-colors flex-1">
                                            {member.desc}
                                        </p>

                                        <div className="mt-6 pt-5 border-t border-gray-200 dark:border-white/5 w-full flex items-center justify-center gap-4 transition-colors">
                                            {member.linkedin ? (
                                                <div className="text-gray-500 group-hover:text-blue-500 transition-colors p-2 group-hover:bg-blue-500/10 rounded-full">
                                                    <Linkedin size={18} />
                                                </div>
                                            ) : (
                                                <div className="w-9 h-9 opacity-0"></div>
                                            )}
                                            {member.github ? (
                                                <a
                                                    href={member.github}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full cursor-pointer z-10 relative"
                                                >
                                                    <Github size={18} />
                                                </a>
                                            ) : (
                                                <div className="w-9 h-9 opacity-0"></div>
                                            )}
                                        </div>
                                    </CardWrapper>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-16 h-16 mb-4 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                                <span className="text-2xl">👥</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">No Team Members Yet</h3>
                            <p className="text-gray-500 max-w-sm mx-auto">
                                The team roster is currently empty. Administrators can add new members from the Admin Dashboard.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamModal;
