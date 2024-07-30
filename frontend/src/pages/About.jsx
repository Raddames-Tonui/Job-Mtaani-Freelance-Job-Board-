import React from 'react';
import teammembers1 from '../assets/teammembers1.jpeg';
import MessageComponent from '../components/MessageComponent';

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-200 to-blue-200 text-black py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl">
            Discover who we are and what drives us to make a difference.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-gradient-to-b from-blue-200 to-blue-100">
        <div className="container mx-auto px-4 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              Our mission is to provide top-notch services that exceed our clients' expectations. We are dedicated to delivering quality and innovation.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-700">
              We envision a world where our solutions make everyday life easier and more efficient. Our goal is to be at the forefront of technology and creativity.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-700">
              Integrity, innovation, and excellence are the core values that drive our company. We believe in doing the right thing, embracing creativity, and striving for excellence in everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-blue-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Meet Our Team</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Example Team Member */}
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs">
              <img src={teammembers1} alt="Team Member" className="w-32 h-32 rounded-full mx-auto mb-4"/>
              <h3 className="text-xl font-semibold">Jane Doe</h3>
              <p className="text-gray-600">CEO</p>
              <p className="text-gray-700 mt-2">Jane leads our team with passion and dedication. Her vision and expertise drive our success.</p>
            </div>
            {/* Add more team members as needed */}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-b from-blue-100 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <p className="text-lg mb-4">We would love to hear from you! Feel free to reach out to us with any questions or inquiries.</p>
          <a href="mailto:contact@example.com" className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700">Contact Us</a>
        </div>
      </section>
      <MessageComponent />

    </div>
  );
};

export default About;
