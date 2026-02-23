import React, { useEffect } from 'react';
import { X, Check, ArrowRight, Clock, DollarSign } from 'lucide-react';

const ServiceModal = ({ isOpen, onClose, service }) => {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !service) return null;

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 transition-colors">

                {/* Header */}
                <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-start justify-between bg-white/50 dark:bg-white/5 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">{service.title} services</h3>
                            <p className="text-cyan-600 dark:text-cyan-400 text-sm font-medium tracking-wide uppercase mt-1 transition-colors">Professional Solutions</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8 bg-gray-50 dark:bg-transparent transition-colors">
                    {/* Description */}
                    <div className="prose prose-invert max-w-none">
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed transition-colors">
                            {service.details?.description || service.desc}
                        </p>
                    </div>

                    {/* Technologies Grid */}
                    {service.details?.technologies && (
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2 transition-colors">
                                Technologies We Use
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Object.entries(service.details.technologies).map(([category, techString], idx) => (
                                    <div key={idx} className="bg-white dark:bg-white/5 rounded-xl p-4 border border-gray-200 dark:border-white/5 hover:border-cyan-500/30 transition-colors shadow-sm dark:shadow-none">
                                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-2 transition-colors">{category}</div>
                                        <div className="text-sm text-gray-800 dark:text-gray-200 font-medium transition-colors">{techString}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Our Services List */}
                        {service.details?.servicesList && (
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2 transition-colors">
                                    Our Services
                                </h4>
                                <ul className="space-y-3">
                                    {service.details.servicesList.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group">
                                            <span className="text-gray-600 dark:text-gray-300 text-sm transition-colors">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Key Features List */}
                        {service.details?.keyFeatures && (
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2 transition-colors">
                                    Key Features
                                </h4>
                                <ul className="space-y-3">
                                    {service.details.keyFeatures.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                                            <span className="text-gray-600 dark:text-gray-300 text-sm transition-colors">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer with Metadata */}
                <div className="p-6 border-t border-gray-100 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
                    <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                        {service.details?.timeline && (
                            <div className="flex items-center gap-2">
                                <span>Timeline: <span className="text-gray-900 dark:text-white font-medium transition-colors">{service.details.timeline}</span></span>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => {
                            onClose();
                            setTimeout(() => {
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                        }}
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 group"
                    >
                        Get Started
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceModal;
