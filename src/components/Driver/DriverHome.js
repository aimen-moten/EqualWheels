import React, { useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCar } from 'react-icons/fa';
import DriverHeader from './DriverHeader';
import mapboxgl from 'mapbox-gl';

const DriverHome = () => {
  const { isAuthenticated, user } = useAuth0();
  const mapContainerRef = useRef(null);
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoidmFpc2huYXZpMzk2OSIsImEiOiJjbGpiOGhqd2UxdGdyM2hxbm1vMDZxa2JqIn0.nsJYS6QQxVmEr2ZajJywYQ';

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40], 
      zoom: 9, 
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
        map.setCenter([longitude, latitude]);
      });
    }
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen">
    <DriverHeader/>
      <div className="container mx-auto py-8">
        {isAuthenticated && (
          <div className="text-right">
            <p className="text-white">Welcome, {user.name}!</p>
            <p className="text-white">Email: {user.email}</p>
          </div>
        )}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6 lg:col-span-3 p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center justify-center mb-4">
              <FaMapMarkerAlt size={36} className="text-blue-500 mr-2" />
              <h2 className="text-lg font-semibold text-white">Current Location</h2>
            </div>
            <div
              ref={mapContainerRef}
              className="h-40 bg-white rounded-lg"
              style={{ width: '100%' }}
            />

          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-3 p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center justify-center mb-4">
              <FaCar size={36} className="text-yellow-500 mr-2" />
              <h2 className="text-lg font-semibold text-white">Total Rides</h2>
            </div>
            <div className="h-40 bg-white rounded-lg" />
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-3 p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center justify-center mb-4">
              <FaCar size={36} className="text-green-500 mr-2" />
              <h2 className="text-lg font-semibold text-white">Completed Rides</h2>
            </div>
            <div className="h-40 bg-white rounded-lg" />
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-3 p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center justify-center mb-4">
              <FaCar size={36} className="text-red-500 mr-2" />
              <h2 className="text-lg font-semibold text-white">Cancelled Rides</h2>
            </div>
            <div className="h-40 bg-white rounded-lg" />
          </div>
        </div>

        <div className="mt-8">
          <h1 className="text-4xl font-bold text-center mb-6 text-yellow-600">Driver Dashboard</h1>
          <p className="text-gray-100 text-center mb-8">
            Here, you can manage your rides and view your driver profile.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/driver-rides">
              <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md">
                Manage Rides
              </button>
            </Link>
            <Link to="/driver-profile">
              <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md shadow-md">
                View Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverHome;
