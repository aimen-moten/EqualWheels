import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DriverHeader from './DriverHeader';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, query, get, orderByChild, equalTo } from 'firebase/database';
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

const DriverAcceptedRides = () => {
  const { user } = useAuth0();
  const [acceptedRides, setAcceptedRides] = useState([]);

  useEffect(() => {
    if (user && user.email) {
      const driversRef = ref(db, 'drivers');
      const driverQuery = query(driversRef, orderByChild('email'), equalTo(user.email));
      get(driverQuery).then((snapshot) => {
        if (snapshot.exists()) {
          const driverData = snapshot.val();
          const driverId = Object.keys(driverData)[0];
          const driverAcceptedRides = driverData[driverId]?.acceptedRides || [];
          setAcceptedRides(driverAcceptedRides);
        }
      });
    }
  }, [user]);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <DriverHeader />
      <div className="max-w-[100] mx-auto p-4">
        <h2 className="text-lg font-semibold mb-4">Driver Accepted Rides</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {acceptedRides.map((ride) => (
            <motion.div
              key={ride.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-800 rounded-lg p-4 shadow-md"
            >
              <img
                src={ride.picture}
                alt={ride.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold">{ride.name}</h3>
              <p>Gender: {ride.gender}</p>
              <p>Age: {ride.age}</p>
              <p>Location: {ride.location}</p>
              <p>From: {ride.from}</p>
              <p>To: {ride.to}</p>
              <p>Time: {ride.time}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DriverAcceptedRides;
