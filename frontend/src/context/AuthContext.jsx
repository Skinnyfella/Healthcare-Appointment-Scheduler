import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active sessions and sets the user
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();    }, []);

    const signIn = async (email) => {
        try {
            const redirectTo = `${window.location.origin}/book`;
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: redirectTo,
                    shouldCreateUser: true,
                    data: {
                        redirectTo: redirectTo
                    }
                }
            });
            if (error) throw error;
            return { error: null, message: 'Check your email for the login link!' };
        } catch (error) {
            console.error('Sign in error:', error);
            return { error: error.message, message: null };
        }
    };

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            setUser(null);
        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            signOut,
            loading
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
