import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { RiLogoutCircleLine } from 'react-icons/ri';
import Logo from '../assets/logo.png';

const Hero = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      <div className="car-animation" />
      <div className="car-animation1" />
      <div className="car-animation2" />
      <div className="car-animation3" />
      <div className="p-6 border border-gray-800 rounded-lg max-w-sm bg-gray-800 text-gray-800 relative">
        {isAuthenticated && (
          <button
            onClick={() => logout({ returnTo: window.location.origin })}
            className="absolute top-4 right-4 text-red-600 hover:text-red-800"
          >
            <RiLogoutCircleLine size={24} />
          </button>
        )}
        <img src={Logo} alt="Equal Wheels Logo" className="w-50 h-50 mb-4" />
        <h1 className="text-4xl font-bold text-center mb-6 text-yellow-600">Welcome to Equal Wheels</h1>
        <p className="text-gray-100 text-center mb-8">
          Your Trusted Ride-Sharing Platform. Book a ride now and experience the best service.
        </p>
        <div className="flex justify-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/rider-home">
                <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md">
                  Go to Rider Dashboard
                </button>
              </Link>
              <Link to="/driver-home">
                <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md shadow-md">
                  Go to Driver Dashboard
                </button>
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md"
              >
                Login as Rider
              </button>
              <button
                onClick={() => loginWithRedirect({ screen_hint: 'signup', login_hint: 'driver' })}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md shadow-md"
              >
                Login as Driver
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
