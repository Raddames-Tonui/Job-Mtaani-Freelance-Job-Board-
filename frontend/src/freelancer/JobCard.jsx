import React from 'react';

const JobCard = ({ job }) => {

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{job.postedTime}</div>
        <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{job.title}</h2>
        <p className="mt-2 text-gray-500">{job.description}</p>
        <div className="flex items-center mt-4">
          <span className="text-sm text-gray-500 mr-2">{job.paymentType}</span>
          <span className="text-sm text-gray-500">{job.budget}</span>
        </div>
        <div className="flex items-center mt-4">
          <span className="text-sm text-gray-500 mr-2">Proposals: </span>
          <span className="text-sm text-gray-500">{job.proposals}</span>
        </div>
        <div className="flex items-center mt-4">
          {job.tags.map((tag, index) => (
            <span key={index} className="text-sm text-indigo-500 mr-2">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobCard;

// Example usage:
// const job = {
//   postedTime: "Posted 8 minutes ago",
//   title: "Develop a WebApp o reply to user reviews on AppStores with AI",
//   description: "This WebApp is designed to help app and game developers manage user reviews on platforms like Google Play more efficiently by providing automated, pre-written, and canned replies. The tool aims to simplify the process of responding to user feedback while offering customizable options...",
//   paymentType: "Fixed price - Expert",
//   budget: "Est. budget: $570.00",
//   proposals: "Less than 5",
//   tags: ["AI App Development", "AI Development", "AI Agent Development", "Web Development", "Web Application", "JavaScript"]
// };

// <FindJobs job={job} />
