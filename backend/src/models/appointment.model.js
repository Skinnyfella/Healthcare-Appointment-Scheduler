import { supabase } from '../config/supabase.js';
import { APPOINTMENT_STATUS, APPOINTMENT_TYPES } from '../config/constants.js';

export const AppointmentModel = {
    // Create new appointment
    async create(appointmentData) {
        const { data, error } = await supabase
            .from('appointments')
            .insert([{
                full_name: appointmentData.fullName,
                appointment_type: appointmentData.appointmentType,
                date: appointmentData.date,
                time: appointmentData.time,
                notes: appointmentData.notes,
                status: APPOINTMENT_STATUS.REQUESTED
            }])
            .select();

        if (error) throw error;
        return data[0];
    },

    // Get all appointments
    async getAll() {
        const { data, error } = await supabase
            .from('appointments')
            .select('*')
            .order('date', { ascending: true });

        if (error) throw error;
        return data;
    },

    // Get appointment by ID
    async getById(id) {
        const { data, error } = await supabase
            .from('appointments')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    // Update appointment
    async update(id, updateData) {
        const { data, error } = await supabase
            .from('appointments')
            .update(updateData)
            .eq('id', id)
            .select();

        if (error) throw error;
        return data[0];
    },

    // Delete appointment
    async delete(id) {
        const { error } = await supabase
            .from('appointments')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    }
};
