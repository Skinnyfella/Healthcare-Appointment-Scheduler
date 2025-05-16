import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import LandingPage from './pages/LandingPage'
import BookingPage from './pages/BookingPage'
import AppointmentsPage from './pages/AppointmentsPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { LanguageContext } from './context/LanguageContext'
import { AuthProvider } from './context/AuthContext'

function App() {
  const [language, setLanguage] = useState('en')

  return (
    <AuthProvider>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/book" element={<BookingPage />} />
              <Route 
                path="/appointments" 
                element={
                  <ProtectedRoute>
                    <AppointmentsPage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </LanguageContext.Provider>
    </AuthProvider>
  )
}

export default App