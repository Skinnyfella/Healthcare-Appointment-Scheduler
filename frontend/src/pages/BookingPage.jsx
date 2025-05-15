import AppointmentForm from '../components/booking/AppointmentForm'

import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/auth/LoginForm';

const BookingPage = () => {
    const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container-custom">
        {user ? (
          <AppointmentForm />
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  )
}

export default BookingPage