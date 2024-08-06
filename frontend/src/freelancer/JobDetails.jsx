import React, { useEffect, useState } from 'react';
import { LiaArrowAltCircleLeftSolid } from "react-icons/lia";
import { FaLocationDot } from "react-icons/fa6";
import { GiTakeMyMoney, GiBrain } from "react-icons/gi";

function JobDetails({ isOpen, onClose, job, timeAgo }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const requirementsArray = job?.requirements
    ? job.requirements.split('.').filter(req => req.trim() !== '')
    : [];

  useEffect(() => {
    if (isOpen) {
      setIsTransitioning(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsTransitioning(false);
    setTimeout(onClose, 300);
  };

  if (!isOpen && !isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 top-[10vh] ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
      />
      <div
        className={`fixed top-[10vh] right-0 h-full bg-slate-100 shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:w-[75vw] w-full`}
      >
        <div className="absolute top-3 w-full">
          <button onClick={handleClose} className="ml-4 text-3xl text-gray-500">
            <LiaArrowAltCircleLeftSolid />
          </button>
          <hr className="my-2 border-1 border-gray-300" />
        </div>

        <section className="md:grid md:grid-cols-3 mt-16 p-6 h-[calc(100vh-10vh)] overflow-y-scroll no-scrollbar">
          <div className="col-span-2 md:border-r-2">
            <h2 className="text-xl font-bold mb-4">{job.title}</h2>
            <h2 className="flex gap-10 items-center text-md mb-3 text-gray-500">
              <span>Posted {timeAgo}</span>
              <span className="flex items-center">
                <FaLocationDot className="mr-1 text-xl text-yellow-500" /> {job.location}
              </span>
            </h2>
            <p>{job.description}</p>
            <hr className="my-4 border-1 border-gray-300" />
            
            <h2 className="underline font-semibold">Requirements</h2>
            <ul className="list-disc ml-6">
              {requirementsArray.map((requirement, index) => (
                <li key={index}>{requirement.trim()}</li>
              ))}
            </ul>
            <hr className="my-2 border-1 border-gray-300" />

            <div className="flex flex-row justify-between">
              <div className="flex items-center">
                <GiTakeMyMoney className="mr-1 text-5xl text-yellow-500" />
                <div className="flex flex-col">
                  <span>{job.salary_type || 'N/A'}</span>
                  <span>Ksh {job.max_salary || 'N/A'}</span>
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <GiBrain className="mr-1 text-5xl text-yellow-500" />
                  <p className="flex gap-1 items-center text-md text-gray-500">{job.job_level || 'N/A'}</p>
                </div>
              </div>
            </div>
            <hr className="my-2 border-1 border-gray-300" />
            <p>{job.responsibilities}</p>
          </div>

          <div className="fixed bottom-0 right-0 w-full p-4 md:relative md:col-span-1 md:justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 w-full mx-5 h-10 text-white rounded-2xl font-bold text-md">
              Apply now
            </button>
            <div className="flex flex-row justify-center mt-4">
              <h2 className="font-semibold text-xl">About the client</h2>
              <h3>{/* Client details go here */}</h3>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default JobDetails;
