import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="fixed w-full left-0 top-0 z-50 bg-secondary bg-opacity-50 shadow border-b-2 border-white">
      <ul className='flex justify-between items-center p-4 mr-6'>
        <li className='nav-link'><Link to="/">Home</Link></li>
        <li className='nav-link'><Link to="/about">ABOUT US</Link></li>
        <li className='nav-link'><Link to="/register">JOIN OUR TEAM!</Link></li>
        <li className='nav-link'><Link to="/login">ALREADY A MEMBER? LOGIN!</Link></li>
      </ul>


    </nav>
  )
}
