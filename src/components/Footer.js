import React from 'react'
import CarImage from '../assets/car2.gif';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const carImages = Array.from({ length: 26 }, (_, index) => (
    <img key={index} src={CarImage} alt="Car" className="w-14 h-14 mx-1" />
  ));
  return (
    <footer className="bg-gray-900 py-8 text-white">
      <div className="container mx-auto flex items-center justify-center">
        <div className="flex items-center justify-center">{carImages}</div>
      </div>
      <div className="container mx-auto mt-4">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-3 sm:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Contact</h2>
            <p>Email: contact@equalwheels.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
          <div className="col-span-3 sm:col-span-1">
            <h2 className="text-lg font-semibold mb-4">About</h2>
            <p>
              Equal Wheels is a trusted ride-sharing platform that provides safe and reliable transportation services.
            </p>
          </div>
          <div className="col-span-3 sm:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4 text-white">
              <Link to="/" className="text-white hover:text-gray-400 transition duration-300">
                <FaFacebook />
              </Link>
              <Link to="/" className="text-white hover:text-gray-400 transition duration-300">
                <FaTwitter />
              </Link>
              <Link to="/" className="text-white hover:text-gray-400 transition duration-300">
                <FaInstagram />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer