import React from 'react';
import { motion } from 'framer-motion';
import RiderHeader from './RiderHeader';

const RiderRideHistory = () => {
  const rideHistoryData = [
    {
      id: 1,
      date: '2023-07-10',
      from: 'Home',
      to: 'Work',
      distance: '10 km',
      fare: '$12.50',
      driver: 'John Doe',
    },
    {
      id: 2,
      date: '2023-07-12',
      from: 'Work',
      to: 'Home',
      distance: '10 km',
      fare: '$15.00',
      driver: 'Jane Smith',
    },
    {
      id: 3,
      date: '2023-07-14',
      from: 'Home',
      to: 'Work',
      distance: '10 km',
      fare: '$12.50',
      driver: 'John Doe',
    },
    {
      id: 4,
      date: '2023-07-16',
      from: 'Work',
      to: 'Home',
      distance: '10 km',
      fare: '$15.00',
      driver: 'Jane Smith',
    },
      ];

  return (
    <div className="bg-gray-900 min-h-screen">
    <RiderHeader/>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-white mb-4">Ride History</h2>
        <motion.div
          className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="divide-y divide-gray-200">
            {rideHistoryData.map((ride) => (
              <li key={ride.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-medium text-blue-600">{ride.date}</p>
                    <p className="text-sm font-medium text-gray-100">{ride.distance}</p>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex text-gray-200">
                      <p className="mr-4 mb-2 sm:mb-0">
                        <span className="font-semibold">From:</span> {ride.from}
                      </p>
                      <p>
                        <span className="font-semibold">To:</span> {ride.to}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <p className="text-sm font-medium text-gray-100">{ride.driver}</p>
                      <p className="text-sm font-medium text-green-600">{ride.fare}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default RiderRideHistory;