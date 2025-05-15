import { supabase } from '../config/database.js';
import { APPOINTMENT_STATUS } from '../config/constants.js';

export const AppointmentModel = {
    // Create new appointment
    async create(appointmentData) {
        const { data, error } = await supabase
            .from('appointments')
            .insert({
                full_name: appointmentData.fullName,
                appointment_type: appointmentData.appointmentType,
                date: appointmentData.date,
                time: appointmentData.time,
                notes: appointmentData.notes,
                status: APPOINTMENT_STATUS.REQUESTED,
                user_id: appointmentData.userId
            })
            .select();

        const { rows } = await pool.query(query, values);
        return rows[0];
    },    // Get all appointments for a user
    async getAll(userId) {
        const { data, error } = await supabase
            .from('appointments')
            .select('*')
            .eq('user_id', userId)
            .order('date', { ascending: true });
            
        if (error) throw error;
        return data;
    },

    // Get appointment by ID
    async getById(id) {
        try {
            const result = await pool.query(
                'SELECT * FROM appointments WHERE id = $1',
                [id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error fetching appointment: ${error.message}`);
        }
    },    // Update appointment
    async update(id, updateData) {
        const query = `
            UPDATE appointments
            SET full_name = $1,
                appointment_type = $2,
                date = $3,
                time = $4,
                notes = $5,
                status = $6
            WHERE id = $7
            RETURNING *
        `;
        const values = [
            updateData.fullName,
            updateData.appointmentType,
            updateData.date,
            updateData.time,
            updateData.notes,
            updateData.status || APPOINTMENT_STATUS.REQUESTED,
            id
        ];

        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error updating appointment: ${error.message}`);
        }
    },

    // Delete appointment
    async delete(id) {
        try {
            await pool.query('DELETE FROM appointments WHERE id = $1', [id]);
            return true;
        } catch (error) {
            throw new Error(`Error deleting appointment: ${error.message}`);
        }
    }
};
