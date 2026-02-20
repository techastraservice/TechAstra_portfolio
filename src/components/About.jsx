import React from 'react';


const About = () => {
    return (
        <section id="about" className="py-20 relative overflow-hidden bg-white dark:bg-transparent transition-colors duration-300">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-cyan-500/5 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-purple-500/5 blur-[120px] pointer-events-none"></div>

            <div className="container relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left Content */}
                    <div className="w-full lg:w-1/2">

                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight transition-colors">
                            Bridging the Gap Between <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-600">
                                Academia & Industry
                            </span>
                        </h2>

                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6 transition-colors">
                            Tech Astra is not your typical consultancy. We are a collective of the brightest student developers, designers, and innovators from top technical institutes.
                        </p>

                        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed transition-colors">
                            Fueled by ambition and unburdened by legacy thinking, we bring the latest academic cutting-edge technologies directly to your business. We offer a unique blend of professional-grade delivery with the fresh, energetic perspective that only a student-led team can provide.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4">
                                <div>
                                    <h4 className="text-gray-900 dark:text-white font-bold mb-1 transition-colors">Modern Tech Stack</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">We build with the tools of tomorrow, not yesterday.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div>
                                    <h4 className="text-gray-900 dark:text-white font-bold mb-1 transition-colors">Agile & Hungry</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">Driven to prove our skills through exceptional results.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div>
                                    <h4 className="text-gray-900 dark:text-white font-bold mb-1 transition-colors">Cost-Effective</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">Premium quality solutions without the corporate bloat.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Image/Visual */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl shadow-cyan-500/10 group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
                                alt="Student Team Collaborating"
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Floating Badge */}
                            <div className="absolute bottom-6 left-6 z-20 bg-white/90 dark:bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl max-w-xs shadow-lg">
                                <p className="text-gray-900 dark:text-white font-semibold text-sm">"Talent wins games, but teamwork and intelligence win championships."</p>
                                <p className="text-cyan-600 dark:text-cyan-400 text-xs mt-2 font-bold">— The Tech Astra Team</p>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500 rounded-full blur-[60px] opacity-20"></div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500 rounded-full blur-[60px] opacity-20"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
