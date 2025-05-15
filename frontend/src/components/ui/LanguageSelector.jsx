import { useContext } from 'react'
import { LanguageContext } from '../../context/LanguageContext'
import { FaGlobe } from 'react-icons/fa'

const LanguageSelector = ({ isDark = false }) => {
  const { language, setLanguage } = useContext(LanguageContext)
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' }
  ]
  
  const handleChange = (e) => {
    setLanguage(e.target.value)
  }
  
  const baseClasses = "appearance-none pl-8 pr-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
  const lightClasses = "bg-white border border-gray-300 text-gray-700"
  const darkClasses = "bg-gray-700 border border-gray-600 text-white"
  
  const selectClasses = isDark 
    ? `${baseClasses} ${darkClasses}`
    : `${baseClasses} ${lightClasses}`
    
  return (
    <div className="relative inline-block">
      <FaGlobe className={`absolute left-2 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-300' : 'text-gray-500'}`} />
      <select 
        value={language}
        onChange={handleChange}
        className={selectClasses}
        aria-label="Select language"
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-gray-500'}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  )
}

export default LanguageSelector