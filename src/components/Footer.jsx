import React from 'react';
import { Rocket, Twitter, Linkedin, Github, ExternalLink } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative border-t border-white/10 bg-black/40 backdrop-blur-md pt-20 pb-10 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
                <h1 className="text-[15vw] font-bold text-transparent bg-clip-text bg-gradient-to-b from-purple-500/40 via-cyan-500/20 to-transparent tracking-tighter leading-none opacity-80 blur-sm">
                    Tech Astra
                </h1>
            </div>
            <div className="absolute top-0 left-1/4 w-full h-full bg-gradient-to-tr from-purple-500/10 to-transparent blur-[80px] pointer-events-none z-0"></div>
            <div className="absolute bottom-0 right-1/4 w-full h-full bg-gradient-to-bl from-cyan-500/10 to-transparent blur-[80px] pointer-events-none z-0"></div>

            <div className="container relative z-10">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center">
                                <Rocket className="text-white w-4 h-4" />
                            </div>
                            <span className="text-xl font-bold text-white">
                                Tech<span className="text-cyan-400">Astra</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Expert consultancy services that accelerate your business growth with cutting-edge technology solutions.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Services</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">Web Development</li>
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">App Development</li>
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">AI/ML Projects</li>
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">Digital Marketing</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Company</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">All Services</li>
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">Portfolio</li>
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">About</li>
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">Contact</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Connect</h4>
                        <div className="flex gap-4">
                            <a href="https://github.com/shivarajm8234" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-gray-800 transition-all">
                                <Github size={18} />
                            </a>
                            <a href="https://x.com/RJGamer325071" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-cyan-500 transition-all">
                                <Twitter size={18} />
                            </a>
                            <a href="https://www.linkedin.com/in/mshivaraj/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-blue-600 transition-all">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>&copy; 2024 Tech Astra. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
