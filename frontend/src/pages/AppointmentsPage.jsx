import { useContext, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaCalendarPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../context/LanguageContext'
import AppointmentCard from '../components/appointments/AppointmentCard'
import { appointments } from '../config/supabase'

const AppointmentsPage = () => {
  const { language } = useContext(LanguageContext)
  const [userAppointments, setUserAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const fetchAppointments = async () => {
    try {
      const { data, error } = await appointments.getAll()
      if (error) throw error
      setUserAppointments(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])
  
  const translations = {
    en: {
      heading: 'My Appointments',
      subheading: 'View and manage your upcoming appointments',
      upcomingAppointments: 'Upcoming Appointments',
      noAppointments: 'You have no upcoming appointments',
      bookNew: 'Book a New Appointment',
      error: 'Error loading appointments'
    },
    es: {
      heading: 'Mis Citas',
      subheading: 'Ver y administrar sus próximas citas',
      upcomingAppointments: 'Próximas Citas',
      noAppointments: 'No tiene citas próximas',
      bookNew: 'Reservar una Nueva Cita',
      error: 'Error al cargar las citas'
    },
    fr: {
      heading: 'Mes Rendez-vous',
      subheading: 'Voir et gérer vos rendez-vous à venir',
      upcomingAppointments: 'Rendez-vous à Venir',
      noAppointments: 'Vous n\'avez pas de rendez-vous à venir',
      bookNew: 'Prendre un Nouveau Rendez-vous',
      error: 'Erreur lors du chargement des rendez-vous'
    }
  }
  
  const text = translations[language] || translations.en
  
  // Sort appointments by date, most recent first
  const sortedAppointments = [...userAppointments].sort((a, b) => {
    return new Date(a.date) - new Date(b.date)
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">{text.heading}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{text.subheading}</p>
        </div>

        {error ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 text-red-600 p-4 rounded-lg mb-6"
          >
            {text.error}: {error}
          </motion.div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-semibold text-gray-800">{text.upcomingAppointments}</h2>
              <Link 
                to="/book" 
                className="btn-primary inline-flex items-center text-sm py-2"
              >
                <FaCalendarPlus className="mr-2" />
                {text.bookNew}
              </Link>
            </div>
            
            {sortedAppointments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedAppointments.map(appointment => (
                  <AppointmentCard 
                    key={appointment.id} 
                    appointment={appointment}
                    onUpdate={fetchAppointments}
                  />
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-md p-8 text-center"
              >
                <p className="text-gray-600 mb-6">{text.noAppointments}</p>
                <Link to="/book" className="btn-primary inline-block">
                  {text.bookNew}
                </Link>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default AppointmentsPage