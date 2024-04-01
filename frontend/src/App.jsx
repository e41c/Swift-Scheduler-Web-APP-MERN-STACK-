import Navbar from './components/Navbar'
import About from './components/About'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/landing/LandingPage'

import AuthProvider from './AuthContext'

import PublicRoute from './components/routing/PublicRoute'
import PrivateRoute from './components/routing/PrivateRoute'
import CalendarView from './components/booking/CalendarView'
import ListView from './components/booking/ListView'
import ClassDetail from './components/booking/ClassDetail'
import {ClassProvider} from './ClassContext'
import Profile from './components/profile/Profile'
import DashboardCalendar from './components/teacherDashboard/DashboardCalendar'
import { ClassManagementProvider } from './ClassManagementContext'
import BookForm from './components/teacherDashboard/BookForm'

function App() {

  return (

    <>
    <div className="w-full min-h-screen h-auto bg-[#171717]">
    <AuthProvider>
      <ClassProvider>
        <ClassManagementProvider>
          <Router className='navbar-container'>
            <Navbar />
            <Routes>
            <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
              <Route path="/about" element={<PublicRoute><About /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><Register/></PublicRoute>} />
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} /> 
              <Route path="/calendar" element={<PrivateRoute><CalendarView /></PrivateRoute>} />
              <Route path="/day-view" element={<PrivateRoute><ListView /></PrivateRoute>} />
              <Route path="/class/:id" element={<PrivateRoute><ClassDetail /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/class-management" element={<PrivateRoute><DashboardCalendar /></PrivateRoute>} />
              <Route path="/classroom/:id" element={<PrivateRoute><BookForm /></PrivateRoute>} />
            </Routes>
          </Router>
        </ClassManagementProvider>
      </ClassProvider>
    </AuthProvider>
    </div>
    </>
  )
}

export default App
