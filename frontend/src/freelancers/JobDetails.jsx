import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LiaArrowAltCircleLeftSolid } from "react-icons/lia";
import { FaLocationDot } from "react-icons/fa6";
import { GiTakeMyMoney, GiBrain } from "react-icons/gi";
import { Icon } from '@iconify/react';


function JobDetails({ isOpen, onClose, job, timeAgo, handleApply }) {
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
    <div className="fixed inset-0 z-50 flex top-[10vh]">
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
        <section className=" md:grid md:grid-cols-3 mt-16 p-6 h-[calc(100vh-10vh)] overflow-y-scroll no-scrollbar">
          <div className="col-span-2 md:border-r-2 ">
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

            <div className="grid grid-cols-2 py-6 ">
              <div className="flex items-center">
                <GiTakeMyMoney className="mr-1 text-4xl text-yellow-500" />
                <div className="flex flex-col font-semibold">
                  <span >Payment: {job.salary_type || 'N/A'}</span>
                  <span>Estimated: {job.max_salary || 'N/A'}</span>
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <GiBrain className="mr-1 text-4xl text-yellow-500" />
                  <div className="flex flex-col font-semibold">
                    <p className="flex flex-col font-semibold ">Job-level: {job.job_level || 'N/A'}</p>
                    <p>Experience: {job.experience || 'N/A'}</p>
                  </div>
                  
                </div>
              </div>
            </div>
            <hr className="my-2 border-1 border-gray-300" />
            <h2 className="underline font-semibold">Responsibilities</h2>
            <p>{job.responsibilities}</p>
          </div>

          <div className=" w-full p-4 md:relative md:col-span-1 md:justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 w-full mx-5 h-10 text-white rounded-2xl font-bold text-md"
            onClick={() => handleApply(job.id)}>
              Apply now
            </button>

            {/* About the client */}
            <div className="flex flex-col items-center md:mt-8 md:bg-blue-100 border-2 rounded-xl">
              <h2 className="font-bold text-xl pt-4">About the client</h2>
              <div className="flex flex-col items-center  py-2">
                {job.client.avatar ?(
                  <img src={job.client.avatar} alt={job.client.username} className="w-16 h-16 rounded-full mb-2" />
                ):
                  <Icon icon="healthicons:ui-user-profile" className='w-16 h-16'/>
                }
                <h3 className="text-lg font-bold capitalize">{job.client.firstname} {job.client.lastname}</h3>
                <p className="text-gray-500">{job.client.about}</p>
                <hr />
                {/* <h1>About</h1> */}
                 <p>{job.client.about}</p>

                <div>
                 
                  <p>{job.client.needs}</p>
                </div>                
              </div>
              
            </div>


          </div>
        </section>
      </div>
    </div>
  );
}

JobDetails.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  job: PropTypes.shape({
    title: PropTypes.string.isRequired,
    location: PropTypes.string,
    description: PropTypes.string,
    requirements: PropTypes.string,
    salary_type: PropTypes.string,
    max_salary: PropTypes.number,
    job_level: PropTypes.string,
    responsibilities: PropTypes.string,
    client: PropTypes.shape({
      avatar: PropTypes.string,
      username: PropTypes.string,
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      about: PropTypes.string,
    }).isRequired,
  }).isRequired,
  timeAgo: PropTypes.string.isRequired,
};

export default JobDetails;
