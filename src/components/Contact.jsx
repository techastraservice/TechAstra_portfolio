import React from 'react';
import { Mail, MapPin, Phone, Send, ExternalLink } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-20 relative">
            <div className="container">
                <div className="grid md:grid-cols-2 gap-12 bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">

                    <div>
                        <span className="text-cyan-400 font-medium tracking-wider uppercase text-sm">Contact Us</span>
                        <h2 className="text-4xl font-bold text-white mt-2 mb-6">Let's Start a Conversation</h2>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            Share your project details and we'll provide you with a customized solution strategy. Ready to accelerate your business growth?
                        </p>

                        <div className="space-y-6">
                            <a href="mailto:contactus.techastra@gmail.com" className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                                    <Mail />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">Email Us</h4>
                                    <p className="text-gray-400 group-hover:text-cyan-400 transition-colors">contactus.techastra@gmail.com</p>
                                </div>
                            </a>

                            <a href="tel:+917483334990" className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                    <Phone />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">Call Us</h4>
                                    <p className="text-gray-400 group-hover:text-purple-400 transition-colors">+91 7483334990</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-pink-400">
                                    <MapPin />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">Visit Us</h4>
                                    <p className="text-gray-400">Bangalore, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form className="space-y-6 bg-black/20 p-6 rounded-2xl border border-white/5">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-300">Name</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors" placeholder="Your Name" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-300">Email</label>
                                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors" placeholder="your@email.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-300">Subject</label>
                            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors" placeholder="Project Discussion" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-300">Message</label>
                            <textarea rows="4" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors" placeholder="Tell us about your project..."></textarea>
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
