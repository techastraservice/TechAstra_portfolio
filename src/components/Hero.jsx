import React from 'react';
import { ArrowRight, Play, TrendingUp } from 'lucide-react';
import logo from '../assets/techastra-logo.png';

import Reveal from './Reveal';
import { useProjects } from '../context/ProjectContext';
import TeamModal from './TeamModal';
import { database } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';

const Hero = () => {
    const { projects, totalVisits } = useProjects();
    const [isTeamModalOpen, setIsTeamModalOpen] = React.useState(false);
    const [approvedClientCount, setApprovedClientCount] = React.useState(0);

    React.useEffect(() => {
        const clientsRef = ref(database, 'site_stats/total_clients');
        const unsubscribe = onValue(clientsRef, (snapshot) => {
            if (snapshot.exists()) {
                setApprovedClientCount(snapshot.val());
            } else {
                setApprovedClientCount(0);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <>
            <section id="home" className="min-h-screen flex items-center relative overflow-hidden bg-gray-50 dark:bg-[#0d0d12] text-gray-900 dark:text-white pt-20 transition-colors duration-300">
                {/* Background Elements */}
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-500/10 dark:bg-purple-600/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-500/10 dark:bg-cyan-600/20 rounded-full blur-[120px] animate-pulse delay-700 pointer-events-none"></div>

                {/* Grid Pattern Overlay */}
                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
                    <Reveal>
                        <div className="space-y-8">


                            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                                Launch Your Project <br />
                                <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">With Confidence</span>
                            </h1>

                            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
                                Expert consultancy services that accelerate your business growth with cutting-edge technology solutions and proven methodologies.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4 relative z-20">
                                <a
                                    href="#contact"
                                    className="btn-primary"
                                >
                                    Start Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                                <a
                                    href="#projects"
                                    className="btn-secondary"
                                >
                                    View Work
                                </a>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-200 dark:border-white/5 relative z-20">
                                <div className="flex items-center gap-4 group relative z-20">
                                    <div className="w-full">
                                        <h4 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-200 mb-1">Rapid Deployment</h4>
                                        <p className="text-sm md:text-base text-gray-500">Solutions in record time</p>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center gap-4 group cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5 p-3 rounded-xl transition-all -ml-3 relative z-50 w-full"
                                    onClick={() => setIsTeamModalOpen(true)}
                                >
                                    <div className="w-full">
                                        <h4 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-200 mb-1">Expert Team</h4>
                                        <p className="text-sm md:text-base text-gray-500">Seasoned professionals</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={200}>
                        <div className="relative hidden md:block aspect-square max-w-lg mx-auto">
                            {/* Main Glass Card */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 rounded-full blur-[80px] animate-pulse"></div>

                            <div className="relative z-10 w-full h-full bg-white/60 dark:bg-white/5 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center transform hover:scale-[1.02] transition-transform duration-500 group">
                                {/* Inner Shimmer */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 dark:via-white/5 to-transparent skew-x-12 translate-x-[-150%] group-hover:animate-shimmer rounded-3xl overflow-hidden"></div>

                                <div className="relative w-48 h-48 mb-6">
                                    <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-500/30 blur-2xl rounded-full"></div>
                                    <img src={logo} alt="TechAstra Logo" className="w-full h-full object-contain relative z-10 drop-shadow-2xl" />
                                </div>

                                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-2">Tech Astra</h2>
                                <p className="text-sm text-cyan-600 dark:text-cyan-400 tracking-widest uppercase font-semibold">Innovate . Build . Scale</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white dark:bg-[#13131a] relative z-20">
                <div className="container mx-auto px-4">
                    <Reveal>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-white/10">
                            <div className="p-4 transition-transform hover:-translate-y-1 duration-300">
                                <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-2">{projects.length}+</h3>
                                <p className="text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wider text-sm">Total Projects</p>
                            </div>
                            <div className="p-4 transition-transform hover:-translate-y-1 duration-300">
                                <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-2">{totalVisits ? totalVisits.toLocaleString() : '0'}+</h3>
                                <p className="text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wider text-sm">Total Visits</p>
                            </div>
                            <div className="p-4 transition-transform hover:-translate-y-1 duration-300">
                                <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-2">{approvedClientCount > 0 ? approvedClientCount : '0'}+</h3>
                                <p className="text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wider text-sm">Total Clients</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <TeamModal
                isOpen={isTeamModalOpen}
                onClose={() => setIsTeamModalOpen(false)}
            />
        </>
    );
};

export default Hero;
