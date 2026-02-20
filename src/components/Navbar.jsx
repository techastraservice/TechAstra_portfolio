import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/techastra-logo.png';

const Navbar = ({ isAuthenticated, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-white/80 dark:bg-[#0d0d12]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none' : 'py-6 bg-transparent'}`}>
            <div className="container flex justify-between items-center px-4 md:px-0">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="TechAstra Logo" className="w-10 h-10 md:w-14 md:h-14 object-contain" />
                    <span className="text-xl md:text-2xl font-bold tracking-tighter text-gray-900 dark:text-white transition-colors">
                        Tech<span className="text-cyan-600 dark:text-cyan-400 transition-colors">Astra</span>
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <ul className="flex gap-8 items-center text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors">
                        <li><a href="#home" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Home</a></li>
                        <li><a href="#services" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Services</a></li>
                        <li><a href="#projects" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Projects</a></li>
                        <li><a href="#about" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">About</a></li>
                    </ul>

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors text-gray-700 dark:text-white"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {isAuthenticated ? (
                        <button
                            onClick={onLogout}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 font-medium transition-colors shadow-lg shadow-red-500/20"
                        >
                            Sign Out
                        </button>
                    ) : (
                        <a href="#contact" className="btn-primary !rounded-none">Get Started</a>
                    )}
                </div>

                {/* Mobile Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors text-gray-700 dark:text-white"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button className="text-gray-900 dark:text-white" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#0d0d12] border-t border-gray-200 dark:border-gray-800 p-6 flex flex-col gap-4 animate-in slide-in-from-top-4 fade-in shadow-xl dark:shadow-none">
                    <a href="#home" onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-white text-lg font-medium">Home</a>
                    <a href="#services" onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-white text-lg font-medium">Services</a>
                    <a href="#projects" onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-white text-lg font-medium">Projects</a>
                    <a href="#about" onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-white text-lg font-medium">About</a>
                    {isAuthenticated ? (
                        <button
                            onClick={() => {
                                onLogout();
                                setIsOpen(false);
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium text-center mt-2 shadow-lg shadow-red-500/20"
                        >
                            Sign Out
                        </button>
                    ) : (
                        <a href="#contact" onClick={() => setIsOpen(false)} className="btn-primary text-center mt-2 !rounded-none">Get Started</a>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
