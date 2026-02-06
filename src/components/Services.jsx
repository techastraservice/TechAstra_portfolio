import React from 'react';
import { Globe, Smartphone, Brain, BarChart, GraduationCap } from 'lucide-react';

const services = [
    {
        icon: <Globe className="w-8 h-8 text-cyan-400" />,
        title: "Web Development",
        desc: "Modern, responsive websites built with cutting-edge technologies and stunning user experiences."
    },
    {
        icon: <Smartphone className="w-8 h-8 text-purple-400" />,
        title: "App Development",
        desc: "Native and cross-platform mobile applications with seamless performance."
    },
    {
        icon: <Brain className="w-8 h-8 text-pink-400" />,
        title: "AI/ML Projects",
        desc: "Intelligent solutions powered by machine learning and artificial intelligence."
    },
    {
        icon: <BarChart className="w-8 h-8 text-blue-400" />,
        title: "Digital Marketing",
        desc: "Data-driven marketing strategies for exponential growth and engagement."
    }

];

const Services = () => {
    return (
        <section id="services" className="py-20 relative bg-black/20">
            <div className="container">
                <div className="text-center mb-16">
                    <span className="text-cyan-400 font-medium tracking-wider uppercase text-sm">Services</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Transform Your Vision</h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        Comprehensive solutions that bring your ideas to life with cutting-edge technology and expert craftsmanship.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="glass-card group p-8">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
