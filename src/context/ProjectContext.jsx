import React, { createContext, useContext, useState, useEffect } from 'react';

const ProjectContext = createContext();

export const useProjects = () => {
    return useContext(ProjectContext);
};

const defaultProjects = [
    {
        title: "ThrifCart",
        category: "AI E-commerce",
        image: "https://images.unsplash.com/photo-1472851294608-415522f96803?q=80&w=1000&auto=format&fit=crop",
        desc: "Product comparison app for grocery, rides, and e-commerce with AI-powered recommendations and price tracking.",
        tech: ["React Native", "Node.js", "TensorFlow", "MongoDB"]
    },
    {
        title: "Sarv Marg",
        category: "Smart Mobility",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
        desc: "Real-time road condition monitoring app using AI image analysis and shortest route optimization.",
        tech: ["Flutter", "Python", "Google Maps API", "AI"]
    },
    {
        title: "Job Finder Bot",
        category: "AI Recruitment",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000&auto=format&fit=crop",
        desc: "AI job search platform with resume scoring, job alerts, and chatbot-based job guidance.",
        tech: ["Django", "OpenAI GPT", "React", "Redis"]
    },
    {
        title: "Marketing Automation",
        category: "SaaS Platform",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
        desc: "End-to-end automation for social media, emails, lead generation, and analytics.",
        tech: ["React", "Node.js", "PostgreSQL", "AWS"]
    },
    {
        title: "Mahalaxmi Foods.in",
        category: "Local Commerce",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop",
        desc: "Local food ordering website supporting homemade food businesses with product listings, cart, and payment system.",
        tech: ["React", "Stripe", "MongoDB", "Node.js"]
    },
    {
        title: "Sahayak Nexus",
        category: "EdTech",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop",
        desc: "AI classroom BIOS for rural education with personalized learning, emotion tracking, and offline syncing.",
        tech: ["Flutter", "TensorFlow", "SQLite", "OpenCV"]
    },
    {
        title: "Risk-Based Proctoring",
        category: "Security Extension",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
        desc: "Smart proctoring extension analyzing behavior to ensure exam integrity without video surveillance.",
        tech: ["Python", "OpenCV", "React", "AI"]
    },
    {
        title: "Food Redistribution",
        category: "Social Impact",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop",
        desc: "AI-matched food donation system connecting surplus donors with needy recipients.",
        tech: ["Node.js", "React", "Maps API", "ML"]
    }
];

export const ProjectProvider = ({ children }) => {
    // Initialize from local storage or default projects
    const [projects, setProjects] = useState(() => {
        const savedProjects = localStorage.getItem('techAstraProjects');
        return savedProjects ? JSON.parse(savedProjects) : defaultProjects;
    });

    // Sync with local storage whenever projects change
    useEffect(() => {
        localStorage.setItem('techAstraProjects', JSON.stringify(projects));
    }, [projects]);

    const addProject = (newProject) => {
        setProjects(prevProjects => [newProject, ...prevProjects]);
    };

    return (
        <ProjectContext.Provider value={{ projects, addProject }}>
            {children}
        </ProjectContext.Provider>
    );
};
