import React from 'react';

const AdvertiseJob = () => {
  return (
    <section className="bg-blue-50 py-10 h-[50vh]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0 md:pr-6">
          <h2 className="text-2xl font-bold text-gray-800">Recruiting?</h2>
          <p className="text-gray-600 mt-2">Advertise your jobs to millions of monthly users and search 15.8 million CVs in our database.</p>
          <button className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-full">Start Recruiting Now</button>
        </div>
        <div className="mt-6 md:mt-0">
          <img src="advertise.png" alt="Recruiting" className="h-48" />
        </div>
      </div>
    </section>
  );
};

export default AdvertiseJob;
