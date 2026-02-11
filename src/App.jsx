import React from 'react';
import Navbar from './components/Navbar';
import Background3D from './components/Background3D';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Services from './components/Services';
import Projects from './components/Projects';
// import BlogPreview from './components/BlogPreview';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  React.useEffect(() => {
    // Force scroll to top on page reload/mount to avoid starting at lower sections
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
      {/* <BlogPreview /> */}
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
