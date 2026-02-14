import React from 'react';
import { Rocket, Twitter, Linkedin, Github, ExternalLink } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';

const Footer = () => {
    const { totalVisits } = useProjects();
    return (
        <footer className="relative border-t border-gray-200 dark:border-white/10 bg-white/90 dark:bg-black/40 backdrop-blur-md pt-20 pb-10 overflow-hidden transition-colors duration-300">
            {/* Background Decorations */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
                <h1 className="text-[15vw] font-bold text-transparent bg-clip-text bg-gradient-to-b from-purple-500/30 dark:from-purple-500/40 via-cyan-500/10 dark:via-cyan-500/20 to-transparent tracking-tighter leading-none opacity-100 dark:opacity-80 blur-sm transition-colors">
                    Tech Astra
                </h1>
            </div>
            <div className="absolute top-0 left-1/4 w-full h-full bg-gradient-to-tr from-purple-500/5 dark:from-purple-500/10 to-transparent blur-[80px] pointer-events-none z-0 transition-opacity"></div>
            <div className="absolute bottom-0 right-1/4 w-full h-full bg-gradient-to-bl from-cyan-500/5 dark:from-cyan-500/10 to-transparent blur-[80px] pointer-events-none z-0 transition-opacity"></div>

            <div className="container relative z-10">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center">
                                <Rocket className="text-white w-4 h-4" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors">
                                Tech<span className="text-cyan-600 dark:text-cyan-400 transition-colors">Astra</span>
                            </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed transition-colors">
                            Expert consultancy services that accelerate your business growth with cutting-edge technology solutions.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-gray-900 dark:text-white font-bold mb-4 transition-colors">Services</h4>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm transition-colors">
                            <li className="hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer transition-colors">Web Development</li>
                            <li className="hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer transition-colors">App Development</li>
                            <li className="hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer transition-colors">AI/ML Projects</li>
                            <li className="hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer transition-colors">Digital Marketing</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-gray-900 dark:text-white font-bold mb-4 transition-colors">Company</h4>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm transition-colors">
                            <li className="hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer transition-colors">All Services</li>
                            <li className="hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer transition-colors">Portfolio</li>
                            <li className="hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer transition-colors">About</li>
                            <li className="hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer transition-colors">Contact</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-gray-900 dark:text-white font-bold mb-4 transition-colors">Connect</h4>
                        <div className="flex gap-4">
                            <a href="https://github.com/shivarajm8234" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-all">
                                <Github size={18} />
                            </a>
                            <a href="https://x.com/RJGamer325071" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-700 dark:text-white hover:bg-cyan-100 dark:hover:bg-cyan-500 hover:text-cyan-600 dark:hover:text-white transition-all">
                                <Twitter size={18} />
                            </a>
                            <a href="https://www.linkedin.com/in/mshivaraj/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-700 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-600 hover:text-blue-600 dark:hover:text-white transition-all">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 transition-colors">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <p>&copy; 2024 Tech Astra. All rights reserved.</p>
                        {(totalVisits >= 0) && (
                            <>
                                <div className="hidden md:block w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                <p className="font-mono flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    Visitors: <span className="text-gray-900 dark:text-white font-bold">{totalVisits.toLocaleString()}</span>
                                </p>
                            </>
                        )}
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;