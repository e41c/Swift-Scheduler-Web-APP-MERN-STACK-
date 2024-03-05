import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Navbar() {
  const { isAuthenticated, logout, auth } = useAuth();


  const navItems = [
    { name: "greet", link: null, auth: true, text: `Hello, ${auth?.user}`, onclick: null },
    { name: "logout", link: null, auth: true, text: "Logout", onclick: logout },
    { name: "profile", link: "/profile", auth: true, text: "Profile", onclick: null },
    { name: "login", link: "/login", auth: false, text: "Login", onclick: null },
    { name: "register", link: "/register", auth: false, text: "Join Our Team", onclick: null },
  ];



  return (
    <nav className="fixed w-full left-0 top-0 z-50 bg-secondary bg-opacity-50 shadow border-b-2 border-white">
      <ul className='flex justify-between items-center p-4 mr-6'>
        {navItems.map((item, index) => {
          // Render the item if authentication matches the item's auth property
          if (isAuthenticated && item.auth) {
            return (
              <li key={index} className='nav-link'>
                {item.link ? 
                  <Link to={item.link}>{item.text}</Link> :
                  <button onClick={item.onclick}>{item.text}</button>
                }
              </li>
            )
          }else if(!item.auth && !isAuthenticated){
            return(
              <li key={index} className='nav-link'>
                {item.link ? 
                  <Link to={item.link}>{item.text}</Link> :
                  <button onClick={item.onclick}>{item.text}</button>
                }
              </li>
            )
          }
        })}
        <li className='nav-link'>
          <Link to='/'>Home</Link>
        </li>
        <li className='nav-link'>
          <Link to='/about'>About Us</Link>
        </li>
      </ul>
    </nav>
  )
}
