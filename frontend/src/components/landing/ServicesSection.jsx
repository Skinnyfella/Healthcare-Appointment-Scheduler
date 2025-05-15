import { useContext } from 'react'
import { motion } from 'framer-motion'
import { FaUserMd, FaVideo, FaStethoscope, FaFileInvoiceDollar, FaVial, FaAmbulance } from 'react-icons/fa'
import { LanguageContext } from '../../context/LanguageContext'
import { services } from '../../data/dummyData'

const ServicesSection = () => {
  const { language } = useContext(LanguageContext)
  
  const translations = {
    en: {
      heading: 'Our Services',
      subheading: 'We offer a range of healthcare services to meet your needs',
    },
    es: {
      heading: 'Nuestros Servicios',
      subheading: 'Ofrecemos una variedad de servicios de salud para satisfacer sus necesidades',
    },
    fr: {
      heading: 'Nos Services',
      subheading: 'Nous offrons une gamme de services de santé pour répondre à vos besoins',
    }
  }
  
  const text = translations[language] || translations.en
  
  const getIcon = (iconName, className) => {
    switch(iconName) {
      case 'FaUserMd': return <FaUserMd className={className} />;
      case 'FaVideo': return <FaVideo className={className} />;
      case 'FaStethoscope': return <FaStethoscope className={className} />;
      case 'FaFileInvoiceDollar': return <FaFileInvoiceDollar className={className} />;
      case 'FaVial': return <FaVial className={className} />;
      case 'FaAmbulance': return <FaAmbulance className={className} />;
      default: return <FaUserMd className={className} />;
    }
  };
  
  const getColorClass = (color) => {
    switch(color) {
      case 'primary': return 'bg-primary-100 text-primary-600';
      case 'secondary': return 'bg-secondary-100 text-secondary-600';
      case 'accent': return 'bg-accent-100 text-accent-600';
      case 'success': return 'bg-green-100 text-green-600';
      case 'warning': return 'bg-yellow-100 text-yellow-600';
      case 'error': return 'bg-red-100 text-red-600';
      default: return 'bg-primary-100 text-primary-600';
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="services" className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
          >
            {text.heading}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            {text.subheading}
          </motion.p>
        </div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="card p-6 hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-full ${getColorClass(service.color)} flex items-center justify-center mb-4`}>
                {getIcon(service.icon, "w-8 h-8")}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection