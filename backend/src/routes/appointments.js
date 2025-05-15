import express from 'express';
import { AppointmentController } from '../controllers/appointments/appointment.controller.js';
import { validateAppointment } from '../middleware/validation.middleware.js';

const router = express.Router();

// Create appointment
router.post('/', validateAppointment, AppointmentController.createAppointment);

// Get all appointments
router.get('/', AppointmentController.getAllAppointments);

// Get specific appointment
router.get('/:id', AppointmentController.getAppointment);

// Update appointment
router.put('/:id', validateAppointment, AppointmentController.updateAppointment);

// Delete appointment
router.delete('/:id', AppointmentController.deleteAppointment);

export default router;
