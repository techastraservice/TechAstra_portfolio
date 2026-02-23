import React, { useEffect } from 'react';
import { X, Check, ArrowRight } from 'lucide-react';
import { services } from './Services';

const Pricing = ({ isOpen, onClose }) => {
    // Prevent body scroll when the full-screen pricing is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.scrollTo({ top: 0, behavior: 'instant' });
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-gray-50 dark:bg-[#0a0a0a] overflow-y-auto overflow-x-hidden transition-colors animate-in fade-in duration-500">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
            <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-500/5 blur-[120px] rounded-full pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-4 py-32 md:py-40 relative z-10">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-24">
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold tracking-widest uppercase text-sm transition-colors relative inline-block mb-4">
                        <span className="absolute -left-12 top-1/2 w-8 h-px bg-cyan-600 dark:bg-cyan-400"></span>
                        Investment
                        <span className="absolute -right-12 top-1/2 w-8 h-px bg-cyan-600 dark:bg-cyan-400"></span>
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mt-4 mb-8 tracking-tight transition-colors leading-tight">
                        Transparent Pricing for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">Premium Solutions</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-xl leading-relaxed mx-auto max-w-2xl transition-colors">
                        Choose the right engagement model for your next big idea. No hidden fees, just world-class engineering.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12 relative">
                    {services.map((service, index) => {
                        // Highlight some main services to make the design pop
                        const isHighlighted = service.title.includes("Web") || service.title.includes("App") || service.title.includes("Main Project");

                        return (
                            <div
                                key={index}
                                className={`group relative flex flex-col p-1 rounded-3xl transition-all duration-500 hover:-translate-y-2 ${isHighlighted
                                    ? 'bg-gradient-to-br from-cyan-500/30 via-purple-500/30 to-blue-500/30 shadow-2xl shadow-cyan-500/20'
                                    : 'bg-gradient-to-br from-gray-200 to-gray-100 dark:from-white/10 dark:to-white/5 hover:shadow-xl'
                                    }`}
                            >
                                <div className="h-full bg-white dark:bg-[#111116] rounded-[22px] p-8 md:p-10 flex flex-col transition-colors border border-transparent dark:border-white/5">
                                    {isHighlighted && (
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold uppercase tracking-wider py-1.5 px-6 rounded-full shadow-lg">
                                            Most Popular
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-cyan-500 transition-colors">{service.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed min-h-[60px] transition-colors">{service.desc}</p>
                                    </div>

                                    <div className="mb-10 pb-10 border-b border-gray-100 dark:border-white/10 transition-colors">
                                        <div className="flex items-baseline gap-2 mb-2">
                                            <span className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight transition-colors">
                                                {(service.details?.pricing || 'Custom Quote').replace('Starting at ', '').replace('+', '')}
                                            </span>
                                            {(service.details?.pricing || '').includes('+') && (
                                                <span className="text-xl font-bold text-cyan-500">+</span>
                                            )}
                                        </div>
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize bg-gray-100 dark:bg-white/5 inline-block py-1 px-3 rounded-full transition-colors">
                                            {service.details.timeline} Timeline
                                        </div>
                                    </div>

                                    <div className="flex-1 mb-10">
                                        <p className="font-semibold text-gray-900 dark:text-white mb-6 transition-colors">What's included:</p>
                                        <ul className="space-y-4">
                                            {service.details.keyFeatures.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center">
                                                        <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" strokeWidth={3} />
                                                    </div>
                                                    <span className="text-gray-700 dark:text-gray-300 text-sm font-medium transition-colors">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <button
                                        onClick={() => {
                                            onClose();
                                            setTimeout(() => {
                                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                            }, 100);
                                        }}
                                        className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all duration-300 group/btn ${isHighlighted
                                            ? 'bg-gray-900 hover:bg-black dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white shadow-lg shadow-cyan-500/25'
                                            : 'bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-transparent'
                                            }`}
                                    >
                                        Select Plan
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer Inside Overlay */}
            <div className="py-12 text-center border-t border-gray-200 dark:border-white/5 mt-12 bg-white/30 dark:bg-[#0a0a0a]/30 backdrop-blur-md transition-colors relative z-10">
                <p className="text-gray-500 dark:text-gray-400">Need a custom enterprise solution?</p>
                <button
                    onClick={() => {
                        onClose();
                        setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
                    }}
                    className="mt-4 text-cyan-600 dark:text-cyan-400 font-bold hover:underline inline-flex items-center gap-2"
                >
                    Contact our sales team <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default Pricing;
