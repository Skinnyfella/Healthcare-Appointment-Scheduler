import { useContext } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import HeroSection from '../components/landing/HeroSection'
import AboutSection from '../components/landing/AboutSection'
import ServicesSection from '../components/landing/ServicesSection'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import { LanguageContext } from '../context/LanguageContext'

const LandingPage = () => {
  const { language } = useContext(LanguageContext)
  
  const translations = {
    en: {
      ctaHeading: 'Ready to schedule your appointment?',
      ctaText: 'Our streamlined booking process makes it easy to get the care you need.',
      ctaButton: 'Book Now',
    },
    es: {
      ctaHeading: '¿Listo para programar su cita?',
      ctaText: 'Nuestro proceso de reserva simplificado facilita obtener la atención que necesita.',
      ctaButton: 'Reservar Ahora',
    },
    fr: {
      ctaHeading: 'Prêt à planifier votre rendez-vous?',
      ctaText: 'Notre processus de réservation simplifié vous permet d\'obtenir facilement les soins dont vous avez besoin.',
      ctaButton: 'Réserver Maintenant',
    }
  }
  
  const text = translations[language] || translations.en

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      
      {/* Call to Action */}
      <section className="section bg-primary-600 text-white">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{text.ctaHeading}</h2>
            <p className="text-xl mb-8 text-primary-100">{text.ctaText}</p>
            <Link
              to="/book"
              className="btn bg-white text-primary-600 hover:bg-primary-50 hover:text-primary-700 font-medium inline-flex items-center"
            >
              {text.ctaButton}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage