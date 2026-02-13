import React, { createContext, useContext, useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { ref, onValue, push, remove, set } from "firebase/database";

const ProjectContext = createContext();

export const useProjects = () => {
    return useContext(ProjectContext);
};

const defaultProjects = [
    {
        id: 1,
        title: "ThrifCart",
        category: "AI E-commerce",
        image: "https://images.unsplash.com/photo-1472851294608-415522f96803?q=80&w=1000&auto=format&fit=crop",
        desc: "Product comparison app for grocery, rides, and e-commerce with AI-powered recommendations and price tracking.",
        tech: ["React Native", "Node.js", "TensorFlow", "MongoDB"]
    },
    {
        id: 2,
        title: "Sarv Marg",
        category: "Smart Mobility",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
        desc: "Real-time road condition monitoring app using AI image analysis and shortest route optimization.",
        tech: ["Flutter", "Python", "Google Maps API", "AI"]
    },
    {
        id: 3,
        title: "Job Finder Bot",
        category: "AI Recruitment",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000&auto=format&fit=crop",
        desc: "AI job search platform with resume scoring, job alerts, and chatbot-based job guidance.",
        tech: ["Django", "OpenAI GPT", "React", "Redis"]
    },
    {
        id: 4,
        title: "Marketing Automation",
        category: "SaaS Platform",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
        desc: "End-to-end automation for social media, emails, lead generation, and analytics.",
        tech: ["React", "Node.js", "PostgreSQL", "AWS"]
    },
    {
        id: 5,
        title: "Mahalaxmi Foods.in",
        category: "Local Commerce",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop",
        desc: "Local food ordering website supporting homemade food businesses with product listings, cart, and payment system.",
        tech: ["React", "Stripe", "MongoDB", "Node.js"]
    },
    {
        id: 6,
        title: "Sahayak Nexus",
        category: "EdTech",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop",
        desc: "AI classroom BIOS for rural education with personalized learning, emotion tracking, and offline syncing.",
        tech: ["Flutter", "TensorFlow", "SQLite", "OpenCV"]
    },
    {
        id: 7,
        title: "Risk-Based Proctoring",
        category: "Security Extension",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
        desc: "Smart proctoring extension analyzing behavior to ensure exam integrity without video surveillance.",
        tech: ["Python", "OpenCV", "React", "AI"]
    },
    {
        id: 8,
        title: "Food Redistribution",
        category: "Social Impact",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop",
        desc: "AI-matched food donation system connecting surplus donors with needy recipients.",
        tech: ["Node.js", "React", "Maps API", "ML"]
    }
];

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);

    // Real-time sync with Firebase Realtime Database
    useEffect(() => {
        const projectsRef = ref(database, 'projects');

        const unsubscribe = onValue(projectsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const loadedProjects = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                // Sort by createdAt (newest first) if available, otherwise reverse to show newest added
                setProjects(loadedProjects.reverse());
            } else {
                setProjects([]);
                // MIGRATION: If DB is empty, check LocalStorage
                const localData = localStorage.getItem('techAstraProjects');
                if (localData) {
                    console.log("Migrating local data to Realtime Database...");
                    try {
                        const parsed = JSON.parse(localData);
                        parsed.forEach((p) => {
                            // Remove local ID, let RTDB generate a key
                            const { id, ...projectData } = p;
                            push(projectsRef, {
                                ...projectData,
                                createdAt: Date.now()
                            });
                        });
                        console.log("Migration complete.");
                    } catch (e) {
                        console.error("Migration failed:", e);
                    }
                } else {
                    // SEED: If LocalStorage is also empty, seed default projects
                    console.log("Database empty. Seeding default projects...");
                    defaultProjects.forEach((p) => {
                        push(projectsRef, {
                            ...p,
                            createdAt: Date.now()
                        });
                    });
                    console.log("Seeding complete.");
                }
            }
        }, (error) => {
            console.error("Firebase Read Error:", error);
            alert("Database connection failed: " + error.message);
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, []);

    const addProject = (newProject) => {
        const projectsRef = ref(database, 'projects');
        push(projectsRef, {
            ...newProject,
            createdAt: Date.now()
        })
            .catch((error) => {
                console.error("Error adding project: ", error);
                alert("Failed to save project. Check console.");
            });
    };

    const deleteProject = (id) => {
        if (!id) {
            console.error("Invalid ID passed to deleteProject");
            return;
        }
        const projectRef = ref(database, `projects/${id}`);
        remove(projectRef).catch((error) => {
            console.error("Error deleting project: ", error);
            alert("Failed to delete project.");
        });
    };

    return (
        <ProjectContext.Provider value={{ projects, addProject, deleteProject }}>
            {children}
        </ProjectContext.Provider>
    );
};
