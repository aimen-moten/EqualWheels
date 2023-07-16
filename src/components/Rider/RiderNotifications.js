import React, { useEffect, useState } from 'react'
import RiderHeader from './RiderHeader'

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
  );
};

const RiderNotifications = () => {
  const [notifications, setNotifications] = useState([]); 
  const [showPopup, setShowPopup] = useState(false); 
  const [selectedNotification, setSelectedNotification] = useState(null); 

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
        // playNotificationSound(); // Assuming you have a function to play the notification sound
      }, 3000);
    };
    addNewNotification();
  }, []);

  return (
    <div>
      <RiderHeader />
      <div className='bg-gray-900 p-24'>
        <h1 className='text-white font-bold text-7xl mb-2'>Notifications</h1>
        <p className='text-white text-3xl my-2'>Recent</p>
        <NotificationCard message="Your driver is on their way. They should reach in 10 minutes." time="Just Now" />

        <p className='text-white text-3xl my-4'>Older Notifications</p>
        {data.map((details) => {
          return <NotificationCard message={details.message} time={details.time} />;
        })}
      </div>
    </div>
  );
};

export default RiderNotifications;