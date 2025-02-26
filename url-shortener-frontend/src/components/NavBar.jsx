import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStoreContext } from '../contextApi/ContextApi';

const Navbar = () => {
  const { token, setToken } = useStoreContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Helper function to determine if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  const onLogoutHandler = () => {

    // set state of token
    setToken(null);

    // First remove the token from local storage
    localStorage.removeItem('USER_TOKEN');
    
    // Then use the navigate function to redirect
    navigate('/login');
  };

  // Determine if we're on an auth page (login or register/signup)
  const isAuthPage = isActive('/login') || isActive('/register') || isActive('/signup');

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Company Logo/Name */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-white font-bold text-xl">short<span className="text-blue-600">Link</span></span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <Link
                to="/"
                className={`${isActive('/') ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`${isActive('/about') ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium`}
              >
                About
              </Link>
              {token && (
                <Link
                  to="/dashboard"
                  className={`${isActive('/dashboard') ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* User Authentication Section - Desktop */}
          <div className="hidden md:flex md:items-center">
            {token ? (
              <button
                onClick={() => onLogoutHandler()}
                className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Logout
              </button>
            ) : (
              <div className="bg-gray-700 p-1 rounded-md">
                <div className="flex space-x-1">
                  <Link
                    to="/login"
                    className={`${
                      isActive('/login')
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:text-white'
                    } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`${
                      isActive('/register')
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:text-white'
                    } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Menu Icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close Icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className={`${isActive('/') ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} block px-3 py-2 rounded-md text-base font-medium`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`${isActive('/about') ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} block px-3 py-2 rounded-md text-base font-medium`}
          >
            About
          </Link>

          {token && (
            <Link
              to="/dashboard"
              className={`${isActive('/dashboard') ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} block px-3 py-2 rounded-md text-base font-medium`}
            >
              Dashboard
            </Link>
          )}

          {/* Mobile auth buttons */}
          {token ? (
            <button
              onClick={() => onLogoutHandler()}
              className="bg-gray-700 hover:bg-gray-600 text-gray-200 w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              Logout
            </button>
          ) : (
            <div className="bg-gray-700 p-1 rounded-md mt-2">
              <div className="grid grid-cols-2 gap-1">
                <Link
                  to="/login"
                  className={`${
                    isActive('/login')
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:text-white'
                  } px-3 py-2 rounded-md text-base font-medium text-center transition-colors duration-200`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`${
                    isActive('/signup')
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:text-white'
                  } px-3 py-2 rounded-md text-base font-medium text-center transition-colors duration-200`}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;