import React from 'react';
import { FaSearch } from 'react-icons/fa';
import FeaturesSection from '../components/FeaturesSection';
import FreelancerSection from '../components/FreelancerSection';
import ServicesSection from '../components/ServiceSection';
import Footer from '../components/Footer';
import ProfileCard from '../components/ProfileCard';
import JobFinder from '../components/JobFinder';

function Home() {
  const profiles = [
    {
      name: 'Freelancer',
      title: 'Marketing Manager',
      rating: 5.0,
      reviews: 1,
      skills: ['Animation', 'Creative'],
      location: 'Los Angeles',
      rate: '$25 - $30 / hr'
    },
    {
      name: 'Agent Pakulla',
      title: 'Nursing Assistant',
      rating: 4.0,
      reviews: 1,
      skills: ['Design Writing', 'HTML5'],
      location: 'New York',
      rate: '$60 - $65 / hr'
    },
    {
      name: 'John Powell',
      title: 'Product Manager',
      rating: 3.0,
      reviews: 1,
      skills: ['Animation', 'Creative'],
      location: 'Los Angeles',
      rate: '$55 - $60 / hr'
    },
    {
      name: 'Thomas Powell',
      title: 'Design & Creative',
      rating: 4.0,
      reviews: 1,
      skills: ['Creative', 'Figma'],
      location: 'Los Angeles',
      rate: '$25 - $30 / hr'
    },
  ];

  return (
    <div className="bg-blue-50 min-h-screen">
      <JobFinder />
      <ServicesSection />
      <FeaturesSection />
      {/* <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {profiles.map(profile => (
            <ProfileCard key={profile.name} {...profile} />
          ))}
        </div>
      </div> */}
      <FreelancerSection />
      <Footer />
    </div>
  );
}

export default Home;
