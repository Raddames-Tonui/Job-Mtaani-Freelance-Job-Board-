import React, { useEffect, useState, useContext } from 'react';
import { LiaArrowAltCircleLeftSolid } from "react-icons/lia";
import { FaLocationDot } from "react-icons/fa6";
import { GiTakeMyMoney, GiBrain } from "react-icons/gi";
import { Icon } from '@iconify/react';
import { JobContext } from '../context/JobContext';

function JobDetails({ isOpen, onClose, job, timeAgo }) {
  const { applyForJob } = useContext(JobContext);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');

  useEffect(() => {
    if (isOpen) {
      setIsTransitioning(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsTransitioning(false);
    setTimeout(onClose, 300);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleCoverLetterChange = (e) => {
    setCoverLetter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyForJob(job.id, resume, coverLetter).then(() => {
      closeModal();
    });
  };

  if (!isOpen && !isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-50 flex top-[10vh]">
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 top-[10vh] ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
      />
      <div
        className={`fixed top-[10vh] right-0 h-[90vh] bg-slate-100 shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:w-[75vw] w-full`}
      >
        <div className="absolute top-3 w-full">
          <button onClick={handleClose} className="ml-4 text-3xl text-gray-500">
            <LiaArrowAltCircleLeftSolid />
          </button>
          <hr className="my-2 border-1 border-gray-300" />
        </div>

        <section className="md:grid md:grid-cols-3 mt-16 p-6 h-[calc(90vh-10vh)] overflow-y-scroll no-scrollbar">
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
              {job.requirements.split('.').filter(req => req.trim() !== '').map((requirement, index) => (
                <li key={index}>{requirement.trim()}</li>
              ))}
            </ul>
            <hr className="my-2 border-1 border-gray-300" />

            <div className="grid grid-cols-2 py-6">
              <div className="flex items-center">
                <GiTakeMyMoney className="mr-1 text-4xl text-yellow-500" />
                <div className="flex flex-col font-semibold">
                  <span>Payment: {job.salary_type || 'N/A'}</span>
                  <span>Estimated: {job.max_salary || 'N/A'}</span>
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <GiBrain className="mr-1 text-4xl text-yellow-500" />
                  <div className="flex flex-col font-semibold">
                    <p className="flex flex-col font-semibold">Job-level: {job.job_level || 'N/A'}</p>
                    <p>Experience: {job.experience || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-2 border-1 border-gray-300" />
            <h2 className="underline font-semibold">Responsibilities</h2>
            <p>{job.responsibilities}</p>
          </div>

          <div className="w-full p-4 md:relative md:col-span-1 md:justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 w-full mx-5 h-10 text-white rounded-2xl font-bold text-md"
              onClick={openModal}
            >
              Apply now
            </button>

            <div className="bg-white rounded-lg p-4 shadow-md mt-5">
            <p  className="text-green-600 hover:underline flex justify-center font-bold text-xl">
          Client profile
        </p>
        <img
          src={job.client.avatar}
          alt="Profile"
          className="w-12 h-12 rounded-full  flex justify-center"
        />
      <div className="flex items-center mb-4 pt-3">
        
        
        <div>
          <h2 className="text-lg font-bold text-green-700 hover:underline">
          {job.client.firstname} {job.client.lastname}
          </h2>
          <p className="text-sm text-gray-600">{job.client.email}</p>
        </div>
      </div>
      <div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div
            className="bg-green-600 h-2.5 rounded-full"
            style={{ width: '100%' }}
          ></div>
        </div>
        {/* <span className="text-sm text-gray-500">80%</span> */}
      </div>
      <h2 className='flex justify-center pt-3'>About</h2>
      <p>{job.client?.about}</p>

    </div>
          </div>
        </section>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-[90vw] md:w-[50vw] shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Apply Job: {job.title}</h2>
              <button onClick={closeModal} className="text-3xl">&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Resume</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Cover Letter</label>
                <textarea
                  value={coverLetter}
                  onChange={handleCoverLetterChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Apply Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


export default JobDetails;