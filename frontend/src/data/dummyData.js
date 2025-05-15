export const services = [
  {
    id: 1,
    title: 'General Consultation',
    description: 'Comprehensive check-ups and consultations with our experienced general practitioners.',
    icon: 'FaUserMd',
    color: 'primary',
  },
  {
    id: 2,
    title: 'Telehealth',
    description: 'Connect with our healthcare professionals remotely through secure video consultations.',
    icon: 'FaVideo',
    color: 'secondary',
  },
  {
    id: 3,
    title: 'Specialist Booking',
    description: 'Schedule appointments with specialized doctors across various medical fields.',
    icon: 'FaStethoscope',
    color: 'accent',
  },
  {
    id: 4,
    title: 'Insurance Assistance',
    description: 'Get help navigating your insurance coverage and understanding your benefits.',
    icon: 'FaFileInvoiceDollar',
    color: 'success',
  },
  {
    id: 5,
    title: 'Lab Services',
    description: 'Book appointments for laboratory tests and receive digital results.',
    icon: 'FaVial',
    color: 'warning',
  },
  {
    id: 6,
    title: 'Emergency Care',
    description: 'Priority booking for urgent care needs with expedited appointment slots.',
    icon: 'FaAmbulance',
    color: 'error',
  }
]

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Patient',
    content: 'The online scheduling system saved me so much time. I was able to book my appointment and see the doctor within 24 hours. Highly recommended!',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Patient',
    content: 'As someone with a busy schedule, the ability to book appointments online has been a game-changer. The interface is intuitive and the reminders are helpful.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 3,
    name: 'Emily Chen',
    role: 'Patient',
    content: 'I appreciate how easy it is to reschedule if needed. The telehealth option has been particularly valuable for my follow-up appointments.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
  }
]

export const appointmentTypes = [
  { id: 1, name: 'General Consultation' },
  { id: 2, name: 'Telehealth' },
  { id: 3, name: 'Specialist Visit' },
  { id: 4, name: 'Follow-up' },
  { id: 5, name: 'Lab Work' },
  { id: 6, name: 'Vaccination' },
  { id: 7, name: 'Physical Therapy' },
  { id: 8, name: 'Mental Health' }
]

export const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM'
]

export const dummyAppointments = [
  {
    id: 1,
    patientName: 'John Doe',
    type: 'General Consultation',
    date: '2025-03-15',
    time: '10:00 AM',
    notes: 'First visit, general checkup',
    status: 'confirmed'
  },
  {
    id: 2,
    patientName: 'John Doe',
    type: 'Telehealth',
    date: '2025-04-02',
    time: '2:30 PM',
    notes: 'Follow-up on medication',
    status: 'confirmed'
  },
  {
    id: 3,
    patientName: 'John Doe',
    type: 'Specialist Visit',
    date: '2025-02-28',
    time: '9:30 AM',
    notes: 'Dermatology consultation',
    status: 'pending'
  }
]