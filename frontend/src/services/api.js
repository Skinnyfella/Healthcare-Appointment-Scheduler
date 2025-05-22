const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = {
    // Appointments
    appointments: {
        getAll: async () => {
            const response = await fetch(`${API_URL}/api/appointments`);
            return response.json();
        },
        create: async (appointmentData) => {
            const response = await fetch(`${API_URL}/api/appointments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData),
            });
            return response.json();
        },
        update: async (id, appointmentData) => {
            const response = await fetch(`${API_URL}/api/appointments/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData),
            });
            return response.json();
        },
        delete: async (id) => {
            const response = await fetch(`${API_URL}/api/appointments/${id}`, {
                method: 'DELETE',
            });
            return response.json();
        },
    },
};