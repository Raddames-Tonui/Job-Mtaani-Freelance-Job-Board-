import React from 'react';
import Footer from '../components/Footer';

const CustomerSupport = () => {
  return (
    <div>
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="lg:w-1/2 text-center lg:text-left p-4">
        <h2 className="text-3xl font-bold mb-4">We care about customer services</h2>
        <p className="mb-4">
          Want to chat? We'd love to hear from you! Get in touch with our Customer Success Team to inquire about speaking events, advertising rates, or just say hello.
        </p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Email Support
        </button>
      </div>
      <div className="lg:w-1/2 bg-white p-8 rounded shadow-lg">
        <h3 className="text-xl font-semibold mb-6">Get in Touch</h3>
        <form className="space-y-4">
          <div className="flex space-x-4">
            <input 
              type="text" 
              placeholder="Name" 
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
          </div>
          <input 
            type="text" 
            placeholder="Subject" 
            className="w-full p-2 border border-gray-300 rounded"
          />
          <textarea 
            placeholder="Message" 
            className="w-full p-2 border border-gray-300 rounded h-32"
          ></textarea>
          <button 
            type="submit" 
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Send Message ✉️
          </button>
        </form>
      </div>

    </div>
          <Footer/>
    </div>
  );
}

export default CustomerSupport;
