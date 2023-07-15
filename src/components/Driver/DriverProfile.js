import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FaUser, FaMapMarkerAlt, FaCheckCircle, FaPlusCircle } from 'react-icons/fa';
import DriverHeader from './DriverHeader';

const DriverProfile = () => {
  const { isAuthenticated, user } = useAuth0();
  const [avatar, setAvatar] = useState(null);
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');  const [availability, setAvailability] = useState({
    monday: [{ from: '', to: '' }],
    tuesday: [{ from: '', to: '' }],
    wednesday: [{ from: '', to: '' }],
    thursday: [{ from: '', to: '' }],
    friday: [{ from: '', to: '' }],
    saturday: [{ from: '', to: '' }],
    sunday: [{ from: '', to: '' }],
  });
  
  const handleUpdateAvatar = (newAvatar) => {
    setAvatar(newAvatar);
  };

  const handleUpdateGender = (newGender) => {
    setGender(newGender);
  };

  const handleUpdateAvailability = (day, index, type, value) => {
    setAvailability((prevAvailability) => ({
      ...prevAvailability,
      [day]: prevAvailability[day].map((slot, i) => (i === index ? { ...slot, [type]: value } : slot)),
    }));
  };

  const handleAddTimeSlot = (day) => {
    setAvailability((prevAvailability) => ({
      ...prevAvailability,
      [day]: [...prevAvailability[day], { from: '', to: '' }],
    }));
  };
  const handleUpdateLocation = (newLocation) => {
    setLocation(newLocation);
  };
  return (
    <div className="bg-gray-900 min-h-screen justify-center items-center">
    <DriverHeader />
      <div className=" max-wd-300 p-8 rounded-lg bg-gray-900"> 
        {isAuthenticated && (
          <div className="text-right">
            <p className="text-white">Welcome, {user.name}!</p>
            <p className="text-white">Email: {user.email}</p>
          </div>
        )}
        <div className="mt-4">
          <div className="flex items-center justify-center mb-4">
            <FaUser size={36} className="text-blue-500 mr-2" />
            <h2 className="text-lg font-semibold text-white">Profile</h2>
          </div>
          <div className="mt-2 flex flex-col items-center">
            {avatar ? (
              <img src={avatar} alt="Avatar" className="w-32 h-32 rounded-full object-cover" />
            ) : (
              <div className="w-32 h-32 bg-gray-500 rounded-full" />
            )}
            <label
              htmlFor="avatar"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
            >
              Upload Avatar
              <input
                type="file"
                id="avatar"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleUpdateAvatar(URL.createObjectURL(e.target.files[0]))}
              />
            </label>
          </div>
          <div className="mt-4">
            <label className="text-white">Gender:</label>
            <select
              value={gender}
              onChange={(e) => handleUpdateGender(e.target.value)}
              className="block w-full px-4 py-2 bg-gray-800 text-white rounded-md mt-2"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mt-4">
            <label className="text-white">Current Location(City):</label>
            <input
              type="text"
              value={location}
              onChange={(e) => handleUpdateLocation(e.target.value)}
              placeholder="Enter your current location"
              className="block w-full px-4 py-2 bg-gray-800 text-white rounded-md mt-2"
            />
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-white">Availability:</h2>
            <table className="table-auto w-full mt-2 text-white">
              <thead>
                <tr>
                  <th className="px-4 py-2">Day</th>
                  <th className="px-4 py-2">Available</th>
                  <th className="px-4 py-2">From</th>
                  <th className="px-4 py-2">To</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(availability).map(([day, timeSlots]) => (
                  <React.Fragment key={day}>
                    {timeSlots.map((slot, index) => (
                      <tr key={`${day}-${index}`}>
                        {index === 0 ? (
                          <td className="border px-4 py-2" rowSpan={timeSlots.length}>
                            {day.charAt(0).toUpperCase() + day.slice(1)}
                          </td>
                        ) : null}
                        <td className="border px-4 py-2">
                          <input
                            type="checkbox"
                            checked={slot.available}
                            onChange={(e) =>
                              handleUpdateAvailability(day, index, 'available', e.target.checked)
                            }
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <input
                            type="time"
                            value={slot.from}
                            onChange={(e) =>
                              handleUpdateAvailability(day, index, 'from', e.target.value)
                            }
                            className="w-24 bg-gray-800 text-white rounded-md"
                            disabled={!slot.available}
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <input
                            type="time"
                            value={slot.to}
                            onChange={(e) => handleUpdateAvailability(day, index, 'to', e.target.value)}
                            className="w-24 bg-gray-800 text-white rounded-md"
                            disabled={!slot.available}
                          />
                        </td>
                        {index === 0 ? (
                          <td className="border px-4 py-2" rowSpan={timeSlots.length}>
                            <button
                              className="text-green-500"
                              onClick={() => handleAddTimeSlot(day)}
                            >
                              <FaPlusCircle />
                            </button>
                          </td>
                        ) : null}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
  
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;
