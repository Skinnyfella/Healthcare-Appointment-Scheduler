import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Check your .env file');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
});

// Authentication helpers
export const auth = {
    // Sign in with magic link
    signInWithEmail: async (email) => {
        return await supabase.auth.signInWithOtp({ 
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/book`
            }
        });
    },
    
    // Sign out
    signOut: async () => {
        return await supabase.auth.signOut();
    },

    // Get current session
    getSession: async () => {
        return await supabase.auth.getSession();
    }
};

// Appointment helpers
export const appointments = {
    // Create appointment
    create: async (appointmentData) => {
        const { data: { user } } = await supabase.auth.getUser();
        return await supabase
            .from('appointments')
            .insert({
                ...appointmentData,
                user_id: user?.id
            })
            .select()
            .single();
    },    // Get user's appointments
    getAll: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('You must be logged in to view appointments');
        
        return await supabase
            .from('appointments')
            .select('*')
            .eq('user_id', user.id)  // This ensures users only see their own appointments
            .order('date', { ascending: true });
    },

    // Update appointment
    update: async (id, updateData) => {
        return await supabase
            .from('appointments')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();
    },

    // Cancel appointment
    cancel: async (id) => {
        return await supabase
            .from('appointments')
            .update({ status: 'cancelled' })
            .eq('id', id)
            .select()
            .single();
    },

    // Reschedule appointment
    reschedule: async (id, { date, time }) => {
        return await supabase
            .from('appointments')
            .update({
                date,
                time,
                status: 'requested' // Reset to requested status when rescheduled
            })
            .eq('id', id)
            .select()
            .single();
    }
};
