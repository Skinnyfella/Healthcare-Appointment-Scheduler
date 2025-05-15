import { APPOINTMENT_TYPES } from '../config/constants.js';

export const validateAppointment = (req, res, next) => {
    const { fullName, appointmentType, date, time } = req.body;

    const errors = [];

    // Validate full name
    if (!fullName || fullName.trim().length < 2) {
        errors.push('Full name is required and should be at least 2 characters long');
    }

    // Validate appointment type
    if (!appointmentType || !Object.values(APPOINTMENT_TYPES).includes(appointmentType)) {
        errors.push('Valid appointment type is required');
    }

    // Validate date
    if (!date || new Date(date) < new Date()) {
        errors.push('Valid future date is required');
    }

    // Validate time
    if (!time || !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time)) {
        errors.push('Valid time in HH:MM format is required');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};
