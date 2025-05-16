import { useState, useContext } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LanguageContext } from '../../context/LanguageContext';
import { motion } from 'framer-motion';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { signIn } = useAuth();
    const { language } = useContext(LanguageContext);

    const translations = {
        en: {
            title: 'Login to Book Appointment',
            emailLabel: 'Email Address',
            submitButton: 'Send Magic Link',
            emailPlaceholder: 'Enter your email address',
            checkEmail: 'Check your email for the login link!',
            errorGeneric: 'An error occurred. Please try again.'
        },
        es: {
            title: 'Iniciar Sesión para Reservar Cita',
            emailLabel: 'Correo Electrónico',
            submitButton: 'Enviar Enlace Mágico',
            emailPlaceholder: 'Ingrese su correo electrónico',
            checkEmail: '¡Revise su correo para el enlace de inicio de sesión!',
            errorGeneric: 'Ocurrió un error. Por favor intente de nuevo.'
        },
        fr: {
            title: 'Connectez-vous pour Prendre Rendez-vous',
            emailLabel: 'Adresse Email',
            submitButton: 'Envoyer le Lien Magique',
            emailPlaceholder: 'Entrez votre adresse email',
            checkEmail: 'Vérifiez votre email pour le lien de connexion!',
            errorGeneric: 'Une erreur est survenue. Veuillez réessayer.'
        }
    };

    const text = translations[language] || translations.en;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');
        setError('');

        try {
            const { error: signInError } = await signIn(email);
            if (signInError) {
                setError(signInError);
            } else {
                setMessage(text.checkEmail);
                setEmail('');
            }
        } catch (err) {
            setError(text.errorGeneric);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
        >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                {text.title}
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                        {text.emailLabel}
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder={text.emailPlaceholder}
                        required
                        disabled={isSubmitting}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? '...' : text.submitButton}
                </button>
            </form>
            {message && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 p-3 bg-green-100 text-green-700 rounded"
                >
                    {message}
                </motion.div>
            )}
            {error && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 p-3 bg-red-100 text-red-700 rounded"
                >
                    {error}
                </motion.div>
            )}
        </motion.div>
    );
};

export default LoginForm;
