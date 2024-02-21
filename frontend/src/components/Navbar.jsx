import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'
export default function Navbar() {
  const {isAuthenticated, logout, auth} = useAuth();
  return (
    <nav className="fixed w-full left-0 top-0 z-50 bg-secondary bg-opacity-50 shadow border-b-2 border-white">
      <ul className='flex justify-between items-center p-4 mr-6'>
        {isAuthenticated? <li className='nav-link'>Welcome {auth.user}, {auth.role}</li> : null}
        <li className='nav-link'><Link to="/">Home</Link></li>
        <li className='nav-link'><Link to="/about">ABOUT US</Link></li>
        <li className='nav-link'><Link to="/register" state={{role: "staff"}}>JOIN OUR TEAM!</Link></li>
        <li className='nav-link'><Link to="/login">ALREADY A MEMBER? LOGIN!</Link></li>
      </ul>


    </nav>
  )
}
