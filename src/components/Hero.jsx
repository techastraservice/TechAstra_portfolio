import React from 'react';
import { ArrowRight, Play, Zap, Shield, TrendingUp, Cpu } from 'lucide-react';
import logo from '../assets/techastra-logo.png';

import Reveal from './Reveal';

const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden bg-gray-50 dark:bg-black transition-colors duration-300">
            <div className="container grid md:grid-cols-2 gap-12 items-center relative z-10">
                <Reveal>
                    <div className="space-y-6">
                        <div className="inline-block px-4 py-2 rounded-full glass border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-4 bg-white/50 dark:bg-white/5 backdrop-blur-sm">
                            🚀 Accelerate Your Business Growth
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight text-gray-900 dark:text-white transition-colors">
                            Launch Your Project <br />
                            <span className="text-gradient">With Confidence</span>
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed transition-colors">
                            Expert consultancy services that accelerate your business growth with cutting-edge technology solutions and proven methodologies.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <a href="#contact" className="btn-primary flex items-center gap-2">
                                Start Now <ArrowRight size={18} />
                            </a>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-lg text-cyan-600 dark:text-cyan-400">
                                    <Zap size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white transition-colors">Rapid Deployment</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-500">Solutions in record time</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-500/10 dark:bg-purple-500/20 rounded-lg text-purple-600 dark:text-purple-400">
                                    <Shield size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white transition-colors">Expert Team</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-500">Seasoned professionals</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={200}>
                    <div className="relative hidden md:block">
                        {/* Abstract Glass shapes */}
                        <div className="relative w-full aspect-square">
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-full opacity-10 dark:opacity-20 blur-3xl animate-pulse transition-opacity"></div>
                            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-3xl rotate-12 z-10 border border-white/20 dark:border-white/10 flex items-center justify-center shadow-xl dark:shadow-none transition-all">
                                <div className="text-center p-6">
                                    <span className="text-4xl font-bold text-gray-900 dark:text-white block mb-2 transition-colors">3+</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-widest transition-colors">Years Experience</span>
                                </div>
                            </div>
                            <div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-full z-20 border border-white/30 dark:border-white/20 flex items-center justify-center shadow-lg dark:shadow-none transition-all">
                                <img src={logo} alt="TechAstra Logo" className="w-40 h-40 object-contain drop-shadow-lg animate-float" />
                            </div>
                            <div className="absolute bottom-1/4 left-1/3 w-2/5 h-2/5 bg-white/20 dark:bg-white/5 backdrop-blur-lg rounded-2xl rotate-45 z-0 border border-white/10 dark:border-white/5 transition-all"></div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default Hero;
