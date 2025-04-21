import React from 'react';

const NotificationCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md font-sans">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-blue-900 text-lg">Notifications</h2>
        <a href="#" className="text-blue-500 text-sm">View All</a>
      </div>
      <div className="space-y-4">
        <div className="flex items-center">
          <span role="img" aria-label="bell" className="text-2xl mr-2">🔔</span>
          <div>
            <p className="text-gray-800">Booking Confirmed on 21 Mar 2024</p>
            <p className="text-gray-500 text-sm">Just Now</p>
          </div>
        </div>
        <div className="flex items-center">
          <span role="img" aria-label="star" className="text-2xl mr-2">⭐</span>
          <div>
            <p className="text-gray-800">You have a New Review for your App</p>
            <p className="text-gray-500 text-sm">5 Days ago</p>
          </div>
        </div>
        <div className="flex items-center">
          <span role="img" aria-label="calendar" className="text-2xl mr-2">📅</span>
          <div>
            <p className="text-gray-800">You have Appointment with Ahmed b</p>
            <p className="text-gray-500 text-sm">12:55 PM</p>
          </div>
        </div>
        <div className="flex items-center">
          <span role="img" aria-label="money" className="text-2xl mr-2">💰</span>
          <div>
            <p className="text-gray-800">Sent an amount of $200 for an Appoi</p>
            <p className="text-gray-500 text-sm">2 Days ago</p>
          </div>
        </div>
        <div className="flex items-center">
          <span role="img" aria-label="star" className="text-2xl mr-2">⭐</span>
          <div>
            <p className="text-gray-800">You have a New Review for your App</p>
            <p className="text-gray-500 text-sm">5 Days ago</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button className="text-gray-500">{'<'}</button>
        <div className="bg-gray-300 h-1 w-1/2 rounded"></div>
        <button className="text-gray-500">{'>'}</button>
      </div>
    </div>
  );
};

export default NotificationCard;