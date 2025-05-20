import { useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCalendarAlt, FaClock, FaClinicMedical, FaTimes } from 'react-icons/fa'
import { LanguageContext } from '../../context/LanguageContext'
import { format } from 'date-fns'
import { appointments } from '../../config/supabase'

const AppointmentCard = ({ appointment, onUpdate }) => {
  const { language } = useContext(LanguageContext)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)
  
  const translations = {
    en: {
      type: 'Type',
      date: 'Date',
      time: 'Time',
      notes: 'Notes',
      confirmed: 'Confirmed',
      pending: 'Pending',
      cancelled: 'Cancelled',
      cancel: 'Cancel Appointment',
      reschedule: 'Reschedule',
      confirmCancel: 'Confirm Cancellation',
      cancelQuestion: 'Are you sure you want to cancel this appointment?',
      cancelWarning: 'This action cannot be undone.',
      confirmButton: 'Yes, Cancel',
      cancelButton: 'No, Keep'
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
      confirmCancel: 'Confirmar Cancelación',
      cancelQuestion: '¿Está seguro de que desea cancelar esta cita?',
      cancelWarning: 'Esta acción no se puede deshacer.',
      confirmButton: 'Sí, Cancelar',
      cancelButton: 'No, Mantener',
      cancelled: 'Cancelada'
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
      confirmCancel: 'Confirmer l\'annulation',
      cancelQuestion: 'Êtes-vous sûr de vouloir annuler ce rendez-vous?',
      cancelWarning: 'Cette action ne peut pas être annulée.',
      confirmButton: 'Oui, Annuler',
      cancelButton: 'Non, Garder',
      cancelled: 'Annulé'
    }
  }
  
  const text = translations[language] || translations.en
  
  const getStatusClass = (status) => {
    switch(status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return format(date, 'MMMM d, yyyy')
  }

  const handleCancel = async () => {
    try {
      setIsCancelling(true)
      const { error } = await appointments.cancel(appointment.id)
      if (error) throw error
      onUpdate && onUpdate()
    } catch (err) {
      console.error('Error cancelling appointment:', err)
    } finally {
      setIsCancelling(false)
      setShowCancelModal(false)
    }
  }

  return (
    <>
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
            {appointment.status === 'confirmed' 
              ? text.confirmed 
              : appointment.status === 'cancelled'
                ? text.cancelled
                : text.pending}
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
          
          {/* Action buttons - Only show if not cancelled */}
          {appointment.status !== 'cancelled' && (
            <div className="mt-6 flex flex-col sm:flex-row gap-2">
              <button className="btn-outline text-sm py-2 flex-1">
                {text.reschedule}
              </button>
              <button 
                className="btn bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-sm py-2 flex-1"
                onClick={() => setShowCancelModal(true)}
                disabled={isCancelling}
              >
                {text.cancel}
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowCancelModal(false)
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {text.confirmCancel}
                </h3>
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="mt-4">
                <p className="text-gray-700 mb-2">{text.cancelQuestion}</p>
                <p className="text-sm text-red-600">{text.cancelWarning}</p>
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row gap-2">
                <button
                  className="btn-outline text-sm py-2 flex-1"
                  onClick={() => setShowCancelModal(false)}
                  disabled={isCancelling}
                >
                  {text.cancelButton}
                </button>
                <button
                  className="btn bg-red-600 hover:bg-red-700 text-white text-sm py-2 flex-1"
                  onClick={handleCancel}
                  disabled={isCancelling}
                >
                  {isCancelling ? '...' : text.confirmButton}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AppointmentCard