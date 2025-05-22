# Healthcare Appointment Scheduler

A modern, full-stack healthcare appointment scheduling system built with React, Express, and Supabase. This application allows patients to easily schedule, manage, and track their healthcare appointments.

## 🌐 Live Demo

Demo: [https://healthcare-appointment-scheduler.vercel.app/](https://healthcare-appointment-scheduler.vercel.app/)  


## ✨ Features

- 📅 Easy appointment scheduling and management
- 🔒 Secure authentication with Supabase Magic Links
- 🌍 Multilingual support (English, Spanish, French)
- 📱 Responsive design for all devices
- 🛡️ Protected routes and data privacy
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast performance with Vite

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Framer Motion
- Supabase Client
- React Router DOM

### Backend
- Node.js
- Express
- Supabase
- Security middlewares (Helmet, CORS, Rate Limiting)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Clone the Repository

\`\`\`bash
git clone https://github.com/Skinnyfella/Healthcare-Appointment-Scheduler.git
cd Healthcare-Appointment-Scheduler
\`\`\`

### Frontend Setup

1. Navigate to frontend directory:
\`\`\`bash
cd frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create .env file:
\`\`\`env
VITE_API_URL=http://localhost:5000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

4. Start development server:
\`\`\`bash
npm run dev
\`\`\`

### Backend Setup

1. Navigate to backend directory:
\`\`\`bash
cd backend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create .env file:
\`\`\`env
PORT=5000
CLIENT_URL=http://localhost:5173
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
\`\`\`

4. Start development server:
\`\`\`bash
npm run dev
\`\`\`

## 📦 Project Structure

### Frontend
\`\`\`
frontend/
├── src/
│   ├── components/    # Reusable components
│   ├── pages/         # Page components
│   ├── context/       # React context providers
│   ├── config/        # Configuration files
│   ├── services/      # API services
│   └── utils/         # Utility functions
\`\`\`

### Backend
\`\`\`
backend/
├── src/
│   ├── config/        # Configuration files
│   ├── controllers/   # Route controllers
│   ├── middleware/    # Custom middleware
│   ├── routes/        # API routes
│   └── services/      # Business logic
\`\`\`

## 🔐 Security Features

- Helmet for secure headers
- Rate limiting
- XSS protection
- CORS configuration
- Request sanitization
- Parameter pollution prevention
- Cache control headers

## 🚀 Deployment

The application is deployed using:
- Frontend: Vercel
- Backend: Render
- Database: Supabase

## 📝 License

This project is MIT licensed.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
