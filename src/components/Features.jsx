import React, { useState } from 'react';
import { X } from 'lucide-react';

const features = [
    {
        title: "Rapid Deployment",
        desc: "Accelerate your projects with our rapid deployment capabilities. Get your solutions up and running in record time without compromising quality.",
        details: "Our proprietary agile framework and CI/CD pipelines allow us to ship production-ready code faster than the industry average. We utilize automated testing, containerization, and microservices architectures to ensure that every release is stable, scalable, and deployed with zero downtime. From concept to launch, we minimize friction and maximize velocity."
    },
    {
        title: "Expert Team",
        desc: "Work with seasoned professionals who bring years of experience and proven methodologies to every project engagement.",
        details: "Our team consists of senior engineers, industry-vetted architects, and design thinkers who have worked with Fortune 500 companies. We don't just write code; we partner with you to solve complex business challenges. With continuous learning embedded in our culture, we bring the latest and most effective tech stacks to your project."
    },
    {
        title: "Cost Efficiency",
        desc: "Maximize your ROI with our streamlined processes and efficient resource allocation. Quality solutions that fit your budget.",
        details: "We optimize cloud infrastructure and development resources to ensure you get the most out of your budget. By identifying bottlenecks and eliminating wasteful processes, we reduce operational costs while increasing performance. Our focus is on long-term value, ensuring that your software asset remains profitable and maintainable."
    },
    {
        title: "AI Integration",
        desc: "Leverage cutting-edge artificial intelligence to transform your business processes and gain a competitive advantage.",
        details: "From predictive analytics to Large Language Model (LLM) fine-tuning, we integrate smart AI solutions tailored to your specific needs. We help you automate repetitive tasks, uncover data-driven insights, and build personalized user experiences that drive engagement and retention in an AI-first world."
    }
];

const Features = () => {
    const [selectedFeature, setSelectedFeature] = useState(null);

    // Prevent body scroll when modal is open
    React.useEffect(() => {
        if (selectedFeature) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedFeature]);

    return (
        <section className="py-20 relative bg-gray-50 dark:bg-transparent transition-colors duration-300">
            <div className="container">
                <div className="mb-16 text-center md:text-left">
                    <span className="text-cyan-600 dark:text-cyan-400 font-medium tracking-wider uppercase text-sm transition-colors">Why Choose Us</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2 leading-tight transition-colors">
                        Accelerate Your <br />
                        <span className="text-gradient">Digital Transformation</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl leading-relaxed transition-colors">
                        Our comprehensive suite of services delivers innovative solutions that drive growth, efficiency, and competitive advantage.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="glass p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border border-gray-200 dark:border-white/5 flex flex-col items-start h-full bg-white/50 dark:bg-white/5 backdrop-blur-sm shadow-sm dark:shadow-none">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-grow transition-colors">
                                {feature.desc}
                            </p>
                            <button
                                onClick={() => setSelectedFeature(feature)}
                                className="inline-block mt-auto text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 font-medium cursor-pointer hover:translate-x-1 transition-transform"
                            >
                                Learn more →
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Glassmorphism Modal Overlay */}
            {selectedFeature && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setSelectedFeature(null)}
                    ></div>
                    <div className="relative w-full max-w-lg md:p-8 p-6 animate-in slide-in-from-bottom-4 fade-in duration-300 bg-white dark:bg-[#0d0d12] backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10">
                        <button
                            onClick={() => setSelectedFeature(null)}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex items-center gap-4 mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">{selectedFeature.title}</h3>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 transition-colors">Overview</h4>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors">
                                {selectedFeature.desc}
                            </p>

                            <h4 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 pt-2 transition-colors">Key Benefits</h4>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors">
                                {selectedFeature.details}
                            </p>

                            <button
                                onClick={() => setSelectedFeature(null)}
                                className="w-full btn-primary mt-6 text-center"
                            >
                                Close Details
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Features;
