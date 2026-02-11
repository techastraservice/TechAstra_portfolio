import React from 'react';
import Navbar from './Navbar';
import Background3D from './Background3D';
import Hero from './Hero';
import About from './About';
import Features from './Features';
import Services from './Services';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';

const Home = () => {
    React.useEffect(() => {
        // Force scroll to top on page reload/mount
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="antialiased text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-black min-h-screen transition-colors duration-300 selection:bg-cyan-500 selection:text-white">
            <Background3D />
            <Navbar />
            <Hero />
            <About />
            <Features />
            <Services />
            <Projects />
            <Contact />
            <Footer />
        </div>
    );
};

export default Home;
