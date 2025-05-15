import { useState, useContext, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'
import { LanguageContext } from '../../context/LanguageContext'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { startSpeechRecognition, stopSpeechRecognition } from '../../utils/speechRecognition'
import { appointmentTypes, timeSlots } from '../../data/dummyData'

const AppointmentForm = () => {
  const { language } = useContext(LanguageContext)
  const [formData, setFormData] = useState({
    fullName: '',
    appointmentType: '',
    date: null,
    time: '',
    notes: ''
  })
  const [isRecording, setIsRecording] = useState(false)
  const [recordingFor, setRecordingFor] = useState(null)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const recognitionRef = useRef(null)
  
  const translations = {
    en: {
      heading: 'Book Your Appointment',
      subheading: 'Fill out the form below to schedule your visit',
      fullName: 'Full Name',
      appointmentType: 'Appointment Type',
      selectType: 'Select appointment type',
      date: 'Date',
      selectDate: 'Select date',
      time: 'Time',
      selectTime: 'Select time',
      notes: 'Notes',
      enterNotes: 'Enter any additional information...',
      startVoice: 'Voice Input',
      stopVoice: 'Stop Recording',
      submit: 'Book Appointment',
      nameVoice: 'Say your full name...',
      notesVoice: 'Speak your notes...',
      recordingError: 'Speech recognition not available in your browser',
      required: 'This field is required',
      success: 'Your appointment has been successfully scheduled!'
    },
    es: {
      heading: 'Reserve su cita',
      subheading: 'Complete el formulario a continuación para programar su visita',
      fullName: 'Nombre Completo',
      appointmentType: 'Tipo de Cita',
      selectType: 'Seleccione tipo de cita',
      date: 'Fecha',
      selectDate: 'Seleccionar fecha',
      time: 'Hora',
      selectTime: 'Seleccionar hora',
      notes: 'Notas',
      enterNotes: 'Ingrese cualquier información adicional...',
      startVoice: 'Entrada de Voz',
      stopVoice: 'Detener Grabación',
      submit: 'Reservar Cita',
      nameVoice: 'Diga su nombre completo...',
      notesVoice: 'Hable sus notas...',
      recordingError: 'El reconocimiento de voz no está disponible en su navegador',
      required: 'Este campo es obligatorio',
      success: '¡Su cita ha sido programada con éxito!'
    },
    fr: {
      heading: 'Prenez Rendez-vous',
      subheading: 'Remplissez le formulaire ci-dessous pour planifier votre visite',
      fullName: 'Nom Complet',
      appointmentType: 'Type de Rendez-vous',
      selectType: 'Sélectionnez le type de rendez-vous',
      date: 'Date',
      selectDate: 'Sélectionner une date',
      time: 'Heure',
      selectTime: 'Sélectionner une heure',
      notes: 'Notes',
      enterNotes: 'Entrez toute information supplémentaire...',
      startVoice: 'Entrée Vocale',
      stopVoice: 'Arrêter l\'Enregistrement',
      submit: 'Réserver un Rendez-vous',
      nameVoice: 'Dites votre nom complet...',
      notesVoice: 'Dictez vos notes...',
      recordingError: 'La reconnaissance vocale n\'est pas disponible dans votre navigateur',
      required: 'Ce champ est obligatoire',
      success: 'Votre rendez-vous a été programmé avec succès!'
    }
  }
  
  const text = translations[language] || translations.en
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, date }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.fullName || !formData.appointmentType || !formData.date || !formData.time) {
      setError(text.required)
      return
    }
    
    // Clear any previous errors
    setError('')
    
    // In a real app, this would submit to a backend
    console.log('Appointment booked:', formData)
    
    // Show success message
    setSuccessMessage(text.success)
    
    // Reset form after a delay
    setTimeout(() => {
      setFormData({
        fullName: '',
        appointmentType: '',
        date: null,
        time: '',
        notes: ''
      })
      setSuccessMessage('')
    }, 3000)
  }
  
  const toggleSpeechRecognition = (field) => {
    if (isRecording) {
      setIsRecording(false)
      setRecordingFor(null)
      stopSpeechRecognition(recognitionRef.current)
      recognitionRef.current = null
      return
    }
    
    setRecordingFor(field)
    setIsRecording(true)
    
    const handleRecognitionResult = (transcript) => {
      setFormData(prev => ({ ...prev, [field]: transcript }))
      setIsRecording(false)
      setRecordingFor(null)
    }
    
    const handleRecognitionError = (errorMessage) => {
      setError(errorMessage)
      setIsRecording(false)
      setRecordingFor(null)
    }
    
    recognitionRef.current = startSpeechRecognition(
      handleRecognitionResult,
      handleRecognitionError
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto w-full"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{text.heading}</h2>
        <p className="text-gray-600">{text.subheading}</p>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md border border-red-200">
          {error}
        </div>
      )}
      
      {successMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-50 text-green-600 rounded-md border border-green-200"
        >
          {successMessage}
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <div className="form-group">
          <div className="flex items-center justify-between">
            <label htmlFor="fullName" className="form-label">
              {text.fullName} <span className="text-red-500">*</span>
            </label>
            <button 
              type="button"
              onClick={() => toggleSpeechRecognition('fullName')}
              className={`text-sm flex items-center transition-colors ${
                isRecording && recordingFor === 'fullName'
                  ? 'text-red-500'
                  : 'text-primary-600 hover:text-primary-700'
              }`}
              aria-label={isRecording ? text.stopVoice : text.startVoice}
            >
              {isRecording && recordingFor === 'fullName' ? (
                <>
                  <FaMicrophoneSlash className="mr-1" />
                  {text.stopVoice}
                </>
              ) : (
                <>
                  <FaMicrophone className="mr-1" />
                  {text.startVoice}
                </>
              )}
            </button>
          </div>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder={isRecording && recordingFor === 'fullName' ? text.nameVoice : ''}
            className="form-input"
            aria-required="true"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="appointmentType" className="form-label">
            {text.appointmentType} <span className="text-red-500">*</span>
          </label>
          <select
            id="appointmentType"
            name="appointmentType"
            value={formData.appointmentType}
            onChange={handleChange}
            className="form-input"
            aria-required="true"
          >
            <option value="">{text.selectType}</option>
            {appointmentTypes.map(type => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="date" className="form-label">
              {text.date} <span className="text-red-500">*</span>
            </label>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              minDate={new Date()}
              placeholderText={text.selectDate}
              className="form-input"
              id="date"
              aria-required="true"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="time" className="form-label">
              {text.time} <span className="text-red-500">*</span>
            </label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="form-input"
              aria-required="true"
            >
              <option value="">{text.selectTime}</option>
              {timeSlots.map(slot => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <div className="flex items-center justify-between">
            <label htmlFor="notes" className="form-label">
              {text.notes}
            </label>
            <button 
              type="button"
              onClick={() => toggleSpeechRecognition('notes')}
              className={`text-sm flex items-center transition-colors ${
                isRecording && recordingFor === 'notes'
                  ? 'text-red-500'
                  : 'text-primary-600 hover:text-primary-700'
              }`}
              aria-label={isRecording ? text.stopVoice : text.startVoice}
            >
              {isRecording && recordingFor === 'notes' ? (
                <>
                  <FaMicrophoneSlash className="mr-1" />
                  {text.stopVoice}
                </>
              ) : (
                <>
                  <FaMicrophone className="mr-1" />
                  {text.startVoice}
                </>
              )}
            </button>
          </div>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder={isRecording && recordingFor === 'notes' ? text.notesVoice : text.enterNotes}
            className="form-input h-32"
            aria-required="false"
          ></textarea>
        </div>
        
        <div className="mt-6">
          <button 
            type="submit"
            className="btn btn-primary w-full py-3"
            disabled={isRecording}
          >
            {text.submit}
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default AppointmentForm