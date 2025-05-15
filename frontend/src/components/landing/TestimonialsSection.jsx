import { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { FaQuoteLeft } from 'react-icons/fa'
import { LanguageContext } from '../../context/LanguageContext'
import { testimonials } from '../../data/dummyData'

const TestimonialsSection = () => {
  const { language } = useContext(LanguageContext)
  const [activeIndex, setActiveIndex] = useState(0)
  
  const translations = {
    en: {
      heading: 'What Our Patients Say',
      subheading: 'Hear from those who have experienced our services',
    },
    es: {
      heading: 'Lo que dicen nuestros pacientes',
      subheading: 'Escuche a quienes han experimentado nuestros servicios',
    },
    fr: {
      heading: 'Ce que disent nos patients',
      subheading: 'Écoutez ceux qui ont expérimenté nos services',
    }
  }
  
  const text = translations[language] || translations.en
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  return (
    <section className="section bg-gradient-to-r from-primary-50 to-secondary-50">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            {text.heading}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {text.subheading}
          </p>
        </motion.div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Desktop testimonial cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 bg-white relative"
              >
                <FaQuoteLeft className="text-primary-100 text-4xl absolute top-4 left-4" />
                <div className="mb-4 relative z-10">
                  <p className="text-gray-700 italic mb-6 relative z-10">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <p className="font-bold text-gray-800">{testimonial.name}</p>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Mobile testimonial carousel */}
          <div className="md:hidden">
            <motion.div
              key={testimonials[activeIndex].id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="card p-6 bg-white relative"
            >
              <FaQuoteLeft className="text-primary-100 text-4xl absolute top-4 left-4" />
              <div className="mb-4 relative z-10">
                <p className="text-gray-700 italic mb-6 relative z-10">"{testimonials[activeIndex].content}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonials[activeIndex].avatar} 
                    alt={testimonials[activeIndex].name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-bold text-gray-800">{testimonials[activeIndex].name}</p>
                    <p className="text-gray-600 text-sm">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="flex justify-center mt-6 gap-4">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                aria-label="Previous testimonial"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                aria-label="Next testimonial"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
            
            <div className="flex justify-center mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 mx-1 rounded-full ${
                    index === activeIndex ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection