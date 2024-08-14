import React, { useState } from 'react';
import Footer from '../components/Footer';
import server_url from '../../config.json';
import NavbarHome from "../home/NavbarHome";

const CustomerSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    fetch(`${server_url}/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then(result => {
          throw new Error(result.message || 'Failed to send email');
        });
      }
    })
    .then(data => {
      alert('Email sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    })
    .catch(error => {
      alert(`An error occurred: ${error.message}`);
    });
  };

  return (
    <div>
      <NavbarHome />
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
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name" 
                className="w-1/2 p-2 border border-gray-300 rounded"
                required
              />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email" 
                className="w-1/2 p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <input 
              type="text" 
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject" 
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message" 
              className="w-full p-2 border border-gray-300 rounded h-32"
              required
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
      <Footer />
    </div>
  );
}

export default CustomerSupport;
