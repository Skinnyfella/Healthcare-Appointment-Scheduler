import pool from '../config/database.js';
import { APPOINTMENT_STATUS } from '../config/constants.js';

export const AppointmentModel = {
    // Create new appointment
    async create(appointmentData) {
        const query = `
            INSERT INTO appointments (full_name, appointment_type, date, time, notes, status)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const values = [
            appointmentData.fullName,
            appointmentData.appointmentType,
            appointmentData.date,
            appointmentData.time,
            appointmentData.notes,
            APPOINTMENT_STATUS.REQUESTED
        ];

        const { rows } = await pool.query(query, values);
        return rows[0];
    },    // Get all appointments
    async getAll() {
        try {
            const result = await pool.query(
                'SELECT * FROM appointments ORDER BY date ASC, time ASC'
            );
            return result.rows;
        } catch (error) {
            throw new Error(`Error fetching appointments: ${error.message}`);
        }
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
