import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DriverHeader from './DriverHeader';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { FiMapPin, FiDollarSign, FiCalendar } from 'react-icons/fi';


const sampleRides = [
  {
    id: 1,
    riderName: 'John Doe',
    startLocation: 'New York',
    endLocation: 'Los Angeles',
    startLocationLatitude: 40.7128,
    startLocationLongitude: -74.0060,
    endLocationLatitude: 34.0522,
    endLocationLongitude: -118.2437,
    fare: 150,
    date: '2023-07-10',
  },
  {
    id: 2,
    riderName: 'Alice Johnson',
    startLocation: 'San Francisco',
    endLocation: 'Seattle',
    startLocationLatitude: 37.7749,
    startLocationLongitude: -122.4194,
    endLocationLatitude: 47.6062,
    endLocationLongitude: -122.3321,
    fare: 120,
    date: '2023-07-15',
  },
  {
    id: 3,
    riderName: 'Bob Smith',
    startLocation: 'Chicago',
    endLocation: 'Houston',
    startLocationLatitude: 41.8781,
    startLocationLongitude: -87.6298,
    endLocationLatitude: 29.7604,
    endLocationLongitude: -95.3698,
    fare: 180,
    date: '2023-07-20',
  },
  {
    id: 4,
    riderName: 'Eva Williams',
    startLocation: 'Boston',
    endLocation: 'Miami',
    startLocationLatitude: 42.3601,
    startLocationLongitude: -71.0589,
    endLocationLatitude: 25.7617,
    endLocationLongitude: -80.1918,
    fare: 200,
    date: '2023-07-25',
  },
  {
    id: 5,
    riderName: 'Michael Anderson',
    startLocation: 'Denver',
    endLocation: 'Las Vegas',
    startLocationLatitude: 39.7392,
    startLocationLongitude: -104.9903,
    endLocationLatitude: 36.1699,
    endLocationLongitude: -115.1398,
    fare: 140,
    date: '2023-07-28',
  },
  {
    id: 6,
    riderName: 'Emily Johnson',
    startLocation: 'Seattle',
    endLocation: 'San Francisco',
    startLocationLatitude: 47.6062,
    startLocationLongitude: -122.3321,
    endLocationLatitude: 37.7749,
    endLocationLongitude: -122.4194,
    fare: 130,
    date: '2023-08-02',
  },
  {
    id: 7,
    riderName: 'Alex Turner',
    startLocation: 'Miami',
    endLocation: 'New York',
    startLocationLatitude: 25.7617,
    startLocationLongitude: -80.1918,
    endLocationLatitude: 40.7128,
    endLocationLongitude: -74.0060,
    fare: 170,
    date: '2023-08-05',
  },
  {
    id: 8,
    riderName: 'Sophia Williams',
    startLocation: 'Los Angeles',
    endLocation: 'Chicago',
    startLocationLatitude: 34.0522,
    startLocationLongitude: -118.2437,
    endLocationLatitude: 41.8781,
    endLocationLongitude: -87.6298,
    fare: 160,
    date: '2023-08-08',
  },
  {
    id: 9,
    riderName: 'Oliver Smith',
    startLocation: 'Houston',
    endLocation: 'Denver',
    startLocationLatitude: 29.7604,
    startLocationLongitude: -95.3698,
    endLocationLatitude: 39.7392,
    endLocationLongitude: -104.9903,
    fare: 140,
    date: '2023-08-12',
  },
  {
    id: 10,
    riderName: 'Emma Davis',
    startLocation: 'Las Vegas',
    endLocation: 'Boston',
    startLocationLatitude: 36.1699,
    startLocationLongitude: -115.1398,
    endLocationLatitude: 42.3601,
    endLocationLongitude: -71.0589,
    fare: 190,
    date: '2023-08-15',
  },
  {
    id: 11,
    riderName: 'Noah Johnson',
    startLocation: 'New York',
    endLocation: 'Seattle',
    startLocationLatitude: 40.7128,
    startLocationLongitude: -74.0060,
    endLocationLatitude: 47.6062,
    endLocationLongitude: -122.3321,
    fare: 120,
    date: '2023-08-20',
  },
];


const DriverRideHistory = () => {
  const [selectedRide, setSelectedRide] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-900 min-h-screen text-white"
    >
      <DriverHeader />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto p-4"
      >
        <h2 className="text-4xl font-semibold mb-8 text-center">Ride History</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sampleRides.map((ride) => (
            <motion.div
              key={ride.id}
              whileHover={{ y: -5, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 rounded-lg p-4 shadow-md cursor-pointer transition-transform"
              onClick={() => setSelectedRide(ride)}
            >
              <div className="flex items-center justify-center mb-4">
                <FiMapPin size={36} className="text-blue-500 mr-2" />
                <h3 className="text-xl font-semibold">{ride.riderName}</h3>
              </div>
              <div className="flex items-center mb-2">
                <FiMapPin className="text-gray-400 mr-2" />
                <p className="text-gray-300">Start Location: {ride.startLocation}</p>
              </div>
              <div className="flex items-center mb-2">
                <FiMapPin className="text-gray-400 mr-2" />
                <p className="text-gray-300">End Location: {ride.endLocation}</p>
              </div>
              <div className="flex items-center mb-2">
                <FiDollarSign className="text-yellow-400 mr-2" />
                <p className="text-yellow-300">Fare: ${ride.fare}</p>
              </div>
              <div className="flex items-center">
                <FiCalendar className="text-gray-400 mr-2" />
                <p className="text-gray-300">Date: {ride.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
        {selectedRide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 p-4 bg-gray-800 rounded-lg shadow-md"
          >
            <h3 className="text-2xl font-semibold mb-2">{selectedRide.riderName}</h3>
            <p className="mb-2">Start Location: {selectedRide.startLocation}</p>
            <p className="mb-2">End Location: {selectedRide.endLocation}</p>
            <p className="mb-2">Fare: ${selectedRide.fare}</p>
            <p className="mb-2">Date: {selectedRide.date}</p>
            <div className="flex justify-center mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-md"
                onClick={() => setSelectedRide(null)}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default DriverRideHistory;