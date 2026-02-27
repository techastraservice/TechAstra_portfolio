import React, { useEffect } from 'react';
import { X, Check, ArrowRight } from 'lucide-react';
import { services } from './Services';

const Pricing = ({ isOpen, onClose }) => {
    const [category, setCategory] = React.useState('business');

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

    // Categorize services
    const businessServices = services.slice(0, 4);
    const academicServices = services.slice(4, 9); // Covers both project and research/report tiers
    const displayedServices = category === 'business' ? businessServices : academicServices;

    return (
        <div className="fixed inset-0 z-[120] bg-white dark:bg-black overflow-y-auto overflow-x-hidden animate-in fade-in duration-500 selection:bg-cyan-500/30">
            {/* Minimal Background Accents */}
            <div className="absolute top-0 right-0 w-full h-[600px] bg-cyan-500/5 dark:bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-full h-[600px] bg-purple-500/5 dark:bg-purple-500/10 blur-[120px] rounded-full pointer-events-none transform -translate-x-1/2 translate-y-1/2 opacity-50"></div>

            {/* Close Button */}
            <button 
                onClick={onClose}
                className="fixed top-8 right-8 z-[130] p-3 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all focus:outline-none backdrop-blur-md border border-black/5 dark:border-white/5"
            >
                <X size={24} />
            </button>

            <div className="container mx-auto px-6 py-12 md:py-24 relative z-10 flex flex-col items-center min-h-screen">
                {/* Header Section */}
                <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16 pt-8">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
                        Choose your path
                    </h1>
                    
                    {/* Category Selector Tabs */}
                    <div className="inline-flex p-1.5 bg-gray-100 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 shadow-xl">
                        <button 
                            onClick={() => setCategory('business')}
                            className={`px-8 md:px-10 py-2.5 md:py-3 rounded-xl text-sm font-bold transition-all duration-300 ${category === 'business' ? 'bg-white dark:bg-white text-black shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5'}`}
                        >
                            Business
                        </button>
                        <button 
                            onClick={() => setCategory('academic')}
                            className={`px-8 md:px-10 py-2.5 md:py-3 rounded-xl text-sm font-bold transition-all duration-300 ${category === 'academic' ? 'bg-white dark:bg-white text-black shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5'}`}
                        >
                            Academic
                        </button>
                    </div>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative max-w-7xl w-full mx-auto pb-12">
                    {displayedServices.map((service, index) => {
                        const isHighlighted = service.title.includes("Web") || service.title.includes("App") || service.title.includes("Main Project");

                        return (
                            <div
                                key={index}
                                className={`flex flex-col rounded-3xl p-6 md:p-7 transition-all duration-500 group relative ${
                                    isHighlighted 
                                    ? 'bg-gray-50 dark:bg-[#121218] ring-1 ring-gray-200 dark:ring-white/20 hover:ring-gray-300 dark:hover:ring-white/40 shadow-2xl scale-[1.02] z-20' 
                                    : 'bg-white dark:bg-[#0a0a0f] border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10'
                                }`}
                            >
                                {isHighlighted && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full text-[10px] font-black text-white uppercase tracking-widest shadow-lg opacity-90 group-hover:opacity-100 transition-opacity">
                                        Pro Tier
                                    </div>
                                )}

                                <div className="flex flex-col h-full">
                                    <div className="mb-6">
                                        <h3 className={`text-xl font-bold mb-2 tracking-tight ${isHighlighted ? 'text-gray-900 dark:text-white' : 'text-gray-800 dark:text-gray-200'}`}>
                                            {service.title}
                                        </h3>
                                        <div className="flex items-baseline gap-1.5 mb-4 items-center">
                                            <span className="text-2xl font-black text-gray-900 dark:text-white">
                                                {service.details?.pricing?.includes('Rs.') 
                                                    ? service.details.pricing.split('+')[0] 
                                                    : service.details?.pricing || 'Quote'}
                                            </span>
                                            {service.details?.pricing?.includes('Rs.') && (
                                                <span className="text-gray-500 dark:text-gray-500 text-[10px] uppercase font-bold tracking-widest">Base</span>
                                            )}
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed min-h-[48px] line-clamp-3 group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors">
                                            {service.desc}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => {
                                            onClose();
                                            setTimeout(() => {
                                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                            }, 200);
                                        }}
                                        className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm transition-all duration-300 mb-8 border border-gray-100 dark:border-white/5 active:scale-95 ${
                                            isHighlighted 
                                            ? 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 shadow-xl' 
                                            : 'bg-black/5 dark:bg-white/5 text-gray-900 dark:text-white hover:bg-black/10 dark:hover:bg-white/10'
                                        }`}
                                    >
                                        Select Plan
                                    </button>

                                    <div className="mt-auto">
                                        <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-5 border-b border-gray-100 dark:border-white/5 pb-2">Includes</p>
                                        <ul className="space-y-4">
                                            {service.details.keyFeatures.slice(0, 5).map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3 group/item">
                                                    <div className={`mt-0.5 flex-shrink-0 p-0.5 rounded-full transition-colors ${isHighlighted ? 'bg-cyan-100 dark:bg-cyan-500/10' : 'bg-gray-100 dark:bg-white/5'}`}>
                                                        <Check size={12} className={isHighlighted ? 'text-cyan-600 dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500'} />
                                                    </div>
                                                    <span className="text-gray-600 dark:text-gray-400 text-[11px] leading-snug group-hover/item:text-gray-800 dark:group-hover/item:text-gray-300 transition-colors">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Simplified Footer */}
                <div className="w-full max-w-4xl border-t border-gray-100 dark:border-white/5 mt-auto pt-10 pb-12 text-center">
                    <p className="text-gray-500 dark:text-gray-500 text-sm font-medium">Need a bespoke enterprise quote?</p>
                    <button
                        onClick={() => {
                            onClose();
                            setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 200);
                        }}
                        className="mt-3 group inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 text-sm font-bold transition-all underline underline-offset-8"
                    >
                        Contact Strategic Sales Team
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
