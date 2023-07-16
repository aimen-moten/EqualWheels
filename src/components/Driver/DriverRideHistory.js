import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DriverHeader from './DriverHeader';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';


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
];
const CustomMarker = ({ latitude, longitude, text }) => (
  <div className="marker" style={{ fontSize: '14px', fontWeight: 'bold' }}>
    {text}
  </div>
);

const DriverRideHistory = () => {
  const [selectedRide, setSelectedRide] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 3,
  });

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
        <h2 className="text-2xl font-semibold mb-4">Ride History</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-1">
          {sampleRides.map((ride) => (
            <motion.div
              key={ride.id}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
              className="bg-gray-800 rounded-lg p-4 shadow-md cursor-pointer"
              onClick={() => setSelectedRide(ride)}
            >
              <h3 className="text-lg font-semibold mb-2">{ride.riderName}</h3>
              <p className="mb-2">Start Location: {ride.startLocation}</p>
              <p className="mb-2">End Location: {ride.endLocation}</p>
              <p className="mb-2">Fare: ${ride.fare}</p>
              <p className="mb-2">Date: {ride.date}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DriverRideHistory;