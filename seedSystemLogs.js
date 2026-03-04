import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, get } from "firebase/database";
import * as dotenv from 'dotenv';
import path from 'path';

// Load env files
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Use the same config as the app
const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
    measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Mock function to generate a random timestamp within the last 30 days
const getRandomTimestamp = () => {
    const now = Date.now();
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
    return now - Math.floor(Math.random() * thirtyDaysInMs);
};

const adminEmail = "contactus.techastra@gmail.com";

const seedLogs = async () => {
    try {
        const logsRef = ref(database, 'system_logs');
        
        // Fetch existing projects, clients, team members to generate realistic logs
        const projectsSnapshot = await get(ref(database, 'projects'));
        const clientsSnapshot = await get(ref(database, 'clients'));
        const teamSnapshot = await get(ref(database, 'team'));
        const testimonialsSnapshot = await get(ref(database, 'testimonials'));

        console.log("Generating retrospective system logs based on existing data...");
        
        const logsToAdd = [];

        // 1. Generate logs for existing Projects
        if (projectsSnapshot.exists()) {
            const projects = projectsSnapshot.val();
            for (const key in projects) {
                const project = projects[key];
                logsToAdd.push({
                    adminEmail: adminEmail,
                    action: "Added Project",
                    entityType: "Project",
                    entityIdentifier: project.title || "Unknown Project",
                    details: project,
                    timestamp: project.timestamp || getRandomTimestamp()
                });
            }
        }

        // 2. Generate logs for existing Clients
        if (clientsSnapshot.exists()) {
            const clients = clientsSnapshot.val();
            for (const key in clients) {
                const client = clients[key];
                logsToAdd.push({
                    adminEmail: adminEmail,
                    action: "Generated Agreement",
                    entityType: "Agreement/Client",
                    entityIdentifier: client.clientName || "Unknown Client",
                    details: client,
                    timestamp: client.generatedAt || getRandomTimestamp()
                });
                
                if (client.status === "Approved") {
                     logsToAdd.push({
                        adminEmail: adminEmail,
                        action: "Approved Client",
                        entityType: "Client",
                        entityIdentifier: client.clientName || "Unknown Client",
                        details: client,
                        timestamp: client.generatedAt ? client.generatedAt + 3600000 : getRandomTimestamp() // 1 hour after generation
                    });
                }
            }
        }

        // 3. Generate logs for existing Team Members
        if (teamSnapshot.exists()) {
            const team = teamSnapshot.val();
            for (const key in team) {
                const member = team[key];
                logsToAdd.push({
                    adminEmail: adminEmail,
                    action: "Added Team Member",
                    entityType: "Team Member",
                    entityIdentifier: member.name || "Unknown Member",
                    details: member,
                    timestamp: getRandomTimestamp()
                });
            }
        }
        
        // 4. Generate logs for existing Testimonials
        if (testimonialsSnapshot.exists()) {
            const testimonials = testimonialsSnapshot.val();
            for (const key in testimonials) {
                const testimonial = testimonials[key];
                logsToAdd.push({
                    adminEmail: adminEmail,
                    action: "Added Testimonial",
                    entityType: "Testimonial",
                    entityIdentifier: testimonial.clientName || "Unknown Client",
                    details: testimonial,
                    timestamp: testimonial.createdAt || getRandomTimestamp()
                });
            }
        }

        console.log(`Prepared ${logsToAdd.length} logs to insert.`);

        // Insert logs
        for (const log of logsToAdd) {
            await push(logsRef, log);
        }

        console.log("Successfully seeded historical system logs!");
        process.exit(0);

    } catch (error) {
        console.error("Error seeding logs:", error);
        process.exit(1);
    }
};

seedLogs();
