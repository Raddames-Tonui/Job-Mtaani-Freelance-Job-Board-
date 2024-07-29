// ProfileCard.js
import React from 'react';
import clientprop3 from '../assets/client-prop3.jpeg';

const ProfileCard = ({ name, title, rating, reviews, skills, location, rate }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{name}</h2>
        <div className="flex items-center">
          <span className="text-yellow-500 text-sm">⭐ {rating}</span>
          <span className="text-gray-600 text-sm ml-1">({reviews} Reviews)</span>
        </div>
      </div>
      <div className="flex justify-center mb-4">
        <img src={clientprop3} alt={`${name}'s profile`} className="object-cover h-40 w-40" />
      </div>
      <p className="text-gray-600">{title}</p>
      <div className="mt-2">
        {skills.map(skill => (
          <span key={skill} className="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full mr-1 mb-1">
            {skill}
          </span>
        ))}
      </div>
      <div className="mt-4 text-gray-600">
        <p>Location: {location}</p>
        <p>Rate: {rate}</p>
      </div>
      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg">View Profile</button>
    </div>
  );
};

export default ProfileCard;
