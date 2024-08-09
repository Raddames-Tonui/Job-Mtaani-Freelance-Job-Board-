import React from 'react';
import { FaCheckCircle, FaDollarSign, FaShieldAlt } from 'react-icons/fa';
import womanonlaptop from '../assets/womanonlaptop.webp';

const TalentSection = () => {
  return (
    <section className="bg-blue-50 ">
      <div className=" mx-auto px-10 flex flex-col md:flex-row items-center p-20 ">
        <div className="md:w-1/2 mb-4 md:mb-0 md:pr-4">
          <img src={womanonlaptop} alt="Freelance talent" className="w-full h-full rounded-md" />
        </div>
        <div className="md:w-1/2 md:pl-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-10 " >A whole world of freelance talent at your fingertips</h2>
          <ul className="space-y-10">
            <li className="flex items-start  space-x-6">
              <FaCheckCircle size={24} className="text-blue-600 text-xl" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Proof of quality</h3>
                <p className="text-gray-600">Check any pro’s work samples, client reviews, and identity verification.</p>
              </div>
            </li>
            <li className="flex items-start space-x-6">
              <FaDollarSign size={24} className="text-blue-600 " />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">No cost until you hire</h3>
                <p className="text-gray-600">Check any pro’s work samples, client reviews, and identity verification.</p>
              </div>
            </li>
            <li className="flex items-start space-x-6">
              <FaShieldAlt size={24} className="text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Safe and secure</h3>
                <p className="text-gray-600">Check any pro’s work samples, client reviews, and identity verification.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-white text-gray-900 py-12 md:py-20 ">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-around gap-8 md:gap-12">
            <div className="text-center flex-1 md:flex-none">
              <div className="text-2xl md:text-3xl font-bold">890M</div>
              <div className="text-sm md:text-base">Total Freelancers</div>
            </div>
            <div className="text-center flex-1 md:flex-none">
              <div className="text-2xl md:text-3xl font-bold">750M</div>
              <div className="text-sm md:text-base">Positive Reviews</div>
            </div>
            <div className="text-center flex-1 md:flex-none">
              <div className="text-2xl md:text-3xl font-bold">98M</div>
              <div className="text-sm md:text-base">Orders Received</div>
            </div>
            <div className="text-center flex-1 md:flex-none">
              <div className="text-2xl md:text-3xl font-bold">336M</div>
              <div className="text-sm md:text-base">Projects Completed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalentSection;
