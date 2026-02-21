import React, { createContext, useContext, useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { ref, onValue, push, remove, update } from "firebase/database";

const TeamContext = createContext();

export const useTeam = () => {
    return useContext(TeamContext);
};

export const TeamProvider = ({ children }) => {
    const [teamMembers, setTeamMembers] = useState([]);

    // Real-time sync with Firebase Realtime Database
    useEffect(() => {
        const teamRef = ref(database, 'team');

        const unsubscribe = onValue(teamRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const loadedMembers = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                // Sort: Shivaraj first, Vivek second, then alphabetical
                loadedMembers.sort((a, b) => {
                    const nameA = (a.name || "").toLowerCase();
                    const nameB = (b.name || "").toLowerCase();

                    // Shivaraj is always #1
                    if (nameA.includes("shivaraj") && !nameB.includes("shivaraj")) return -1;
                    if (!nameA.includes("shivaraj") && nameB.includes("shivaraj")) return 1;

                    // Vivek is always #2
                    if (nameA.includes("vivek") && !nameB.includes("vivek")) return -1;
                    if (!nameA.includes("vivek") && nameB.includes("vivek")) return 1;

                    return nameA.localeCompare(nameB);
                });
                setTeamMembers(loadedMembers);
            } else {
                setTeamMembers([]);
            }
        }, (error) => {
            console.error("Firebase Read Error:", error);
        });

        return () => unsubscribe();
    }, []);

    const addTeamMember = (newMember) => {
        const teamRef = ref(database, 'team');
        push(teamRef, {
            ...newMember,
            createdAt: Date.now()
        }).catch((error) => console.error("Error adding team member: ", error));
    };

    const deleteTeamMember = (id) => {
        if (!id) return;
        const memberRef = ref(database, `team/${id}`);
        remove(memberRef).catch((error) => console.error("Error deleting member: ", error));
    };

    const updateTeamMember = (id, updatedData) => {
        if (!id) return;
        const memberRef = ref(database, `team/${id}`);
        update(memberRef, {
            ...updatedData,
            updatedAt: Date.now()
        }).catch((error) => console.error("Error updating team member: ", error));
    };

    return (
        <TeamContext.Provider value={{ teamMembers, addTeamMember, deleteTeamMember, updateTeamMember }}>
            {children}
        </TeamContext.Provider>
    );
};
