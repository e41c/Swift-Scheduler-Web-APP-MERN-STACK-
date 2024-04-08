// Capstone-II---Group26/frontend/src/App.jsx
import Navbar from './components/Navbar'
import About from './components/About'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'

import AuthProvider from './AuthContext'

import AdminRoute from './components/routing/AdminRoute';
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
import AdminView from './components/adminView/AdminView'
import StudentAdmin from './components/adminView/StudentAdmin'
import ClassesAdmin from './components/adminView/ClassesAdmin'
import TeacherAdmin from './components/adminView/TeacherAdmin'
import NoMatch from './components/NoMatch'
import {AdminProvider} from './AdminContext'

function App() {

  return (

    <>
    <div className="w-full min-h-screen h-auto bg-[#171717]">
    <AuthProvider>
      <ClassProvider>
        <ClassManagementProvider>
          <AdminProvider>
          <Router className='navbar-container'>
            <Navbar />
            <Routes>
            <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
            <Route path='/admin' element={<AdminRoute><AdminView/></AdminRoute>}/>
              <Route path='/studentAdmin' element={<AdminRoute><StudentAdmin/></AdminRoute>}/>
              <Route path='/teacherAdmin' element={<AdminRoute><TeacherAdmin/></AdminRoute>}/>
              <Route path='/classesAdmin' element={<AdminRoute><ClassesAdmin/></AdminRoute>}/>
              <Route path='/classroomAdmin' element={<AdminRoute><ClassesAdmin/></AdminRoute>}/>
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
              <Route path="*" element={<NoMatch/>}/>
            </Routes>
          </Router>
          </AdminProvider>

        </ClassManagementProvider>
      </ClassProvider>
    </AuthProvider>
    </div>
    </>
  )
}

export default App
