import { useContext } from 'react'
import { motion } from 'framer-motion'
import { LanguageContext } from '../../context/LanguageContext'

const AboutSection = () => {
  const { language } = useContext(LanguageContext)
  
  const translations = {
    en: {
      heading: 'About HealthCareHub',
      description: 'HealthCareHub is a modern healthcare scheduling platform dedicated to simplifying the process of connecting patients with healthcare providers. Our mission is to make quality healthcare accessible to everyone by removing barriers to scheduling and communication.',
      vision: 'Our Vision',
      visionText: 'A world where healthcare is easily accessible to all individuals regardless of their location or circumstances.',
      mission: 'Our Mission',
      missionText: 'To transform healthcare scheduling by creating intuitive digital solutions that save time for both patients and providers.',
      values: 'Our Values',
      value1: 'Accessibility',
      value2: 'Innovation',
      value3: 'Compassion',
      value1Text: 'Making healthcare available to everyone',
      value2Text: 'Continuously improving our services',
      value3Text: 'Putting patients\' needs first'
    },
    es: {
      heading: 'Acerca de HealthCareHub',
      description: 'HealthCareHub es una plataforma moderna de programación de atención médica dedicada a simplificar el proceso de conectar pacientes con proveedores de atención médica. Nuestra misión es hacer que la atención médica de calidad sea accesible para todos, eliminando las barreras de programación y comunicación.',
      vision: 'Nuestra Visión',
      visionText: 'Un mundo donde la atención médica sea fácilmente accesible para todas las personas, independientemente de su ubicación o circunstancias.',
      mission: 'Nuestra Misión',
      missionText: 'Transformar la programación de atención médica creando soluciones digitales intuitivas que ahorren tiempo tanto a pacientes como a proveedores.',
      values: 'Nuestros Valores',
      value1: 'Accesibilidad',
      value2: 'Innovación',
      value3: 'Compasión',
      value1Text: 'Hacer que la atención médica esté disponible para todos',
      value2Text: 'Mejorar continuamente nuestros servicios',
      value3Text: 'Poner las necesidades de los pacientes en primer lugar'
    },
    fr: {
      heading: 'À propos de HealthCareHub',
      description: 'HealthCareHub est une plateforme moderne de planification des soins de santé dédiée à simplifier le processus de connexion des patients avec les prestataires de soins. Notre mission est de rendre les soins de santé de qualité accessibles à tous en supprimant les obstacles à la planification et à la communication.',
      vision: 'Notre Vision',
      visionText: 'Un monde où les soins de santé sont facilement accessibles à toutes les personnes, indépendamment de leur emplacement ou de leur situation.',
      mission: 'Notre Mission',
      missionText: 'Transformer la planification des soins de santé en créant des solutions numériques intuitives qui font gagner du temps aux patients et aux prestataires.',
      values: 'Nos Valeurs',
      value1: 'Accessibilité',
      value2: 'Innovation',
      value3: 'Compassion',
      value1Text: 'Rendre les soins de santé disponibles pour tous',
      value2Text: 'Améliorer continuellement nos services',
      value3Text: 'Mettre les besoins des patients au premier plan'
    }
  }
  
  const text = translations[language] || translations.en

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section id="about" className="section bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-center text-3xl md:text-4xl font-bold mb-12 text-gray-800"
          >
            {text.heading}
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-700 mb-10 leading-relaxed"
          >
            {text.description}
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {/* Vision */}
            <motion.div 
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3 text-primary-600">{text.vision}</h3>
              <p className="text-gray-700">{text.visionText}</p>
            </motion.div>
            
            {/* Mission */}
            <motion.div 
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3 text-primary-600">{text.mission}</h3>
              <p className="text-gray-700">{text.missionText}</p>
            </motion.div>
            
            {/* Values */}
            <motion.div 
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3 text-primary-600">{text.values}</h3>
              <ul className="space-y-2 text-gray-700">
                <li><span className="font-medium">{text.value1}:</span> {text.value1Text}</li>
                <li><span className="font-medium">{text.value2}:</span> {text.value2Text}</li>
                <li><span className="font-medium">{text.value3}:</span> {text.value3Text}</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection