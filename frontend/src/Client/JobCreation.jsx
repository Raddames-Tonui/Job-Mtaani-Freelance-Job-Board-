import React, { useContext, useState } from 'react';
import { JobContext } from '../context/JobContext';
import { UserContext } from '../context/UserContext';

const JobCreation = () => {
  const { createJob } = useContext(JobContext);
  const { currentUser } = useContext(UserContext);
  const [jobDetails, setJobDetails] = useState({
    title: "",
    tags: "",
    role: "",
    min_salary: "",
    max_salary: "",
    salary_type: "Monthly",
    education: "Bachelor",
    experience: "0-1 years",
    job_type: "Full-time",
    vacancies: "",
    expiration_date: "",
    job_level: "Entry",
    description: "",
    responsibilities: "",
    experience_level: "Junior",
    location: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJobDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createJob(jobDetails)
      .then(newJob => {
        console.log('Job created:', newJob);
        // Clear the form after successful job creation
        setJobDetails({
          title: "",
          tags: "",
          role: "",
          min_salary: "",
          max_salary: "",
          salary_type: "Hourly",
          education: "Bachelor",
          experience: "0-1 years",
          job_type: "Full-time",
          vacancies: "",
          expiration_date: "",
          job_level: "Entry",
          description: "",
          responsibilities: "",
          experience_level: "Junior",
          location: "",
        });
      })
      .catch(error => {
        console.error('Error creating job:', error);
      });
  };

  return (
    <div className='mt-[10vh]'>
      <div className="flex items-center justify-center py-12 px-6 lg:px-8">
        <div className="bg-white mx-auto flex flex-col items-center justify-center px-6 max-w-2xl w-full py-8 rounded-md shadow-md border-2 border-gray-200">
          {currentUser && currentUser.username ? (
            <h2 className="text-3xl font-bold text-blue-500 capitalize">
              {currentUser.username}
            </h2>
          ) : null}
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Post a Job
          </h2>

          <form className="space-y-6 mt-8 w-full" onSubmit={handleSubmit}>
            {/* Job Title */}
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
                  placeholder="Add job title"
                />
              </div>
            </div>

            <div className='w-full flex flex-row gap-3'>
              {/* Tags */}
              <div className='flex-1'>
                <label htmlFor="tags" className="block text-sm font-medium leading-6 text-gray-900">
                  Tags
                </label>
                <div className="mt-2">
                  <input
                    id="tags"
                    name="tags"
                    type="text"
                    value={jobDetails.tags}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    placeholder="Add job tags"
                  />
                </div>
              </div>

              {/* Role */}
              <div className='flex-1'>
                <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                  Role
                </label>
                <div className="mt-2">
                  <input
                    id="role"
                    name="role"
                    type="text"
                    value={jobDetails.role}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    placeholder="Add job role"
                  />
                </div>
              </div>
            </div>

            <h2 className='font-bold'>Salary</h2>
            <div className='flex flex-row gap-4'>
              {/* Minimum Salary */}
              <div className='flex-1'>
                <label htmlFor="min_salary" className="block text-sm font-medium leading-6 text-gray-900">
                  Minimum Salary (KES)
                </label>
                <div className="mt-2">
                  <input
                    id="min_salary"
                    name="min_salary"
                    type="number"
                    step="0.01"
                    value={jobDetails.min_salary}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    placeholder="Minimum salary(KES)"
                  />
                </div>
              </div>

              {/* Maximum Salary */}
              <div className='flex-1'>
                <label htmlFor="max_salary" className="block text-sm font-medium leading-6 text-gray-900">
                  Maximum Salary (KES)
                </label>
                <div className="mt-2">
                  <input
                    id="max_salary"
                    name="max_salary"
                    type="number"
                    step="0.01"
                    value={jobDetails.max_salary}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    placeholder="Maximum salary(KES)"
                  />
                </div>
              </div>

              {/* Salary Type */}
              <div className='flex-1'>
                <label htmlFor="salary_type" className="block text-sm font-medium leading-6 text-gray-900">
                  Salary Type
                </label>
                <div className="mt-2">
                  <select
                    id="salary_type"
                    name="salary_type"
                    value={jobDetails.salary_type}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  >
                    <option value="Hourly">Hourly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>
            </div>

            <h2 className='font-bold'>Extra Information</h2>
            <div className='flex flex-row gap-4'>
              {/* Education */}
              <div className='flex-1'>
                <label htmlFor="education" className="block text-sm font-medium leading-6 text-gray-900">
                  Education
                </label>
                <div className="mt-2">
                  <select
                    id="education"
                    name="education"
                    value={jobDetails.education}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  >
                    <option value="High School">High School</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Master">Master</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>
              </div>

              {/* Experience */}
              <div className='flex-1'>
                <label htmlFor="experience" className="block text-sm font-medium leading-6 text-gray-900">
                  Experience
                </label>
                <div className="mt-2">
                  <select
                    id="experience"
                    name="experience"
                    value={jobDetails.experience}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  >
                    <option value="0-1 years">0-1 years</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                </div>
              </div>

              {/* Job Type */}
              <div className='flex-1'>
                <label htmlFor="job_type" className="block text-sm font-medium leading-6 text-gray-900">
                  Job Type
                </label>
                <div className="mt-2">
                  <select
                    id="job_type"
                    name="job_type"
                    value={jobDetails.job_type}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Temporary">Temporary</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>
            </div>

            <h2 className='font-bold'>Experience Level</h2>
            <div className='flex flex-row gap-4'>
              {/* Experience Level */}
              <div className='flex-1'>
                <label htmlFor="experience_level" className="block text-sm font-medium leading-6 text-gray-900">
                  Experience Level
                </label>
                <div className="mt-2">
                  <select
                    id="experience_level"
                    name="experience_level"
                    value={jobDetails.experience_level}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  >
                    <option value="Junior">Junior</option>
                    <option value="Mid">Mid</option>
                    <option value="Senior">Senior</option>
                    <option value="Executive">Executive</option>
                  </select>
                </div>
              </div>

              {/* Location */}
              <div className='flex-1'>
                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                  Location
                </label>
                <div className="mt-2">
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={jobDetails.location}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    placeholder="Job location"
                  />
                </div>
              </div>
            </div>

            <h2 className='font-bold'>Job Details</h2>
            <div className='flex flex-row gap-4'>
              {/* Vacancies */}
              <div className='flex-1'>
                <label htmlFor="vacancies" className="block text-sm font-medium leading-6 text-gray-900">
                  Vacancies
                </label>
                <div className="mt-2">
                  <input
                    id="vacancies"
                    name="vacancies"
                    type="number"
                    value={jobDetails.vacancies}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    placeholder="Number of vacancies"
                  />
                </div>
              </div>

              {/* Expiration Date */}
              <div className='flex-1'>
                <label htmlFor="expiration_date" className="block text-sm font-medium leading-6 text-gray-900">
                  Expiration Date
                </label>
                <div className="mt-2">
                  <input
                    id="expiration_date"
                    name="expiration_date"
                    type="date"
                    value={jobDetails.expiration_date}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    placeholder="Job expiry date"
                  />
                </div>
              </div>

              {/* Job Level */}
              <div className='flex-1'>
                <label htmlFor="job_level" className="block text-sm font-medium leading-6 text-gray-900">
                  Job Level
                </label>
                <div className="mt-2">
                  <select
                    id="job_level"
                    name="job_level"
                    value={jobDetails.job_level}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  >
                    <option value="Entry">Entry</option>
                    <option value="Mid">Mid</option>
                    <option value="Senior">Senior</option>
                    <option value="Executive">Executive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Job Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  value={jobDetails.description}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  placeholder="Add job description"
                />
              </div>
            </div>

            {/* Responsibilities */}
            <div>
              <label htmlFor="responsibilities" className="block text-sm font-medium leading-6 text-gray-900">
                Responsibilities
              </label>
              <div className="mt-2">
                <textarea
                  id="responsibilities"
                  name="responsibilities"
                  value={jobDetails.responsibilities}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  placeholder="Add job responsibilities"
                />
              </div>
            </div>

            

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobCreation;
