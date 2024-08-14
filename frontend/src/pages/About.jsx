import React from 'react';
import teammembers1 from '../assets/teammembers1.jpeg';
import MessageComponent from '../components/MessageComponent';
import Footer from '../components/Footer';
import NavbarHome from '../home/NavbarHome';

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <NavbarHome />

      {/* Hero Section */}
      <section className="bg-blue-200 text-black py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Discover who we are and what drives us to make a difference.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-blue-200 ">
        <div className="container mx-auto px-4 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-blue-50 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              Our mission is to provide top-notch services that exceed our clients' expectations. We are dedicated to delivering quality and innovation.
            </p>
          </div>
          <div className="bg-blue-50 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-gray-700">
              We envision a world where our solutions make everyday life easier and more efficient. Our goal is to be at the forefront of technology and creativity.
            </p>
          </div>
          <div className="bg-blue-50 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <p className="text-gray-700">
              Integrity, innovation, and excellence are the core values that drive our company. We believe in doing the right thing, embracing creativity, and striving for excellence in everything we do.
            </p>
          </div>
        </div>
      </section>

      

      {/* Contact Section */}
      {/* <section className="py-16 bg-blue-100 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-blue-800">Get in Touch</h2>
          <p className="text-lg mb-6">We would love to hear from you! Feel free to reach out to us with any questions or inquiries.</p>
          <a href="mailto:contact@example.com" className="bg-blue-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">Contact Us</a>
        </div>
      </section> */}

      <MessageComponent />
      <Footer />
    </div>
  );
};

export default About;
