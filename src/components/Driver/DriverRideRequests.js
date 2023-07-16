import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DriverHeader from './DriverHeader';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, query, update, get, orderByChild, equalTo } from 'firebase/database';
import { useAuth0 } from '@auth0/auth0-react';


const firebaseConfig = {
  apiKey: "AIzaSyDmNXdETFpXH7NT9kTmZop4laKyjdWkXwE",
  authDomain: "equalwheels.firebaseapp.com",
  projectId: "equalwheels",
  storageBucket: "equalwheels.appspot.com",
  messagingSenderId: "749969494574",
  appId: "1:749969494574:web:7bc950fbf7fa1bd63e05bf",
  measurementId: "G-BHCM6N5K8R"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const DriverRideRequests = () => {
  const { user } = useAuth0();
  const [rideRequests, setRideRequests] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRequestIndex, setSelectedRequestIndex] = useState(null);
  const [acceptedRides, setAcceptedRides] = useState([]);
  
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=30')
      .then((response) => response.json())
      .then((data) => {
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
    console.log(acceptedRides);
    if (user && user.email) {
      const driversRef = ref(db, 'drivers');
      const driverQuery = query(driversRef, orderByChild('email'), equalTo(user.email));
      get(driverQuery).then((snapshot) => {
        if (snapshot.exists()) {
          const driverData = snapshot.val();
          const driverId = Object.keys(driverData)[0];
          const driverAcceptedRides = driverData[driverId]?.acceptedRides || [];
          setAcceptedRides([...driverAcceptedRides, rideRequests[index]]);
          updateDriverAcceptedRides(driverId, [...driverAcceptedRides, rideRequests[index]]);
        }
      });
    }else{
      console.log("error");
    }
  }

  const handleCancelRequest = () => {
    setSelectedRequestIndex(null);
    setShowPopup(false);
    if (user && user.email) {
      const driversRef = ref(db, 'drivers');
      const driverQuery = query(driversRef, orderByChild('email'), equalTo(user.email));
      get(driverQuery).then((snapshot) => {
        if (snapshot.exists()) {
          const driverData = snapshot.val();
          const driverId = Object.keys(driverData)[0];
          const driverAcceptedRides = driverData[driverId]?.acceptedRides || [];
          const updatedAcceptedRides = driverAcceptedRides.filter(
            (ride) => ride.id !== rideRequests[selectedRequestIndex].id
          );
          setAcceptedRides(updatedAcceptedRides);
          updateDriverAcceptedRides(driverId, updatedAcceptedRides);
        }
      });
    }
  };

  const updateDriverAcceptedRides = (driverId, newAcceptedRides) => {
    const driverRef = ref(db, 'drivers/' + driverId);
    update(driverRef, { acceptedRides: newAcceptedRides });
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
