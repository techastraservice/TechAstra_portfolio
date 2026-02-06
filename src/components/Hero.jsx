import React from 'react';
import { ArrowRight, Play, Zap, Shield, TrendingUp, Cpu } from 'lucide-react';

const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
            <div className="container grid md:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-6">
                    <div className="inline-block px-4 py-2 rounded-full glass border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-4">
                        🚀 Accelerate Your Business Growth
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white">
                        Launch Your Project <br />
                        <span className="text-gradient">With Confidence</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
                        Expert consultancy services that accelerate your business growth with cutting-edge technology solutions and proven methodologies.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <a href="#contact" className="btn-primary flex items-center gap-2">
                            Start Now <ArrowRight size={18} />
                        </a>
                    </div>

                    <div className="grid grid-cols-2 gap-6 pt-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">
                                <Zap size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Rapid Deployment</h4>
                                <p className="text-xs text-gray-500">Solutions in record time</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                                <Shield size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Expert Team</h4>
                                <p className="text-xs text-gray-500">Seasoned professionals</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative hidden md:block">
                    {/* Abstract Glass shapes */}
                    <div className="relative w-full aspect-square">
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-full opacity-20 blur-3xl animate-pulse"></div>
                        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 glass rounded-3xl rotate-12 z-10 border border-white/10 flex items-center justify-center">
                            <div className="text-center p-6">
                                <span className="text-4xl font-bold text-white block mb-2">3+</span>
                                <span className="text-sm text-gray-400 uppercase tracking-widest">Years Experience</span>
                            </div>
                        </div>
                        <div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 glass rounded-full -rotate-12 z-20 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                            <div className="text-5xl">🚀</div>
                        </div>
                        <div className="absolute bottom-1/4 left-1/3 w-2/5 h-2/5 glass rounded-2xl rotate-45 z-0 border border-white/5"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
