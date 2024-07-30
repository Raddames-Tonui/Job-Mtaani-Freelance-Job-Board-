import React from 'react';
import { FaSearch } from 'react-icons/fa';
import FeaturesSection from '../components/FeaturesSection';
import FreelancerSection from '../home/FreelancerSection';
import ServicesSection from '../home/ServiceSection';
import Footer from '../components/Footer';
import JobFinder from '../home/JobFinder';
import AdvertiseJob from '../home/AdvertiseJob';
import TalentSection from '../home/TalentSection';
import MessageComponent from '../components/MessageComponent';

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
      <TalentSection />
      <FreelancerSection />
      <AdvertiseJob />
      <MessageComponent />
      <Footer />
    </div>
  );
}

export default Home;
