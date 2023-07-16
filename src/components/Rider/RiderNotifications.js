import React from 'react'
import RiderHeader from './RiderHeader'
import { now } from 'mongoose'

const data = [
  {message: "Your package has been delivered successfully.", time: "3 hours ago"},
{message: "Your appointment has been rescheduled to tomorrow.", time: "5 hours ago"},
{message: "Your payment has been processed. Thank you for your purchase.", time: "12 hours ago"},
{message: "Your flight has been delayed by 2 hours.", time: "1 day ago"},
{message: "Your reservation has been confirmed. Enjoy your stay!", time: "2 days ago"},
{message: "Your request for a refund has been approved.", time: "3 days ago"},
{message: "Your subscription has expired. Renew now to continue access.", time: "1 week ago"},
{message: "Your password has been changed successfully.", time: "2 weeks ago"},
{message: "Your order has been shipped. Tracking number: 1234567890.", time: "3 weeks ago"},
{message: "Your account has been credited with $100.00.", time: "1 month ago"},
]
// const [date] = new Date(now)
const NotificationCard = (props) => {
 
  return (
    <div className='bg-white text-gray-900 w-[80%] p-2 rounded-lg my-4'>
      <h1 className='text-xl'>{props.message}</h1>
      <p className='text-sm'>• {props.time} •</p>
    </div>
  )
}

const RiderNotifications = () => {
  return (
    <div>
      <RiderHeader/>
      <div className='bg-gray-900 p-24'>
      <h1 className='text-white font-bold text-7xl mb-2'>Notifications</h1>
      <p className='text-white  text-3xl my-2'>Recent</p>
        <NotificationCard message="Your driver is on their way. They should reach in 10 minutes." time="Just Now"/>
       
      <p className='text-white  text-3xl my-4'>Older Notifications</p>
      {data.map((details)=> {
          return  <NotificationCard message={details.message} time={details.time}  />
        })}
      </div>
    </div>
  )
}

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

  useEffect(() => {
    const addNewNotification = () => {
      setTimeout(() => {
        const newNotification = {
          message: 'Ride Request approved',
          timestamp: new Date().toISOString(),
          isRead: false,
        };
        setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
        playNotificationSound();
      }, 3000); 
    };
    addNewNotification();
  }, [playNotificationSound]);

  return (
    <div className="bg-gray-900 min-h-screen justify-center items-center">
    <RiderHeader/>
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


export default RiderNotifications;
