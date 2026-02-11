import React from 'react';
import { Mail, MapPin, Phone, Send, ExternalLink } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-20 relative bg-gray-50 dark:bg-transparent transition-colors duration-300">
            <div className="container">
                <div className="grid md:grid-cols-2 gap-12 bg-white dark:bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-none transition-colors">

                    <div>
                        <span className="text-cyan-600 dark:text-cyan-400 font-medium tracking-wider uppercase text-sm transition-colors">Contact Us</span>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-6 transition-colors">Let's Start a Conversation</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed transition-colors">
                            Share your project details and we'll provide you with a customized solution strategy. Ready to accelerate your business growth?
                        </p>

                        <div className="space-y-6">
                            <a href="mailto:contactus.techastra@gmail.com" className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-cyan-50 dark:bg-white/5 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                                    <Mail />
                                </div>
                                <div>
                                    <h4 className="text-gray-900 dark:text-white font-medium transition-colors">Email Us</h4>
                                    <p className="text-gray-600 dark:text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">contactus.techastra@gmail.com</p>
                                </div>
                            </a>

                            <a href="tel:+917483334990" className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-white/5 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                    <Phone />
                                </div>
                                <div>
                                    <h4 className="text-gray-900 dark:text-white font-medium transition-colors">Call Us</h4>
                                    <p className="text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">+91 7483334990</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-pink-50 dark:bg-white/5 flex items-center justify-center text-pink-600 dark:text-pink-400 transition-colors">
                                    <MapPin />
                                </div>
                                <div>
                                    <h4 className="text-gray-900 dark:text-white font-medium transition-colors">Visit Us</h4>
                                    <p className="text-gray-600 dark:text-gray-400 transition-colors">Bangalore, India</p>
                                </div>
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
