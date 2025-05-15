import { useState, useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LanguageContext } from '../../context/LanguageContext'
import { FaBars, FaTimes } from 'react-icons/fa'
import LanguageSelector from '../ui/LanguageSelector'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { language } = useContext(LanguageContext)
  const location = useLocation()
  
  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useEffect(() => {
    closeMenu()
  }, [location])
  
  const headerClass = isScrolled
    ? 'bg-white shadow-md py-2'
    : 'bg-transparent py-4'
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Book Appointment', path: '/book' },
    { name: 'My Appointments', path: '/appointments' }
  ]
  
  const translations = {
    en: {
      home: 'Home',
      book: 'Book Appointment',
      appointments: 'My Appointments'
    },
    es: {
      home: 'Inicio',
      book: 'Reservar Cita',
      appointments: 'Mis Citas'
    },
    fr: {
      home: 'Accueil',
      book: 'Prendre Rendez-vous',
      appointments: 'Mes Rendez-vous'
    }
  }

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${headerClass}`}
      aria-label="Main Navigation"
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-xl md:text-2xl font-bold text-primary-600">
              HealthCare<span className="text-secondary-600">Hub</span>
            </h1>
          </motion.div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <Link 
              key={link.path}
              to={link.path}
              className={`text-sm lg:text-base font-medium hover:text-primary-600 transition-colors ${
                location.pathname === link.path ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <LanguageSelector />
        </nav>
        
        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden p-2 text-gray-700 focus:outline-none"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div 
          className="md:hidden bg-white"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container-custom py-4 flex flex-col space-y-4">
            {navLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path}
                className={`text-base font-medium py-2 ${
                  location.pathname === link.path ? 'text-primary-600' : 'text-gray-700'
                }`}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <LanguageSelector />
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Header