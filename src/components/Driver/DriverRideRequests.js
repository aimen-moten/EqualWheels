import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DriverHeader from './DriverHeader';

const DriverRideRequests = () => {
  const [rideRequests, setRideRequests] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRequestIndex, setSelectedRequestIndex] = useState(null);

  useEffect(() => {
    // Fetch random rider profiles and ride requests from the API
    fetch('https://randomuser.me/api/?results=30')
      .then((response) => response.json())
      .then((data) => {
        // Process the API response to create ride request data
        const requests = data.results.map((user) => ({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          gender: user.gender,
          age: user.dob.age,
          location: user.location.city,
          from: 'Source Location',
          to: 'Destination Location',
          time: '10:00 AM',
          status: 'requested',
          picture: user.picture.large,
        }));
        setRideRequests(requests);
      })
      .catch((error) => {
        console.error('Error fetching ride requests:', error);
      });
  }, []);

  const handleAcceptRequest = (index) => {
    setSelectedRequestIndex(index);
    setShowPopup(true);
  };

  const handleCancelRequest = () => {
    setSelectedRequestIndex(null);
    setShowPopup(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <DriverHeader />
      <div className="max-w-[100] mx-auto p-4">
        <h2 className="text-lg font-semibold mb-4">Ride Requests</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {rideRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-800 rounded-lg p-4 shadow-md"
            >
              <img
                src={request.picture}
                alt={request.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold">{request.name}</h3>
              <p>Gender: {request.gender}</p>
              <p>Age: {request.age}</p>
              <p>Location: {request.location}</p>
              <p>From: {request.from}</p>
              <p>To: {request.to}</p>
              <p>Time: {request.time}</p>
              <motion.button
                onClick={() =>
                  selectedRequestIndex === index ? handleCancelRequest() : handleAcceptRequest(index)
                }
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`${
                  selectedRequestIndex === index ? 'bg-red-500' : 'bg-blue-500'
                } text-white px-4 py-2 rounded-md mt-4`}
              >
                {selectedRequestIndex === index ? 'Cancel Request' : 'Accept Request'}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg p-4 shadow-lg"
          >
            <h3 className="text-lg font-semibold mb-2">Request Accepted!</h3>
            <p className="text-gray-600">
              You have accepted the ride request from {rideRequests[selectedRequestIndex]?.name}.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DriverRideRequests;
