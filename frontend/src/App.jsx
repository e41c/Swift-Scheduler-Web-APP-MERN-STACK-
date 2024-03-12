import Navbar from './components/Navbar'
import About from './components/About'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import CalendarView from './components/CalendarView'
import AuthProvider from './AuthContext'
import ListView from './components/ListView'
import PublicRoute from './components/routing/PublicRoute'
import PrivateRoute from './components/routing/PrivateRoute'

function App() {

  return (

    <>
    <div className="w-full min-h-screen h-auto bg-[#171717]">
    <AuthProvider>
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
        </Routes>
      </Router>
    </AuthProvider>
    </div>
    </>
  )
}

export default App
