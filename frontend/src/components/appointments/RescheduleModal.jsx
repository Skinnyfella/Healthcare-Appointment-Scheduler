import { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'
import { LanguageContext } from '../../context/LanguageContext'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { timeSlots } from '../../data/dummyData'

const RescheduleModal = ({ 
  isOpen, 
  onClose, 
  appointment, 
  onReschedule,
  isSubmitting 
}) => {
  const { language } = useContext(LanguageContext)
  const [newDate, setNewDate] = useState(new Date(appointment?.date || Date.now()))
  const [newTime, setNewTime] = useState(appointment?.time || '')
  const [error, setError] = useState('')

  const translations = {
    en: {
      title: 'Reschedule Appointment',
      currentDateTime: 'Current Date & Time',
      newDateTime: 'New Date & Time',
      date: 'Date',
      time: 'Time',
      selectTime: 'Select time',
      submit: 'Confirm Reschedule',
      cancel: 'Cancel',
      required: 'Please select both date and time',
    },
    es: {
      title: 'Reprogramar Cita',
      currentDateTime: 'Fecha y Hora Actual',
      newDateTime: 'Nueva Fecha y Hora',
      date: 'Fecha',
      time: 'Hora',
      selectTime: 'Seleccionar hora',
      submit: 'Confirmar Reprogramación',
      cancel: 'Cancelar',
      required: 'Por favor seleccione fecha y hora',
    },
    fr: {
      title: 'Reprogrammer le Rendez-vous',
      currentDateTime: 'Date et Heure Actuelles',
      newDateTime: 'Nouvelle Date et Heure',
      date: 'Date',
      time: 'Heure',
      selectTime: 'Sélectionner l\'heure',
      submit: 'Confirmer la Reprogrammation',
      cancel: 'Annuler',
      required: 'Veuillez sélectionner la date et l\'heure',
    }
  }

  const text = translations[language] || translations.en

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newDate || !newTime) {
      setError(text.required)
      return
    }
    onReschedule(newDate, newTime)
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
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
            {text.title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Current Date/Time */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              {text.currentDateTime}
            </h4>
            <p className="text-gray-600">
              {new Date(appointment?.date).toLocaleDateString()} at {appointment?.time}
            </p>
          </div>

          {/* New Date/Time */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              {text.newDateTime}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {text.date}
                </label>
                <DatePicker
                  selected={newDate}
                  onChange={setNewDate}
                  minDate={new Date()}
                  className="form-input w-full"
                  dateFormat="MM/dd/yyyy"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {text.time}
                </label>
                <select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="form-input w-full"
                >
                  <option value="">{text.selectTime}</option>
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline text-sm py-2 flex-1"
              disabled={isSubmitting}
            >
              {text.cancel}
            </button>
            <button
              type="submit"
              className="btn bg-primary-600 hover:bg-primary-700 text-white text-sm py-2 flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? '...' : text.submit}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default RescheduleModal