import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FaUser, FaPlusCircle } from 'react-icons/fa';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, query, update, get, orderByChild, equalTo } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'; // Add getDownloadURL import
import RiderHeader from './RiderHeader';

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

const RiderProfile = () => {
  
  const { isAuthenticated, user } = useAuth0();
  const [avatar, setAvatar] = useState(null);
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  
  useEffect(() => {
    // loading the profile data of rider
    if (isAuthenticated && user && user.email) {
      const ridersRef = ref(db, 'riders');
      const emailQuery = query(ridersRef, orderByChild('email'), equalTo(user.email));

      get(emailQuery)
        .then((snapshot) => {
          if (snapshot.exists()) {
            // if rider exist fetch data
            const riderData = snapshot.val();
            const riderKey = Object.keys(riderData)[0];
            const RiderProfile = riderData[riderKey];
            setAvatar(RiderProfile.avatar);
            setGender(RiderProfile.gender);
            setLocation(RiderProfile.location);
          } else {
            //if rider doesn't exist
            setAvatar(null);
            setGender('');
            setLocation('');
          }
        })
        .catch((error) => {
          console.error('Error checking rider profile:', error);
        });
    }
  }, [isAuthenticated, user]);

  const handleUpdateAvatar = async (newAvatar) => {
    setAvatar(newAvatar);
  
    if (isAuthenticated && user && user.email) {
      const storage = getStorage();
      const storageReference = storageRef(storage, `avatars/${user.email}`);
      try {
        const response = await fetch(newAvatar);
        const blob = await response.blob();
        await uploadBytes(storageReference, blob);
          const downloadURL = await getDownloadURL(storageReference);
          if (downloadURL) {
          setAvatar(downloadURL);
        } else {
          console.error('Error getting download URL of the avatar image.');
        }
      } catch (error) {
        console.error('Error updating avatar:', error);
      }
    }
  };
  
  


  const handleUpdateGender = (newGender) => {
    setGender(newGender);
  };

  const handleUpdateLocation = (newLocation) => {
    setLocation(newLocation);
  };

  const handleSaveProfile = () => {
    if (!isAuthenticated) {
      return;
    }

    const riderData = {
      avatar,
      gender,
      location,
      user,
      email: user.email,
    };
    const ridersRef = ref(db, 'riders');
    const emailQuery = query(ridersRef, orderByChild('email'), equalTo(user.email));

  get(emailQuery)
    .then((snapshot) => {
      // if the rider with the email exists, update the existing record
      if (snapshot.exists()) {
        const riderKey = Object.keys(snapshot.val())[0];
        const riderRefToUpdate = ref(db, `riders/${riderKey}`);

        // update the existing rider record
        update(riderRefToUpdate, riderData)
          .then(() => {
            alert('rider profile updated successfully!');
          })
          .catch((error) => {
            console.error('Error updating rider profile:', error);
            alert('Error updating rider profile. Please check the console for details.');
          });
      } else {
        // if the rider with the email does not exist, add a new record
        push(ridersRef, riderData)
          .then(() => {
            alert('rider profile added successfully!');
          })
          .catch((error) => {
            console.error('Error adding rider profile:', error);
            alert('Error adding rider profile. Please check the console for details.');
          });
      }
    })
    .catch((error) => {
      console.error('Error checking rider profile:', error);
      alert('Error checking rider profile. Please check the console for details.');
    });
};


  return (
    <div className="bg-gray-900 min-h-screen justify-center items-center">
      <RiderHeader />
      <div className="max-wd-300 p-8 rounded-lg bg-gray-900">
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
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
              onClick={handleSaveProfile}
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderProfile;