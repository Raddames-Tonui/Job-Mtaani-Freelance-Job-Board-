import React from 'react';
import speakerdoodle from '../assets/speakerdoodle.png';

const AdvertiseJob = () => {
  return (
    <section className="bg-blue-50  h-auto md:h-[50vh] py-10">
      <div className="max-w-6xl mx-auto px-6  flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0 md:pr-6 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">Recruiting?</h2>
          <p className="text-gray-600 mt-2">Advertise your jobs to millions of monthly users and search 15.8 million CVs in our database.</p>
          <button className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-full">Start Recruiting Now</button>
        </div>
        <div className="mt-6 md:mt-0 flex justify-center md:justify-end w-full md:w-auto">
          <img src={speakerdoodle} alt="speakerdoodle" className="h-40 md:h-60 -rotate-10 scale-x-[-1] object-contain" />
        </div>
      </div>
    </section>
  );
};

export default AdvertiseJob;
