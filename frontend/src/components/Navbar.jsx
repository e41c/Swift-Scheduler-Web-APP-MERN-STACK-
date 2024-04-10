import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import GZLogo from '../assets/dance.png';

export default function Navbar() {
  const { isAuthenticated, logout, auth } = useAuth();
  const firstName = auth.user ? auth.user.split('.')[0] : '';

  const navItems = [
    { name: "greet", link: null, auth: true, text: `Hello, ${firstName}`, onclick: null },
    { name: "profile", link: "/profile", auth: true, text: "Profile", onclick: null },
    { name: "login", link: "/login", auth: false, text: "Login", onclick: null },
    // { name: "register", link: "/register", auth: false, text: "Join Our Team", onclick: null, state: {role: "staff"} },
    { name: "book", link: "/calendar", auth: true, text: "Book Classes", onclick: null },
    { name: "logout", link: null, auth: true, text: "Logout", onclick: logout },
    
    
  ];

  console.log(auth.isAdmin)
  return (
    <nav className="w-full h-auto bg-[#1d1d1d] shadow-none lg:px-24 md:px-16 sm:px-6 px-4 py-3">
      <div className="justify-between mx-auto lg:w-full md:items-center md:flex">
        {/* Navigation Bar Logo that redirects to landing page*/}
        <div className="flex items-center justify-between py-1 md:py-1 md:block">
          <Link className="text-3xl text-indigo-600 font-semibold flex items-end gap-x-1 relative"
            to="./">
              <img src={GZLogo} alt="Groove Zone Logo" className="w-9"/>
              Groove Zone
          </Link> 
        </div>
        <ul className="list-none lg:flex md:flex sm:block block items-center gap-x-5 gap-y-16">
          {navItems.map((item, index) => {
            if ((item.auth && isAuthenticated) || (!item.auth && !isAuthenticated)) {
              return (
                <li key={index} className='nav-link'>
                  {item.link ? (
                    <Link 
                      to={item.link} 
                      state={item.state}
                      className="text-gray-500 text-lg font-medium hover:text-indigo-600 ease-out duration-700"
                    >
                        {item.text}
                    </Link>
                  ) : (
                    <button 
                      onClick={item.onclick}
                      className="text-gray-500 text-lg font-medium hover:text-indigo-600 ease-out duration-700"
                    >
                      {item.text}
                    </button>
                  )}
                </li>
              );
            }
            return null;
          })}
        <li className='nav-link'>
          <Link to='/' className="text-gray-500 text-lg font-medium hover:text-indigo-600 ease-out duration-700">Home</Link>
        </li>
        <li className='nav-link'>
          <Link to='/about' className="text-gray-500 text-lg font-medium hover:text-indigo-600 ease-out duration-700">About Us</Link>
        </li>
      </ul>
      </div>
    </nav>
  )
}
