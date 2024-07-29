import React from 'react';
import womanprop from '../assets/womanprop.png';

const FreelancerSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-blue-500  rounded-3xl ">
      <div className="text-white px-10 mb-8 md:mb-0 md:mr-8 mt-10 md:mt-4">
        <div className='flex-row items-center justify-center'>
            <h1 className="text-3xl font-bold mb-4">With talented freelancers do more work.</h1>
        <p className="text-lg mb-6">Work with the largest network of independent professionals and get things done—from quick turnarounds.</p>
        </div>
        
        <div className="flex justify-center md:justify-start gap-4 p-4 ">
          <button className="border border-white hover:bg-white text-white hover:text-blue-500 font-bold py-2 px-4 rounded-lg ">Find Work</button>
          <button className="border border-white hover:bg-white text-white hover:text-blue-500 font-bold py-2 px-4 rounded-lg">Find Talent</button>
        </div>
      </div>
      <div className="flex lg:-mt-16">
            <img src={womanprop} alt="Freelancer" className="object-cover" />
        </div>

      
    </div>
  );
};

export default FreelancerSection;
