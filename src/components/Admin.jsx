import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Logo from '../assets/techastra-logo.png';
import { auth, googleProvider } from '../firebaseConfig';
import AgreementGenerator from './admin/AgreementGenerator';
import ClientManager from './admin/ClientManager';
import TeamManager from './admin/TeamManager';
import ProjectManager from './admin/ProjectManager';
import DashboardOverview from './admin/DashboardOverview';
import { FileText, Users, UserPlus, FolderKanban } from 'lucide-react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoading(false); // Stop loading immediately to show state

            if (user) {
                const allowedEmails = [
                    "vivekvernekar02@gmail.com",
                    "shivarajmani2005@gmail.com",
                    "contactus.techastra@gmail.com"
                ];

                if (user.email && allowedEmails.includes(user.email.toLowerCase())) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    // Do NOT sign out immediately, so we can show the error screen
                }
            } else {
                setIsAuthenticated(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error(`Popup Error: ${error.code} - ${error.message}`);
            alert(`Login Failed: ${error.code} - ${error.message}`);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                    <p className="text-cyan-500 font-mono tracking-widest animate-pulse">INITIALIZING...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        const currentUser = auth.currentUser;

        return (
            <div className="min-h-screen bg-[#050505] text-gray-100 flex flex-col relative overflow-hidden font-sans">
                {/* Cyber Grid Background */}
                <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

                {/* Ambient Glows */}
                <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-purple-600/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-cyan-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>

                <div className="flex-grow flex items-center justify-center px-4 relative z-10">
                    <div className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500">
                        {/* Scanning Line Effect */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>

                        <div className="flex flex-col items-center mb-8">
                            <div className="w-20 h-20 mb-6 relative group-hover:scale-110 transition-transform duration-500">
                                <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse"></div>
                                <img src={Logo} alt="Tech Astra" className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                            </div>
                            <h2 className="text-3xl font-bold text-center text-white tracking-wider font-mono">
                                ADMIN<span className="text-cyan-400">.PORTAL</span>
                            </h2>
                            <p className="text-cyan-500/60 text-xs mt-2 font-mono tracking-[0.2em]">SECURE GATEWAY v2.0</p>
                        </div>

                        {currentUser ? (
                            <div className="flex flex-col gap-4 text-center">
                                <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg backdrop-blur-md">
                                    <h3 className="text-red-400 font-bold text-sm uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                                        <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                                        Access Denied
                                    </h3>
                                    <p className="text-gray-400 text-xs font-mono mb-1">IDENTIFIED USER:</p>
                                    <p className="text-white font-mono font-bold text-sm bg-black/30 py-1 px-2 rounded border border-white/5">{currentUser.email}</p>
                                    <p className="text-red-400/80 text-[10px] mt-2 font-mono uppercase">Authorization Level: INSUFFICIENT</p>
                                </div>
                                <button
                                    onClick={() => signOut(auth)}
                                    className="w-full py-3 px-6 bg-red-600/10 hover:bg-red-600/20 text-red-500 hover:text-red-400 border border-red-600/30 hover:border-red-500 font-mono text-sm tracking-wider rounded-lg transition-all flex items-center justify-center gap-3 group/btn"
                                >
                                    <span className="group-hover/btn:translate-x-1 transition-transform">TERMINATE SESSION</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 justify-center w-full">
                                <button
                                    onClick={handleGoogleLogin}
                                    className="w-full py-4 px-6 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-medium tracking-wide rounded-xl transition-all shadow-lg flex items-center justify-center gap-4 group/google overflow-hidden relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover/google:animate-[shimmer_1s_infinite]"></div>
                                    <svg className="w-5 h-5 transition-transform group-hover/google:scale-110" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    <span>Sign in with Google</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="absolute bottom-4 w-full text-center text-gray-500 text-[10px] font-mono tracking-widest z-10">
                    SYSTEM STATUS: NORMAL
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-gray-100 flex font-sans overflow-hidden">
            {/* Background Assets */}
            <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
            <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50"></div>

            {/* Sidebar */}
            <aside className="w-64 bg-[#0a0a0f] border-r border-white/5 flex flex-col z-20 hidden md:flex">
                <div className="p-6 border-b border-white/5 flex items-center gap-3">
                    <div className="w-8 h-8 relative">
                        <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-full"></div>
                        <img src={Logo} alt="TechAstra" className="w-full h-full object-contain relative" />
                    </div>
                    <span className="font-bold text-lg tracking-wide text-white">TECH<span className="text-cyan-400">ASTRA</span></span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <div className="text-xs font-mono text-gray-500 mb-4 px-2 tracking-widest">MAIN MENU</div>
                    <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${activeTab === 'dashboard' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'text-gray-400 hover:text-white hover:bg-white/5 border-transparent'}`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        <span className="font-medium">Dashboard</span>
                    </button>
                    <button onClick={() => setActiveTab('agreements')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${activeTab === 'agreements' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'text-gray-400 hover:text-white hover:bg-white/5 border-transparent'}`}>
                        <FileText className="w-5 h-5" />
                        <span className="font-medium">Agreements</span>
                    </button>
                    <button onClick={() => setActiveTab('clients')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${activeTab === 'clients' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'text-gray-400 hover:text-white hover:bg-white/5 border-transparent'}`}>
                        <Users className="w-5 h-5" />
                        <span className="font-medium">Clients</span>
                    </button>
                    <button onClick={() => setActiveTab('team')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${activeTab === 'team' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'text-gray-400 hover:text-white hover:bg-white/5 border-transparent'}`}>
                        <UserPlus className="w-5 h-5" />
                        <span className="font-medium">Team</span>
                    </button>
                    <button onClick={() => setActiveTab('projects')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${activeTab === 'projects' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'text-gray-400 hover:text-white hover:bg-white/5 border-transparent'}`}>
                        <FolderKanban className="w-5 h-5" />
                        <span className="font-medium">Projects</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button onClick={() => signOut(auth)} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        <span className="font-medium">Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
                {/* Top Header */}
                <header className="h-16 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md flex items-center justify-between px-8 z-10">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="text-white font-medium">Dashboard</span>
                        <span>/</span>
                        <span className="text-cyan-400">
                            {activeTab === 'dashboard' ? 'Overview' :
                                activeTab === 'agreements' ? 'Agreement Generator' :
                                    activeTab === 'team' ? 'Team Management' :
                                        activeTab === 'projects' ? 'Project Management' :
                                            'Client Management'}
                        </span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-bold text-white uppercase tracking-wider">Admin User</span>
                            <span className="text-[10px] text-cyan-500 font-mono tracking-widest">LEVEL 5 CLEARANCE</span>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px]">
                            <div className="w-full h-full bg-[#0a0a0f] rounded-lg flex items-center justify-center">
                                <span className="font-bold text-white">AU</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="flex-1 overflow-y-auto p-8 relative">
                    {activeTab === 'agreements' ? (
                        <AgreementGenerator />
                    ) : activeTab === 'clients' ? (
                        <ClientManager />
                    ) : activeTab === 'team' ? (
                        <TeamManager />
                    ) : activeTab === 'projects' ? (
                        <ProjectManager />
                    ) : (
                        <DashboardOverview />
                    )}
                </div>
            </main>
        </div>
    );

};

export default Admin;
