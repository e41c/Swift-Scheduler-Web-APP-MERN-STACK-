// Capstone-II---Group26/frontend/src/App.jsx
import Navbar from './components/Navbar'
import About from './components/About'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import {AdminProvider} from './AdminContext'
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
import NoAccess from './components/NoAccess'
import AdminRoute from './components/routing/AdminRoute'
import AdminView from './components/adminView/AdminView'
import AdminClasses from './components/adminView/AdminClasses'
import AdminClassroom from './components/adminView/AdminClassroom'
import AdminStudent from './components/adminView/AdminStudent'
import AdminTeacher from './components/adminView/AdminTeacher'


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
              <Route path="/about" element={<PublicRoute><About /></PublicRoute>} />
              <Route path='/admin' element={<AdminRoute><AdminView></AdminView></AdminRoute>}/>
              <Route path='/admin-teacher' element={<AdminRoute><AdminTeacher></AdminTeacher></AdminRoute>}/>
              <Route path='/admin-classes' element={<AdminRoute><AdminClasses></AdminClasses></AdminRoute>}/>
              <Route path='/admin-classroom' element={<AdminRoute><AdminClassroom></AdminClassroom></AdminRoute>}/>
              <Route path='/admin-student' element={<AdminRoute><AdminStudent></AdminStudent></AdminRoute>}></Route>
              <Route path="/register" element={<PublicRoute><Register/></PublicRoute>} />
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} /> 
              <Route path="/calendar" element={<PrivateRoute><CalendarView /></PrivateRoute>} />
              <Route path="/day-view" element={<PrivateRoute><ListView /></PrivateRoute>} />
              <Route path="/class/:id" element={<PrivateRoute><ClassDetail /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/class-management" element={<PrivateRoute><DashboardCalendar /></PrivateRoute>} />
              <Route path="/classroom/:id" element={<PrivateRoute><BookForm /></PrivateRoute>} />
              <Route path='*'  element={<NoAccess></NoAccess>}></Route>
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
