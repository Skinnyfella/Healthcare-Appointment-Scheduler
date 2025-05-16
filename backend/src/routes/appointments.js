import express from 'express';
import { AppointmentController } from '../controllers/appointments/appointment.controller.js';
import { validateAppointment } from '../middleware/validation.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

// Apply auth middleware to all appointment routes
router.use(authMiddleware);

// Create new appointment (from AppointmentForm)
router.post('/', validateAppointment, AppointmentController.createAppointment);

// Get all appointments (for displaying in AppointmentCard)
router.get('/', AppointmentController.getAllAppointments);

// Update/Reschedule appointment
router.put('/:id', validateAppointment, AppointmentController.updateAppointment);

// Cancel/Delete appointment
router.delete('/:id', AppointmentController.deleteAppointment);

export default router;
