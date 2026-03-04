import { database, auth } from '../firebaseConfig';
import { ref, push } from 'firebase/database';

/**
 * Logs an action performed by an admin to the Firebase Realtime Database.
 * @param {string} action - The action verb (e.g., 'Created', 'Updated', 'Deleted', 'Approved').
 * @param {string} entityType - The type of entity affected (e.g., 'Client', 'Project', 'Testimonial').
 * @param {string} entityIdentifier - A human-readable name of the entity (e.g., 'John Doe', 'TechAstra Redesign').
 * @param {object} details - The full object of data relevant to this action for the popup.
 */
export const logAdminAction = async (action, entityType, entityIdentifier, details = {}) => {
    try {
        const user = auth.currentUser;
        if (!user) return; // Must have an authenticated current user

        const logsRef = ref(database, 'system_logs');
        
        // Remove undefined values to prevent Firebase errors
        const sanitizedDetails = JSON.parse(JSON.stringify(details));

        await push(logsRef, {
            adminEmail: user.email,
            action,
            entityType,
            entityIdentifier: entityIdentifier || 'Unknown',
            details: sanitizedDetails || {},
            timestamp: Date.now()
        });
    } catch (error) {
        console.error("Failed to log admin action:", error);
    }
};
