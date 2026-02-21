import React from 'react';
import { X, Linkedin, Github } from 'lucide-react';
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
                className="relative w-full max-w-5xl max-h-[90vh] flex flex-col bg-[#0a0a0f] rounded-3xl shadow-2xl overflow-hidden border border-white/10"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-white/5 shrink-0 bg-[#0f0f16]/80 backdrop-blur-xl">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        Our Expert Team
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    {teamMembers && teamMembers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {teamMembers.map((member) => (
                                <div key={member.id} className="bg-[#13131a] rounded-2xl border border-gray-800 hover:border-cyan-500/30 overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(6,182,212,0.1)]">
                                    <div className="h-24 bg-gradient-to-br from-cyan-900/50 to-purple-900/50 relative">
                                        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                                    </div>
                                    <div className="flex-1 flex flex-col px-6 pb-6 relative text-center">
                                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-[#13131a] overflow-hidden bg-gray-900 shadow-xl group-hover:border-cyan-500/30 transition-colors">
                                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="pt-14 mb-4">
                                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{member.name}</h3>
                                            <p className="text-purple-400 font-medium text-xs tracking-wider uppercase">{member.role}</p>
                                        </div>
                                        <p className="text-gray-400 text-sm flex-1 leading-relaxed">
                                            {member.desc}
                                        </p>
                                        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-4">
                                            {member.linkedin ? (
                                                <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors p-2 hover:bg-blue-500/10 rounded-full">
                                                    <Linkedin size={18} />
                                                </a>
                                            ) : (
                                                <div className="w-9 h-9 opacity-0"></div> /* Spacer if missing */
                                            )}
                                            {member.github ? (
                                                <a href={member.github} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                                                    <Github size={18} />
                                                </a>
                                            ) : (
                                                <div className="w-9 h-9 opacity-0"></div> /* Spacer if missing */
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-16 h-16 mb-4 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                                <span className="text-2xl">👥</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No Team Members Yet</h3>
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
