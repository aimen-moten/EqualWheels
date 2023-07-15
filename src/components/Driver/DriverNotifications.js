import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import DriverHeader from './DriverHeader';
import useSound from 'use-sound';
const notificationSound = require("../../assets/mixkit-bubble-pop-up-alert-notification-2357.wav");

const fakeNotifications = [
  {
    message: 'New ride request received',
    timestamp: '2023-07-16T12:34:56Z',
    isRead: false,
  },
  {
    message: 'Your ride has been approved',
    timestamp: '2023-07-15T10:20:30Z',
    isRead: true,
  },
  {
    message: 'Upcoming ride reminder',
    timestamp: '2023-07-14T08:15:45Z',
    isRead: true,
  },
];
const DriverNotifications = () => {
  const [notifications, setNotifications] = useState(fakeNotifications);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [playNotificationSound] = useSound(notificationSound);

  useEffect(() => {
    const addNewNotification = () => {
      setTimeout(() => {
        const newNotification = {
          message: 'New ride request',
          timestamp: new Date().toISOString(),
          isRead: false,
        };
        setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
        playNotificationSound();
      }, 3000);
    };
    addNewNotification();
  }, [playNotificationSound]);

  const markAsRead = (index) => {
    setNotifications((prevNotifications) => {
      const updatedNotifications = [...prevNotifications];
      updatedNotifications[index].isRead = true;
      return updatedNotifications;
    });
  };

  const handleNotificationClick = (index) => {
    setSelectedNotification(notifications[index]);
    setShowPopup(true);
    markAsRead(index);
  };

  return (
    <div className="bg-gray-900 min-h-screen justify-center items-center">
    <DriverHeader/>
      <div className="max-w-md p-4 mx-auto">
        <div className="flex items-center mb-4">
          <FaBell className="mr-2 text-blue-500" size={24} />
          <h2 className="text-lg font-semibold text-blue-500">Notifications</h2>
        </div>
        <AnimatePresence>
          {notifications.map((notification, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.3, type: 'spring' }}
              className={`p-4 rounded-lg mb-2 ${
                notification.isRead ? 'bg-gray-800' : 'bg-blue-500'
              }`}
              onClick={() => handleNotificationClick(index)}
            >
              <p className={`text-sm ${notification.isRead ? 'text-gray-300' : 'text-white'}`}>
                {notification.message}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(notification.timestamp).toLocaleString()}
              </p>
              {!notification.isRead && (
                <button
                  className="text-xs text-blue-200 mt-2 focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    markAsRead(index);
                  }}
                >
                  Mark as Read
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {notifications.length === 0 && (
          <p className="text-center text-sm text-gray-500">No notifications</p>
        )}
      </div>
      {showPopup && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowPopup(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="bg-white p-4 rounded-lg"
          >
            <h3 className="text-lg font-semibold mb-2">{selectedNotification?.message}</h3>
            <p className="text-sm text-gray-500">
              {selectedNotification && new Date(selectedNotification.timestamp).toLocaleString()}
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DriverNotifications;
