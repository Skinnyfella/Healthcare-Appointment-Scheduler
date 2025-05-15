import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../../context/LanguageContext'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'
import LanguageSelector from '../ui/LanguageSelector'

const Footer = () => {
  const { language } = useContext(LanguageContext)
  
  const translations = {
    en: {
      address: 'Address',
      contactUs: 'Contact Us',
      quickLinks: 'Quick Links',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      faq: 'FAQ',
      copyright: '© 2025 HealthCareHub. All rights reserved.',
    },
    es: {
      address: 'Dirección',
      contactUs: 'Contáctenos',
      quickLinks: 'Enlaces Rápidos',
      privacy: 'Política de Privacidad',
      terms: 'Términos de Servicio',
      faq: 'Preguntas Frecuentes',
      copyright: '© 2025 HealthCareHub. Todos los derechos reservados.',
    },
    fr: {
      address: 'Adresse',
      contactUs: 'Contactez-nous',
      quickLinks: 'Liens Rapides',
      privacy: 'Politique de Confidentialité',
      terms: 'Conditions d\'Utilisation',
      faq: 'FAQ',
      copyright: '© 2025 HealthCareHub. Tous droits réservés.',
    }
  }
  
  const text = translations[language] || translations.en
  
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Clinic Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">HealthCareHub</h3>
            <p className="text-gray-300 mb-4">
              Making healthcare accessible for everyone through our modern scheduling platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-300 hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{text.contactUs}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 text-primary-400" />
                <span className="text-gray-300">123 Healthcare Blvd, Medical District, NY 10001</span>
              </li>
              <li className="flex items-start">
                <FaPhone className="mt-1 mr-2 text-primary-400" />
                <span className="text-gray-300">(555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="mt-1 mr-2 text-primary-400" />
                <span className="text-gray-300">info@healthcarehub.com</span>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{text.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/book" className="text-gray-300 hover:text-white transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="text-gray-300 hover:text-white transition-colors">
                  My Appointments
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  {text.privacy}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  {text.terms}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Language */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Language</h3>
            <LanguageSelector isDark={true} />
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>{text.copyright}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer