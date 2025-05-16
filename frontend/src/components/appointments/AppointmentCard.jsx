import { useContext } from 'react'
import { motion } from 'framer-motion'
import { FaCalendarAlt, FaClock, FaClinicMedical } from 'react-icons/fa'
import { LanguageContext } from '../../context/LanguageContext'
import { format } from 'date-fns'

const AppointmentCard = ({ appointment }) => {
  const { language } = useContext(LanguageContext)
  
  const translations = {
    en: {
      type: 'Type',
      date: 'Date',
      time: 'Time',
      notes: 'Notes',
      confirmed: 'Confirmed',
      pending: 'Pending',
      cancel: 'Cancel Appointment',
      reschedule: 'Reschedule',
    },
    es: {
      type: 'Tipo',
      date: 'Fecha',
      time: 'Hora',
      notes: 'Notas',
      confirmed: 'Confirmada',
      pending: 'Pendiente',
      cancel: 'Cancelar Cita',
      reschedule: 'Reprogramar',
    },
    fr: {
      type: 'Type',
      date: 'Date',
      time: 'Heure',
      notes: 'Notes',
      confirmed: 'Confirmé',
      pending: 'En attente',
      cancel: 'Annuler le rendez-vous',
      reschedule: 'Reprogrammer',
    }
  }
  
  const text = translations[language] || translations.en
  
  const getStatusClass = (status) => {
    return status === 'confirmed' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800'
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return format(date, 'MMMM d, yyyy')
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card overflow-hidden"
    >
      {/* Status badge and name */}
      <div className="px-4 py-2 flex justify-between items-center border-b">
        <span 
          className={`${getStatusClass(appointment.status)} text-sm px-3 py-1 rounded-full`}
        >
          {appointment.status === 'confirmed' ? text.confirmed : text.pending}
        </span>
        <span className="text-sm text-gray-700 font-medium">
          {appointment.full_name}
        </span>
      </div>
      
      {/* Appointment details */}
      <div className="p-6">
        <div className="mb-4">
          <div className="space-y-3">
            <div className="flex items-start">
              <FaClinicMedical className="text-primary-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">{text.type}</p>
                <p className="text-gray-700">{appointment.appointment_type}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FaCalendarAlt className="text-primary-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">{text.date}</p>
                <p className="text-gray-700">{formatDate(appointment.date)}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FaClock className="text-primary-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">{text.time}</p>
                <p className="text-gray-700">{appointment.time}</p>
              </div>
            </div>
          </div>
        </div>
        
        {appointment.notes && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-500 mb-1">{text.notes}</p>
            <p className="text-gray-700">{appointment.notes}</p>
          </div>
        )}
        
        {/* Action buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2">
          <button className="btn-outline text-sm py-2 flex-1">
            {text.reschedule}
          </button>
          <button className="btn bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-sm py-2 flex-1">
            {text.cancel}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default AppointmentCard