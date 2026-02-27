import React, { useState, useEffect } from 'react';
import { Linkedin, Github, X } from 'lucide-react';
import logo from '../assets/techastra-logo.png';

const policyContent = {
    privacy: {
        title: "Privacy Policy",
        updated: "February 28, 2026",
        sections: [
            {
                heading: "Information We Collect",
                items: [
                    "Name, email, phone number, and company name you provide via forms",
                    "Project requirements and technical details shared with us",
                    "Billing and payment information for contracted services",
                    "IP address, browser type, device info, and pages visited (collected automatically)",
                    "Cookies and similar tracking data"
                ]
            },
            {
                heading: "How We Use It",
                items: [
                    "Deliver and improve our services (Web Dev, App Dev, AI/ML, Digital Marketing)",
                    "Communicate about project updates, proposals, and deliverables",
                    "Process payments and manage billing",
                    "Analyze website traffic and improve user experience",
                    "Comply with legal obligations"
                ]
            },
            {
                heading: "Data Protection",
                items: [
                    "SSL/TLS encryption on all data in transit",
                    "Secure cloud infrastructure via Firebase",
                    "Access restricted to authorized team members only",
                    "Regular security audits and vulnerability checks"
                ]
            },
            {
                heading: "Sharing",
                items: [
                    "We do not sell or rent your data",
                    "Shared only with service providers (payment processors, hosting) as needed",
                    "Disclosed when required by law or to protect our rights"
                ]
            },
            {
                heading: "Your Rights",
                items: [
                    "Access, correct, or delete your personal data",
                    "Opt out of marketing emails at any time",
                    "Request a copy of your data in a portable format",
                    "Object to processing in certain cases"
                ]
            },
            {
                heading: "Data Retention",
                items: [
                    "Project data: duration of project + 2 years",
                    "Communications: up to 3 years after last interaction",
                    "Analytics: anonymized, up to 26 months",
                    "Payment records: as required by tax regulations"
                ]
            },
            {
                heading: "Contact",
                text: "For questions, email contactus.techastra@gmail.com or call +91 7483334990."
            }
        ]
    },
    terms: {
        title: "Terms of Service",
        updated: "February 28, 2026",
        sections: [
            {
                heading: "Services We Offer",
                items: [
                    "Web Development — custom websites, web apps, e-commerce, landing pages",
                    "App Development — native and cross-platform mobile apps",
                    "AI/ML Projects — data analysis, predictive models, NLP, computer vision",
                    "Digital Marketing — SEO, social media, content strategy, ad campaigns",
                    "UI/UX Design — interfaces, prototyping, and design systems",
                    "Technical Consultancy — architecture, code reviews, tech strategy"
                ],
                note: "Scope, deliverables, and pricing are defined in a separate project proposal before work begins."
            },
            {
                heading: "Client Responsibilities",
                items: [
                    "Provide complete and accurate project information on time",
                    "Respond to feedback requests and approvals promptly",
                    "Designate a primary point of contact",
                    "Ensure provided content doesn't infringe third-party rights",
                    "Make payments per the agreed schedule",
                    "Do not use our services for unlawful purposes"
                ]
            },
            {
                heading: "Payment Terms",
                items: [
                    "30–50% upfront deposit to start work",
                    "Milestone-based payments as outlined in the proposal",
                    "Final payment due upon project completion",
                    "Invoices due within 15 days; late payments incur 2%/month fee",
                    "Work may be paused until outstanding payments are cleared",
                    "Initial deposit is non-refundable once work begins"
                ]
            },
            {
                heading: "Intellectual Property",
                items: [
                    "Client owns all custom deliverables upon full payment",
                    "Tech Astra retains rights to pre-existing tools, libraries, and reusable components",
                    "We may showcase completed work in our portfolio unless you opt out in writing"
                ]
            },
            {
                heading: "Liability",
                items: [
                    "Our total liability is limited to the amount paid for the specific service",
                    "We are not liable for indirect or consequential damages",
                    "Not responsible for third-party failures (hosting, APIs, etc.)"
                ]
            },
            {
                heading: "Termination",
                items: [
                    "Either party may terminate with written notice",
                    "Client pays for all work completed up to termination date",
                    "We may terminate if payments are overdue or terms are breached",
                    "Completed deliverables released upon settling outstanding payments"
                ]
            },
            {
                heading: "Timelines",
                items: [
                    "Estimates are based on info available at proposal time",
                    "Delays from scope changes, late feedback, or unforeseen complexity may adjust timelines",
                    "Scope changes may require a revised proposal with updated pricing"
                ]
            },
            {
                heading: "Governing Law",
                items: [
                    "Governed by the laws of India",
                    "Disputes resolved through negotiation, then mediation, then arbitration",
                    "Courts of Karnataka, India have exclusive jurisdiction"
                ]
            },
            {
                heading: "Contact",
                text: "Questions? Email contactus.techastra@gmail.com or call +91 7483334990."
            }
        ]
    },
    cookies: {
        title: "Cookie Policy",
        updated: "February 28, 2026",
        sections: [
            {
                heading: "What Are Cookies?",
                items: [
                    "Small text files stored on your device when you visit a website",
                    "Can be first-party (set by us) or third-party (set by external services)",
                    "Session cookies expire when you close your browser; persistent cookies remain for a set period"
                ]
            },
            {
                heading: "Essential Cookies",
                note: "Required — cannot be disabled",
                items: [
                    "Session management and page navigation",
                    "CSRF protection for form security",
                    "Admin panel authentication",
                    "Storing your cookie consent preference"
                ]
            },
            {
                heading: "Analytics Cookies",
                items: [
                    "Google Analytics — tracks page views, session duration, and visitor demographics",
                    "Firebase Analytics — monitors app usage and events",
                    "Data is anonymized and used to improve site performance"
                ]
            },
            {
                heading: "Marketing Cookies",
                items: [
                    "Track conversions from ads (Facebook Pixel, Google Ads, LinkedIn)",
                    "Help display relevant advertisements on other platforms",
                    "Build a profile of your interests based on browsing activity"
                ]
            },
            {
                heading: "Preference Cookies",
                items: [
                    "Remember your dark/light theme choice",
                    "Store language and regional preferences",
                    "Save notification display settings"
                ]
            },
            {
                heading: "Other Tracking Technologies",
                items: [
                    "Web beacons (pixel tags) — track page and email opens",
                    "Local storage — saves preferences and improves performance",
                    "Firebase SDK — used for analytics, auth, and real-time data sync"
                ]
            },
            {
                heading: "Managing Cookies",
                items: [
                    "Adjust cookie settings in your browser preferences",
                    "Use opt-out tools: Google Analytics Opt-out, Facebook Ad Preferences",
                    "Blocking cookies may affect site functionality",
                    "We honor Do Not Track browser signals"
                ]
            },
            {
                heading: "Contact",
                text: "Questions about cookies? Email contactus.techastra@gmail.com or call +91 7483334990."
            }
        ]
    }
};

const PolicyModal = ({ isOpen, onClose, policyKey }) => {
    const policy = policyContent[policyKey];

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen || !policy) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className="relative w-full max-w-2xl max-h-[85vh] bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col animate-in zoom-in-95 fade-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-white/10 flex-shrink-0">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{policy.title}</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Last Updated: {policy.updated}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="btn-icon-only"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto px-6 py-6 space-y-6 text-[14px] leading-relaxed text-gray-700 dark:text-gray-300">
                    {policy.sections.map((section, index) => (
                        <div key={index}>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 uppercase tracking-wide">
                                {section.heading}
                            </h3>
                            {section.note && (
                                <p className="text-xs text-gray-500 dark:text-gray-500 italic mb-2">{section.note}</p>
                            )}
                            {section.items && (
                                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                                    {section.items.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            )}
                            {section.text && (
                                <p className="text-gray-600 dark:text-gray-400">{section.text}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Footer = () => {
    const [activePolicy, setActivePolicy] = useState(null);

    return (
        <>
            <footer className="relative border-t border-gray-200 dark:border-white/10 bg-white/90 dark:bg-black/40 backdrop-blur-md pt-20 pb-10 overflow-hidden transition-colors duration-300">
                {/* Background Decorations */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
                    <h1 className="text-[15vw] font-bold text-transparent bg-clip-text bg-gradient-to-b from-purple-500/60 dark:from-purple-500/60 via-cyan-500/40 dark:via-cyan-500/40 to-transparent tracking-tighter leading-none opacity-100 transition-colors">
                        Tech Astra
                    </h1>
                </div>
                <div className="absolute top-0 left-1/4 w-full h-full bg-gradient-to-tr from-purple-500/5 dark:from-purple-500/10 to-transparent blur-[80px] pointer-events-none z-0 transition-opacity"></div>
                <div className="absolute bottom-0 right-1/4 w-full h-full bg-gradient-to-bl from-cyan-500/5 dark:from-cyan-500/10 to-transparent blur-[80px] pointer-events-none z-0 transition-opacity"></div>

                <div className="container relative z-10">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <img src={logo} alt="TechAstra Logo" className="w-10 h-10 object-contain" />
                                <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors">
                                    Tech<span className="text-cyan-600 dark:text-cyan-400 transition-colors">Astra</span>
                                </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed transition-colors">
                                Expert consultancy services that accelerate your business growth with cutting-edge technology solutions.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-gray-900 dark:text-white font-bold mb-4 transition-colors">Services</h4>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm transition-colors">
                                <li className="hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer transition-colors">Web Development</li>
                                <li className="hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer transition-colors">App Development</li>
                                <li className="hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer transition-colors">AI/ML Projects</li>
                                <li className="hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer transition-colors">Digital Marketing</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-gray-900 dark:text-white font-bold mb-4 transition-colors">Company</h4>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm transition-colors">
                                <li className="hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer transition-colors">All Services</li>
                                <li className="hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer transition-colors">Portfolio</li>
                                <li className="hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer transition-colors">About</li>
                                <li className="hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer transition-colors">Contact</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-gray-900 dark:text-white font-bold mb-4 transition-colors">Connect</h4>
                            <div className="flex gap-4">
                                <a href="https://github.com/Tech-Astra" target="_blank" rel="noopener noreferrer" className="btn-icon-only w-10 h-10">
                                    <Github size={18} />
                                </a>
                                <a href="https://www.linkedin.com/company/tech-astra/" target="_blank" rel="noopener noreferrer" className="btn-icon-only w-10 h-10 hover:text-blue-500">
                                    <Linkedin size={18} />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 transition-colors">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <p>Tech Astra. All rights reserved*</p>
                        </div>
                        <div className="flex gap-6">
                            <button onClick={() => setActivePolicy('privacy')} className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</button>
                            <button onClick={() => setActivePolicy('terms')} className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</button>
                            <button onClick={() => setActivePolicy('cookies')} className="hover:text-gray-900 dark:hover:text-white transition-colors">Cookie Policy</button>
                        </div>
                    </div>
                </div>
            </footer>

            <PolicyModal
                isOpen={activePolicy !== null}
                onClose={() => setActivePolicy(null)}
                policyKey={activePolicy}
            />
        </>
    );
};

export default Footer;