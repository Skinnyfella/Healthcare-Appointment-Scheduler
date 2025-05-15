import { AppointmentModel } from '../../models/appointment.model.js';
import { ERROR_MESSAGES } from '../../config/constants.js';

export const AppointmentController = {
    // Create appointment
    async createAppointment(req, res) {
        try {
            const appointment = await AppointmentModel.create(req.body);
            res.status(201).json(appointment);
        } catch (error) {
            res.status(400).json({ 
                message: ERROR_MESSAGES.INVALID_APPOINTMENT,
                error: error.message 
            });
        }
    },

    // Get all appointments
    async getAllAppointments(req, res) {
        try {
            const appointments = await AppointmentModel.getAll();
            res.status(200).json(appointments);
        } catch (error) {
            res.status(500).json({ 
                message: ERROR_MESSAGES.NOT_FOUND,
                error: error.message 
            });
        }
    },

    // Get appointment by ID
    async getAppointment(req, res) {
        try {
            const appointment = await AppointmentModel.getById(req.params.id);
            if (!appointment) {
                return res.status(404).json({ message: ERROR_MESSAGES.NOT_FOUND });
            }
            res.status(200).json(appointment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update appointment
    async updateAppointment(req, res) {
        try {
            const appointment = await AppointmentModel.update(req.params.id, req.body);
            res.status(200).json(appointment);
        } catch (error) {
            res.status(400).json({ 
                message: ERROR_MESSAGES.INVALID_APPOINTMENT,
                error: error.message 
            });
        }
    },

    // Delete appointment
    async deleteAppointment(req, res) {
        try {
            await AppointmentModel.delete(req.params.id);
            res.status(200).json({ message: 'Appointment deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
