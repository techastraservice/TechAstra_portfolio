import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-4' : 'py-6 bg-transparent'}`}>
            <div className="container flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <Rocket className="text-white w-5 h-5" />
                    </div>
                    <span className="text-2xl font-bold tracking-tighter text-white">
                        Tech<span className="text-cyan-400">Astra</span>
                    </span>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 items-center text-sm font-medium text-gray-300">
                    <li><a href="#home" className="hover:text-cyan-400 transition-colors">Home</a></li>
                    <li><a href="#services" className="hover:text-cyan-400 transition-colors">Services</a></li>
                    <li><a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a></li>
                    <li><a href="#about" className="hover:text-cyan-400 transition-colors">About</a></li>
                    <li><a href="#contact" className="btn-primary">Get Started</a></li>
                </ul>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full glass border-t border-gray-800 p-6 flex flex-col gap-4 animate-in slide-in-from-top-4 fade-in">
                    <a href="#home" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">Home</a>
                    <a href="#services" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">Services</a>
                    <a href="#projects" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">Projects</a>
                    <a href="#contact" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">Contact</a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
