import React from 'react';
import { FaMedal, FaUserShield, FaLock } from 'react-icons/fa';
// import clientprop3 from '../assets/client-prop3.jpeg';

const FreelanceFeatures = () => {
  return (
<div>
  <div className="bg-blue-50 text-black py-16">
    <div className="container mx-auto px-4 sm:px-6 md:px-8">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="space-y-6 md:w-1/2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            A whole world of freelance talent at your fingertips
          </h2>
          <div className="flex items-start mb-6">
            <div className="text-blue-500 text-2xl sm:text-3xl md:text-4xl mr-4">
              <FaMedal />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">Proof of quality</h3>
              <p className="text-sm sm:text-base md:text-lg">Check any pro’s work samples, client reviews, and identity verification.</p>
            </div>
          </div>
          <div className="flex items-start mb-6">
            <div className="text-blue-500 text-2xl sm:text-3xl md:text-4xl mr-4">
              <FaUserShield />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">No cost until you hire</h3>
              <p className="text-sm sm:text-base md:text-lg">Check any pro’s work samples, client reviews, and identity verification.</p>
            </div>
          </div>
          <div className="flex items-start mb-6">
            <div className="text-blue-500 text-2xl sm:text-3xl md:text-4xl mr-4">
              <FaLock />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">Safe and secure</h3>
              <p className="text-sm sm:text-base md:text-lg">Check any pro’s work samples, client reviews, and identity verification.</p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
          <div className="grid grid-cols-2 gap-4">
            <img src={clientprop3} alt="User 1" className="rounded-t-full h-32 sm:h-40 md:h-48" />
            <img src={clientprop3} alt="User 2" className="rounded-full h-32 sm:h-40 md:h-48" />
            <img src={clientprop3} alt="User 3" className="rounded-full h-32 sm:h-40 md:h-48" />
            <img src={clientprop3} alt="User 4" className="rounded-b-full h-32 sm:h-40 md:h-48" />
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default FreelanceFeatures;
