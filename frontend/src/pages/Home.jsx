import React from 'react';
import { FaSearch } from 'react-icons/fa';
import FeaturesSection from '../components/FeaturesSection';

function HomePage() {
  return (
    <div className="pt-5 bg-blue-50 flex flex-col items-center h-[90vh]">

      <main className="w-full max-w-6xl text-center">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">Find the perfect job for you</h2>
        <p className="text-lg text-gray-700 mb-8">Search your career opportunity through 12,800 jobs</p>
        
        <div className="flex justify-center mb-8">
          <input 
            type="text" 
            placeholder="Job Title or Keyword" 
            className="py-3 px-4 w-full max-w-md border border-gray-300 rounded-l-full"
          />
          <select 
            className="py-3 px-4 border border-gray-300 bg-white text-gray-700 rounded-r-full">
            <option>All Locations</option>
          </select>
          <button className="bg-blue-900 text-white py-3 px-4 rounded-full ml-4">
            <FaSearch />
          </button>
        </div>
        
        <div className="flex flex-wrap justify-center mb-12">
          {['designer', 'Writer', 'Team leader', 'Fullstack', 'web developer', 'Senior', 'Financial Analyst', 'Software', 'Web', 'Tech'].map((tag, index) => (
            <span key={index} className="m-2 py-2 px-4 bg-gray-200 rounded-full text-blue-900 text-sm">
              {tag}
            </span>
          ))}
        </div>

        <div className="relative flex justify-center">
          <div className="w-1/2 bg-white shadow-lg rounded-lg p-8 relative z-10">
            <img 
              src="https://via.placeholder.com/150" 
              alt="Professional" 
              className="rounded-full mx-auto mb-4"
            />
            <div className="text-center">
              <p className="text-gray-700 mb-1">319 job offers</p>
              <p className="text-blue-900 font-bold">in Business Development</p>
            </div>
          </div>
        </div>

      </main>
      <FeaturesSection/>

    </div>
  );
}

export default HomePage;
