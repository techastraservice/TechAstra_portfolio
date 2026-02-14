import React, { createContext, useContext, useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { ref, onValue, push, remove, set } from "firebase/database";

const ProjectContext = createContext();

export const useProjects = () => {
    return useContext(ProjectContext);
};

// COMPACTED: Default projects removed to save disk space. 
// They are likely already seeded or can be added via Admin.
const defaultProjects = [];

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
                setProjects(loadedProjects.reverse());
            } else {
                setProjects([]);
                // Seeding logic kept but with empty defaultProjects it won't do much
            }
        }, (error) => {
            console.error("Firebase Read Error:", error);
        });

        return () => unsubscribe();
    }, []);

    const addProject = (newProject) => {
        const projectsRef = ref(database, 'projects');
        push(projectsRef, {
            ...newProject,
            createdAt: Date.now()
        }).catch((error) => console.error("Error adding project: ", error));
    };

    const deleteProject = (id) => {
        if (!id) return;
        const projectRef = ref(database, `projects/${id}`);
        remove(projectRef).catch((error) => console.error("Error deleting: ", error));
    };

    // Visitor Counter Logic
    const [totalVisits, setTotalVisits] = useState(0);

    const incrementVisits = () => {
        // Placeholder
    };

    useEffect(() => {
        const visitsRef = ref(database, 'site_stats/total_visits');
        const unsubscribe = onValue(visitsRef, (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                setTotalVisits(data);
            } else {
                set(visitsRef, 0);
                setTotalVisits(0);
            }
        });

        const visitedKey = 'techastra_visit_session';
        const hasVisited = sessionStorage.getItem(visitedKey);

        if (!hasVisited) {
            import("firebase/database").then(({ runTransaction }) => {
                runTransaction(visitsRef, (current) => {
                    return (current || 0) + 1;
                }).then(() => {
                    sessionStorage.setItem(visitedKey, 'true');
                    console.log("Visit incremented.");
                }).catch(err => console.error("Increment failed:", err));
            });
        }

        return () => unsubscribe();
    }, []);

    return (
        <ProjectContext.Provider value={{ projects, addProject, deleteProject, totalVisits, incrementVisits }}>
            {children}
        </ProjectContext.Provider>
    );
};