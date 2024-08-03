import React, { useContext } from 'react';
import Footer from '../components/Footer';
import { JobContext } from '../context/JobContext';

// const jobs = [

//   {
//     id: 1,
//     company: 'Reddit',
//     location: 'United Kingdom of Great Britain',
//     title: 'Marketing Officer',
//     type: 'Full Time',
//     salary: '$30k-$38k',
//     featured: true,
//   },
//   {
//     id: 2,
//     company: 'Dribbble',
//     location: 'California',
//     title: 'Senior UX Designer',
//     type: 'Full Time',
//     salary: '$60k-$80k/month',
//     featured: true,
//   },
//   {
//     id: 3,
//     company: 'Freepik',
//     location: 'China',
//     title: 'Visual Designer',
//     type: 'Full Time',
//     salary: '$90k-$115k',
//     featured: false,
//   },
//   {
//     id: 4,
//     company: 'Figma',
//     location: 'Canada',
//     title: 'UI/UX Designer',
//     type: 'Full Time',
//     salary: '$50k-$70k',
//     featured: true,
//   },
//   {
//     id: 5,
//     company: 'Dribbble',
//     location: 'United States',
//     title: 'Junior Graphic Designer',
//     type: 'Temporary',
//     salary: '$35k-$50k',
//     featured: false,
//   },
//   {
//     id: 6,
//     company: 'Twitter',
//     location: 'Canada',
//     title: 'Senior UX Designer',
//     type: 'Internship',
//     salary: '$90k-$95k',
//     featured: false,
//   },
//   {
//     id: 7,
//     company: 'Microsoft',
//     location: 'Australia',
//     title: 'Product Designer',
//     type: 'Full Time',
//     salary: '$40k-$50k',
//     featured: false,
//   },
//   {
//     id: 8,
//     company: 'Upwork',
//     location: 'France',
//     title: 'Technical Support Specialist',
//     type: 'Full Time',
//     salary: '$35k-$40k',
//     featured: false,
//   },
//   {
//     id: 9,
//     company: 'Slack',
//     location: 'Germany',
//     title: 'Networking Engineer',
//     type: 'Remote',
//     salary: '$50k-$60k',
//     featured: false,
//   },
//   {
//     id: 10,
//     company: 'Instagram',
//     location: 'Australia',
//     title: 'Front End Developer',
//     type: 'Contract Base',
//     salary: '$40k-$50k',
//     featured: false,
//   },
//   {
//     id: 11,
//     company: 'Facebook',
//     location: 'United Kingdom of Great Britain',
//     title: 'Software Engineer',
//     type: 'Part Time',
//     salary: '$15k-$20k',
//     featured: false,
//   },
//   {
//     id: 12,
//     company: 'Youtube',
//     location: 'Germany',
//     title: 'Interaction Designer',
//     type: 'Full Time',
//     salary: '$20k-$25k',
//     featured: false,
//   },
// ];

const FindJobs = () => {
  const {jobs} =  useContext(JobContext)
  return (
    <div>
<div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-white rounded-md shadow">Design</button>
          <button className="px-4 py-2 bg-white rounded-md shadow">New York</button>
        </div>
        <div className="flex space-x-4">
          <select className="px-4 py-2 bg-white rounded-md shadow">
            <option>Latest</option>
          </select>
          <select className="px-4 py-2 bg-white rounded-md shadow">
            <option>12 per page</option>
          </select>
          <button className="px-4 py-2 bg-white rounded-md shadow">Grid/List</button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {jobs.map(job => (
          <div
            key={job.id}
            className={`p-6 bg-white rounded-lg shadow relative ${
              job.id ? 'border-2 border-red-500' : ''
            }`}
          >
            {job.title && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                Featured
              </span>
            )}
            <div className="flex items-center mb-4">
              {job.client && (
                <img
                src={job.client.avatar}
                alt={job.company}
                className="w-10 h-10 mr-4 rounded-full"
              />
              )                
              }
              
              <div>
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.description}</p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>{job.client_id}</p>
              {/* <p>{job.location}</p> */}
              {/* <p className="text-blue-500 font-semibold">{job.salary}</p> */}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-6">
        <button className="px-4 py-2 mx-1 bg-white rounded-md shadow">&lt;</button>
        <button className="px-4 py-2 mx-1 bg-white rounded-md shadow">01</button>
        <button className="px-4 py-2 mx-1 bg-white rounded-md shadow">02</button>
        <button className="px-4 py-2 mx-1 bg-white rounded-md shadow">03</button>
        <button className="px-4 py-2 mx-1 bg-white rounded-md shadow">04</button>
        <button className="px-4 py-2 mx-1 bg-white rounded-md shadow">05</button>
        <button className="px-4 py-2 mx-1 bg-white rounded-md shadow">&gt;</button>
      </div>
    </div>
    
      <Footer/>
    </div>
  );
};

export default FindJobs;
