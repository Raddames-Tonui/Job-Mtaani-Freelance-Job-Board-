import React, { useEffect, useState } from 'react';
import { LiaArrowAltCircleLeftSolid } from "react-icons/lia";
import { FaLocationDot } from "react-icons/fa6";


function JobDetails({ isOpen, onClose, job , timeAgo}) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsTransitioning(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsTransitioning(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen && !isTransitioning) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 top-[10vh]  ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      <div
        className={`fixed top-[10vh] right-0 h-full bg-slate-100 shadow-lg transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:w-[75vw] w-full`}
      >
        <div className='absolute top-3 w-full'> 
          <button onClick={handleClose} className="ml-4  text-3xl text-gray-500">
            <LiaArrowAltCircleLeftSolid /> 
          </button>
          <hr className='my-2 border-1 border-gray-300'/>
        </div>
        

        <div className=" md:grid md:grid-cols-3 mt-16 p-6 ">
          <div className='col-span-2'>
              <h2 className="text-xl font-bold mb-4">{job.title}</h2>
              <h2 className='flex gap-10 items-center text-md mb-3 text-gray-500'>
                <span >Posted {timeAgo}</span>
                <span className='flex items-center'>  <FaLocationDot className="mr-1 text-xl" /> {job.location} </span>
              </h2>

            <p>{job.description}</p>
            <hr className='my-4 border-1 border-gray-300 '/>
          </div>
          
          
          <div className="fixed bottom-0 right-0 w-full p-4 md:relative md:col-span-1 md:flex md:justify-center">
            <button className='bg-blue-500 hover:bg-blue-700 w-full mx-5 h-10 text-white rounded-2xl font-bold text-md'>Apply now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
