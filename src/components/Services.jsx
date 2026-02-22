import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import ServiceModal from './ServiceModal';

// eslint-disable-next-line react-refresh/only-export-components
export const services = [
    {
        title: "Web Development",
        desc: "Modern, responsive websites built with cutting-edge technologies and stunning user experiences.",
        details: {
            description: "Transform your digital presence with our comprehensive web development solutions that combine cutting-edge technology with exceptional user experience. We build scalable, secure, and high-performance applications tailored to your business goals.",
            technologies: {
                Frontend: "React, Next.js, Vue.js, Angular, Tailwind CSS, TypeScript",
                Backend: "Node.js, Python (Django/Flask), PHP (Laravel), .NET Core",
                Databases: "MongoDB, PostgreSQL, MySQL, Redis, Firebase",
                Cloud: "AWS (Lambda, EC2, S3), Azure, Google Cloud Platform, Vercel",
                DevOps: "Docker, Kubernetes, CI/CD Pipelines, GitHub Actions"
            },
            servicesList: [
                "Custom Web Applications",
                "E-commerce Platforms (Shopify, WooCommerce, Custom)",
                "Content Management Systems (CMS)",
                "Progressive Web Apps (PWAs)",
                "API Development & Integration",
                "Performance Optimization & SEO"
            ],
            keyFeatures: [
                "Responsive Design (Mobile-First approach)",
                "SEO Optimization (On-page & Technical)",
                "Fast Loading Times (<2 seconds)",
                "Security Best Practices (OWASP Top 10)",
                "Scalable Architecture for Growth",
                "Cross-Browser Compatibility"
            ],
            timeline: "6-16 weeks",
            pricing: "Rs.25,000+"
        }
    },
    {
        title: "App Development",
        desc: "Native and cross-platform mobile applications with seamless performance and intuitive design.",
        details: {
            description: "Create engaging mobile experiences that connect with your users on any device. We specialize in building native and cross-platform mobile applications that are robust, user-friendly, and feature-rich.",
            technologies: {
                CrossPlatform: "Flutter, React Native, Ionic",
                Native_iOS: "Swift, SwiftUI, Objective-C",
                Native_Android: "Kotlin, Java, Jetpack Compose",
                Backend: "Firebase, Node.js, GraphQL, AWS Amplify"
            },
            servicesList: [
                "iOS App Development",
                "Android App Development",
                "Cross-Platform Solutions",
                "App UI/UX Design",
                "App Store Optimization (ASO)",
                "Maintenance & Support"
            ],
            keyFeatures: [
                "Native Performance Optimization",
                "Offline Functionality",
                "Push Notifications Integration",
                "Biometric Authentication",
                "In-App Purchases & Subscriptions",
                "Real-time Data Synchronization"
            ],
            timeline: "8-20 weeks",
            pricing: "Rs.30,000+"
        }
    },
    {
        title: "AI/ML Projects",
        desc: "Intelligent solutions powered by machine learning and artificial intelligence for complex problems.",
        details: {
            description: "Leverage the power of Artificial Intelligence to automate processes, gain insights, and create smarter products. Our AI/ML solutions are designed to solve complex business challenges.",
            technologies: {
                Frameworks: "TensorFlow, PyTorch, Keras, Scikit-learn",
                NLP: "OpenAI GPT, BERT, Hugging Face, NLTK",
                ComputerVision: "OpenCV, YOLO, ResNet",
                DataProcessing: "Pandas, NumPy, Apache Spark",
                Deployment: "AWS SageMaker, Docker, Flask API"
            },
            servicesList: [
                "Custom Machine Learning Models",
                "Natural Language Processing (NLP)",
                "Computer Vision Solutions",
                "Predictive Analytics & Forecasting",
                "AI-Powered Chatbots & Virtual Assistants",
                "Recommendation Systems"
            ],
            keyFeatures: [
                "High Accuracy & Precision Models",
                "Real-time Data Processing",
                "Scalable AI Infrastructure",
                "Ethical AI & Bias Mitigation",
                "Seamless Integration with Existing Systems",
                "Continuous Model Training & Improvement"
            ],
            timeline: "10-24 weeks",
            pricing: "Rs.35,000+"
        }
    },
    {
        title: "Digital Marketing",
        desc: "Data-driven marketing strategies for exponential growth and engagement.",
        details: {
            description: "Accelerate your business growth with our data-driven digital marketing strategies. We use advanced analytics and creative storytelling to reach your target audience and convert them into loyal customers.",
            technologies: {
                Analytics: "Google Analytics 4, Mixpanel, Hotjar",
                SEO_Tools: "SEMrush, Ahrefs, Moz, Google Search Console",
                Ads: "Google Ads, Facebook Ads Manager, LinkedIn Campaign Manager",
                CRM_Automation: "HubSpot, Salesforce, Mailchimp, Klaviyo",
                Social: "Buffer, Hootsuite, Sprout Social"
            },
            servicesList: [
                "Search Engine Optimization (SEO)",
                "Pay-Per-Click Advertising (PPC)",
                "Social Media Marketing (SMM)",
                "Content Marketing & Strategy",
                "Email Marketing Automation",
                "Conversion Rate Optimization (CRO)"
            ],
            keyFeatures: [
                "Data-Driven ROI Tracking",
                "Precise Audience Targeting",
                "A/B Testing & Optimization",
                "Comprehensive Monthly Reporting",
                "Omnichannel Marketing Approach",
                "Brand Consistency & Voice"
            ],
            timeline: "Ongoing",
            pricing: "Rs.10,000+"
        }
    },
    {
        title: "Main Project Development",
        desc: "End-to-end operational solutions for final year students. Scalable, secure, and production-ready architectures for top grades.",
        details: {
            description: "Our Main Project Development service is exclusively designed for Final Year Students looking to build robust, scalable, and high-performance Capstone projects. We provide complete guidance from system architecture to deployment, ensuring you understand every line of code.",
            technologies: {
                Frontend: "React, Next.js, Vue.js, TypeScript, Tailwind CSS",
                Backend: "Node.js (NestJS/Express), Python (Django/FastAPI), Go",
                Database: "PostgreSQL, MongoDB, Redis, ElasticSearch",
                Cloud: "AWS, Azure, Google Cloud, Kubernetes, Docker",
                Security: "OAuth2, JWT, SSL/TLS, OWASP Standards"
            },
            servicesList: [
                "Final Year Capstone Projects",
                "Complex Web Applications",
                "IEEE Base Paper Implementations",
                "AI/ML Integrated Projects",
                "Blockchain & IoT Solutions",
                "Complete Project Documentation"
            ],
            keyFeatures: [
                "Complete Source Code Explanation",
                "Project Report & PPT Support",
                "Viva-Voce Preparation",
                "Deployment on Live Server",
                "Comprehensive Documentation",
                "100% Plagiarism Free Code"
            ],
            timeline: "3-6+ Months",
            pricing: "Custom Quote"
        }
    },
    {
        title: "Mini Project / MVP",
        desc: "Rapid prototypes, semester projects, and mini projects. Cost-effective solutions delivered quickly.",
        details: {
            description: "Perfect for college students needing Semester Projects or Mini Projects. We deliver functional applications that meet academic requirements without unnecessary complexity.",
            technologies: {
                Frontend: "React, HTML5/CSS3, JavaScript",
                Backend: "Node.js, Firebase, Python (Flask)",
                Database: "MongoDB, MySQL, SQLite",
                Hosting: "Vercel, Netlify, Heroku",
                Tools: "Git, Postman"
            },
            servicesList: [
                "Semester Projects",
                "Mini Projects for College Students",
                "Simple Web Applications",
                "Academic Assignments",
                "Frontend/Backend Modules",
                "Portfolio Websites"
            ],
            keyFeatures: [
                "Rapid Delivery (1-2 Weeks)",
                "Clean & Easy to Understand Code",
                "Cost-Effective for Students",
                "Setup & Installation Guide",
                "Basic Documentation",
                "Video Walkthrough"
            ],
            timeline: "2-4 Weeks",
            pricing: "Affordable"
        }
    }
];

const Services = () => {
    const [selectedService, setSelectedService] = useState(null);

    return (
        <section id="services" className="py-32 relative overflow-hidden bg-gray-50 dark:bg-black/40 transition-colors">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="container relative z-10 mx-auto px-6">
                <Reveal>
                    <div className="text-center mb-20 max-w-3xl mx-auto">

                        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight transition-colors">
                            Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-600">Vision</span>
                        </h2>

                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed transition-colors">
                            Comprehensive solutions that bring your ideas to life with cutting-edge technology and expert craftsmanship.
                        </p>
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Reveal key={index} delay={index * 100}>
                            <div className="group h-full p-8 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-cyan-500/30 dark:hover:border-white/20 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-500 backdrop-blur-sm flex flex-col justify-between hover:shadow-2xl hover:shadow-cyan-500/10">
                                <div>
                                    {/* Removed Icon Wrapper */}
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors">
                                        {service.desc}
                                    </p>
                                </div>

                                <button
                                    onClick={() => setSelectedService(service)}
                                    className="w-full py-4 px-6 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/20 border border-gray-200 dark:border-white/10 hover:border-cyan-500/30 dark:hover:border-cyan-500/30 flex items-center justify-center gap-2 text-gray-900 dark:text-white font-medium transition-all duration-300 group-hover:gap-3 group-hover:translate-y-[-2px]"
                                >
                                    Learn More
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>

            {/* Service Details Modal */}
            <ServiceModal
                isOpen={!!selectedService}
                onClose={() => setSelectedService(null)}
                service={selectedService}
            />
        </section>
    );
};

export default Services;

