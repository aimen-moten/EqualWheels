import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaClipboardList, FaCheck, FaWallet, FaBell, FaUser } from 'react-icons/fa';

const DriverHeader = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/driver-home" className="text-white text-xl font-bold">
          Equal Wheels
        </Link>
        <div className="space-x-4">
          <Link to="/driver-rides" className="text-white hover:text-gray-300">
            <FaCar className="inline-block mr-2" />
            My Rides
          </Link>
          <Link to="/driver-ride-requests" className="text-white hover:text-gray-300">
            <FaClipboardList className="inline-block mr-2" />
            Ride Requests
          </Link>
          <Link to="/driver-accepted-rides" className="text-white hover:text-gray-300">
            <FaCheck className="inline-block mr-2" />
            Accepted Rides
          </Link>
          <Link to="/driver-earnings" className="text-white hover:text-gray-300">
            <FaWallet className="inline-block mr-2" />
            Earnings
          </Link>
          <Link to="/driver-notifications" className="text-white hover:text-gray-300">
            <FaBell className="inline-block mr-2" />
            Notifications
          </Link>
          <Link to="/driver-profile" className="text-white hover:text-gray-300">
            <FaUser className="inline-block mr-2" />
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default DriverHeader;
