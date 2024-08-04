import React, { useContext, useState } from 'react';
import { JobContext } from '../context/JobContext';
import { UserContext } from '../context/UserContext';

const JobCreation = () => {
  const { createJob } = useContext(JobContext);
  const {currentUser} = useContext(UserContext)

  const [jobDetails, setJobDetails] = useState({
    title: '',
    description: '',
    requirements: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({
      ...jobDetails,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, requirements } = jobDetails;
    try {
      await createJob(title, description, requirements);
      // Reset form after successful submission
      setJobDetails({
        title: '',
        description: '',
        requirements: ''
      });
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center py-12 px-6 lg:px-8">
      <div className="bg-white mx-auto flex flex-col items-center justify-center px-6 max-w-2xl w-full py-8 rounded-md shadow-md border-2 border-gray-200">
        {currentUser && currentUser.username ?
        <>
            <h2 className="text-3xl font-bold text-blue-500 capitalize">{currentUser.username}</h2>
        </>
        :
        <>
        </>
        }
        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Post a Job
        </h2>

        <form className="space-y-6 mt-8 w-full" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
              Job Title
            </label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                type="text"
                value={jobDetails.title}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                placeholder="Add job title, role, vacancies etc"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
              Description
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                value={jobDetails.description}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                placeholder="Add your job description..."
              />
            </div>
          </div>

          <div>
            <label htmlFor="requirements" className="block text-sm font-medium leading-6 text-gray-900">
              Requirements
            </label>
            <div className="mt-2">
              <textarea
                id="requirements"
                name="requirements"
                value={jobDetails.requirements}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                placeholder="Add your job requirements..."
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="relative w-full h-10 rounded-md text-md font-bold border-none overflow-hidden z-10 bg-gradient-to-r from-[#448bf5] to-[#47c1f9] hover:bg-gradient-to-r hover:from-[#3b73c7] hover:to-[#229aca] ring-1 ring-gray-600 transition-all duration-500"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobCreation;
