import React from 'react';
import { Mail, MapPin, Phone, Send, ExternalLink } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-20 relative bg-gray-50 dark:bg-transparent transition-colors duration-300">
            <div className="container">
                <div className="grid md:grid-cols-2 gap-12 bg-white dark:bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-none transition-colors">

                    <div className="flex flex-col justify-center">
                        <span className="text-cyan-600 dark:text-cyan-400 font-medium tracking-wider uppercase text-sm transition-colors mb-2">Contact Us</span>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">Let's Start a Conversation</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-12 leading-relaxed transition-colors text-lg">
                            Share your project details and we'll provide you with a customized solution strategy. Ready to accelerate your business growth?
                        </p>

                        <div className="flex items-center gap-8">
                            <a
                                href="mailto:contactus.techastra@gmail.com"
                                className="group relative"
                                aria-label="Email Us"
                            >
                                <div className="absolute inset-0 bg-cyan-500/20 rounded-2xl blur-xl group-hover:bg-cyan-500/40 transition-colors opacity-0 group-hover:opacity-100 duration-500" />
                                <div className="relative w-20 h-20 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-110 group-hover:border-cyan-500/50 group-hover:text-cyan-500 transition-all duration-300 shadow-lg shadow-cyan-500/5">
                                    <Mail className="w-8 h-8" />
                                </div>
                                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Email</span>
                            </a>

                            <a
                                href="tel:+917483334990"
                                className="group relative"
                                aria-label="Call Us"
                            >
                                <div className="absolute inset-0 bg-purple-500/20 rounded-2xl blur-xl group-hover:bg-purple-500/40 transition-colors opacity-0 group-hover:opacity-100 duration-500" />
                                <div className="relative w-20 h-20 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 group-hover:border-purple-500/50 group-hover:text-purple-500 transition-all duration-300 shadow-lg shadow-purple-500/5">
                                    <Phone className="w-8 h-8" />
                                </div>
                                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Call</span>
                            </a>

                            <div className="group relative cursor-default">
                                <div className="absolute inset-0 bg-pink-500/20 rounded-2xl blur-xl group-hover:bg-pink-500/40 transition-colors opacity-0 group-hover:opacity-100 duration-500" />
                                <div className="relative w-20 h-20 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-pink-600 dark:text-pink-400 group-hover:scale-110 group-hover:border-pink-500/50 group-hover:text-pink-500 transition-all duration-300 shadow-lg shadow-pink-500/5">
                                    <MapPin className="w-8 h-8" />
                                </div>
                                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Visit</span>
                            </div>
                        </div>
                    </div>

                    <form className="space-y-6 bg-gray-50 dark:bg-black/20 p-6 rounded-2xl border border-gray-200 dark:border-white/5 transition-colors">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-700 dark:text-gray-300 transition-colors">Name</label>
                                <input type="text" className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors" placeholder="Your Name" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-700 dark:text-gray-300 transition-colors">Email</label>
                                <input type="email" className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors" placeholder="your@email.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-700 dark:text-gray-300 transition-colors">Subject</label>
                            <input type="text" className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors" placeholder="Project Discussion" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-700 dark:text-gray-300 transition-colors">Message</label>
                            <textarea rows="4" className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors" placeholder="Tell us about your project..."></textarea>
                        </div>

                        <button type="button" className="w-full btn-primary flex items-center justify-center gap-2">
                            Send Message <Send size={18} />
                        </button>
                    </form>

                </div>
            </div>
        </section>
    );
};

export default Contact;
