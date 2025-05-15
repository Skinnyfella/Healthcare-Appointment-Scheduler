import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LanguageContext } from '../../context/LanguageContext'

const HeroSection = () => {
  const { language } = useContext(LanguageContext)
  
  const translations = {
    en: {
      heading: 'Making Healthcare Accessible for Everyone',
      subheading: 'Schedule appointments with ease and connect with healthcare professionals when you need them most.',
      cta: 'Book Appointment',
      learnMore: 'Learn More'
    },
    es: {
      heading: 'Haciendo que la atención médica sea accesible para todos',
      subheading: 'Programe citas con facilidad y conéctese con profesionales de la salud cuando más los necesite.',
      cta: 'Reservar Cita',
      learnMore: 'Saber Más'
    },
    fr: {
      heading: 'Rendre les soins de santé accessibles à tous',
      subheading: 'Planifiez des rendez-vous facilement et connectez-vous avec des professionnels de la santé quand vous en avez le plus besoin.',
      cta: 'Prendre Rendez-vous',
      learnMore: 'En Savoir Plus'
    }
  }
  
  const text = translations[language] || translations.en

  return (
    <section className="relative h-screen min-h-[600px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/3376799/pexels-photo-3376799.jpeg?auto=compress&cs=tinysrgb&w=1920" 
          alt="" 
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-secondary-900/70"></div>
      </div>
      
      {/* Content */}
      <div className="container-custom relative z-10 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {text.heading}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            {text.subheading}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/book" className="btn bg-primary-500 hover:bg-primary-600 text-white font-medium text-center transition-colors">
              {text.cta}
            </Link>
            <a href="#services" className="btn bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium text-center transition-colors">
              {text.learnMore}
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div 
          className="w-8 h-12 border-2 border-white rounded-full flex justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <motion.div className="w-1 h-3 bg-white rounded-full mt-2"></motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection