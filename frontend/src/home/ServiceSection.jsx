import React from 'react';
import { FaBriefcase, FaUserCheck, FaCreditCard, FaHeadset } from 'react-icons/fa';

const ServicesSection = () => {
  const services = [
    { icon: <FaBriefcase  />, title: 'Post a job', description: 'It’s free and easy to post a job. Simply fill in a title, description.' },
    { icon: <FaUserCheck  />, title: 'Choose freelancers', description: 'It’s free and easy to post a job. Simply fill in a title, description.' },
    { icon: <FaCreditCard  />, title: 'Pay safely', description: 'It’s free and easy to post a job. Simply fill in a title, description.' },
    { icon: <FaHeadset  />, title: 'We’re here to help', description: 'It’s free and easy to post a job. Simply fill in a title, description.' }
  ];

  return (
    <div className="bg-white py-16 px-8">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">Need something done?</h2>
        <p className="text-gray-600">Most viewed and all-time top-selling services</p>
      </div>
      <div className="flex flex-col md:flex-row justify-around items-center">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center text-center mb-8 md:mb-0 px-3">
            <div className="text-blue-600 text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
