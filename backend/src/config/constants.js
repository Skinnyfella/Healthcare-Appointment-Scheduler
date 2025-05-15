export const APPOINTMENT_STATUS = {
    REQUESTED: 'requested',
    CANCELLED: 'cancelled'
};

export const APPOINTMENT_TYPES = {
    GENERAL_CONSULTATION: 'General Consultation',
    SPECIALIST_VISIT: 'Specialist Visit',
    TELEHEALTH: 'Telehealth'
};

export const TIME_SLOTS = {
    DURATION: 30, // Duration in minutes
    START_TIME: '09:00',
    END_TIME: '17:00'
};

export const ERROR_MESSAGES = {
    INVALID_APPOINTMENT: 'Invalid appointment details',
    UNAVAILABLE_SLOT: 'This time slot is not available',
    UNAUTHORIZED: 'Unauthorized access',
    NOT_FOUND: 'Resource not found'
};
