import React, { useState } from 'react';
import { Dumbbell, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [navBar, setNavBar] = useState(false); // Corrected variable name

  const navItemsGuest = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'About Us',
      link: '/about',
    },
    {
      name: 'Join our team!',
      link: '/register',
    },
  ];

  return (
    <>
      <nav className="w-full h-auto bg-[#1d1d1d] shadow-none lg:px-24 md:px-16 sm:px-6 px-4 py-3">
        <div className="justify-between mx-auto lg:w-full md:items-center md:flex">
          {/* Navbar logo & toggle button section */}
          <div>
            <div className="flex items-center justify-between py-1 md:py-1 md:block">
              {/* Logo section */}
              <Link className="text-3xl text-indigo-600 font-semibold tracking-[0.1rem] flex items-end gap-x-1 relative"
                to="./">
                GZ
              </Link>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none border border-transparent focus:border-gray-400 focus:border"
                  onClick={() => setNavBar(!navBar)}
                >
                  {navBar ? (
                    <X className="text-gray-400 cursor-pointer" size={24} />
                  ) : (
                    <Menu className="text-gray-400 cursor-pointer" size={24} />
                  )}
                </button>
              </div>
            </div>
          </div>
          {/* Navbar menu items section */}
          <div
            className={`flex justify-between items-center md:block ${
              navBar ? 'block' : 'hidden'
            }`}
          >
            <ul className="list-none lg:flex md:flex sm:block block items-center gap-x-5 gap-y-16">
              {navItemsGuest.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    className="text-gray-500 text-lg font-medium hover:text-indigo-600 ease-out duration-700"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <Link 
                to="./login"
                className={`text-base text-gray-200 bg-indigo-600 font-medium px-3 py-1.5 rounded gap-x-1 hover:bg-indigo-600/70 ease-out duration-500`}>
                  Login
              </Link> 
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
