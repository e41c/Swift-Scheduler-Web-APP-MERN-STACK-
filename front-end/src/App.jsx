import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
//import 'bootstrap/dist/css/bootstrap.min.css'
import LandingPage from './components/landing-page/LandingPage'
import Register from './components/register/Register'
import Login from './components/login/Login'
import Home from './components/home/Home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<LandingPage />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
