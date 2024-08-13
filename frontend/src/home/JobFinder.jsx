import React from 'react';
import freelancer1 from '../assets/freelancer1.png';

const JobFinder = () => {
  return (
    <div className="h-screen bg-gradient-to-b from-blue-200 to-blue-50  flex flex-col items-center px-4">
      <main className="w-full max-w-6xl mt-12 flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0 lg:space-x-8">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Find the perfect job for you</h1>
          <p className="text-lg lg:text-xl mb-6">Search your career opportunity through 12,800 jobs</p>
          <div className="flex flex-col sm:flex-row sm:space-x-4 mb-6 space-y-4 sm:space-y-0">
            <input
              type="text"
              placeholder="Job Title or Keyword"
              className="px-4 py-2 w-full sm:w-80 border border-gray-300 rounded-md"
            />
            <select className="px-4 py-2 w-full sm:w-auto border border-gray-300 rounded-md">
              <option>All Locations</option>
            </select>
            <button className="px-4 py-2 w-full sm:w-auto bg-blue-500 text-white rounded-md">Search</button>
          </div>
          
        </div>
        <div className="relative h-full shadow-lg shadow-gray-400 lg:w-auto flex-shrink-0 flex justify-center lg:justify-end">
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            <div className="shadow-gray-400 absolute top-0 left-0 bg-blue-200 w-full h-full rounded-lg shadow-lg transform -rotate-6"></div>
            <div className="absolute top-4 left-4 bg-white w-full h-full rounded-lg shadow-lg transform rotate-6  border-black">
              <img src={freelancer1} alt="Profile" className="w-full h-full object-cover rounded-lg bg-blue-500" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default JobFinder;
