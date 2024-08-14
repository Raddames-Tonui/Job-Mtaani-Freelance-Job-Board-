import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { Icon } from '@iconify/react';
import mpesaIcon from '../assets/MpesaIcon.png';
import MpesaPayment from './MpesaPayment';

const AccountPage = () => {
  const { currentUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isMpesa, setIsMpesa] = useState(false);
  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const response = await fetch('/api/freelancers'); 
        const data = await response.json();
        setFreelancers(data);
      } catch (error) {
        console.error('Error fetching freelancers:', error);
      }
    };

    fetchFreelancers();
  }, []);

  if (!currentUser) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="h-[90vh] bg-gray-100 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-4">
            {currentUser.avatar ? (
              <img 
                src={currentUser.avatar} 
                alt="Profile Picture" 
                className="rounded-full w-20 h-20 ring-2 ring-[#3322ca] object-cover" 
              />            
            ) : (
              <Icon icon="healthicons:ui-user-profile" className="w-20 h-20 text-gray-500" />
            )}
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-blue-800">
                {currentUser.firstname} {currentUser.lastname}
              </h1>
              <p className="text-gray-600">{currentUser.email}</p>
            </div>
          </div>

          <div className="w-full bg-gray-50 rounded-lg p-5 mt-6">
            <h2 className="text-xl font-semibold mb-4 text-center text-green-700">MPESA PAYMENT</h2>
            <div className="space-y-4">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="w-full text-white bg-green-600 hover:bg-green-700 font-semibold py-2 px-4 rounded transition duration-300"
              >
                Pay Freelancer
              </button>

              {isOpen && (
                <div className="flex justify-center mt-4">
                  <button 
                    className="border-2 border-green-500 rounded-md overflow-hidden" 
                    onClick={() => setIsMpesa(!isMpesa)}
                  >
                    <img src={mpesaIcon} alt="Mpesa" className="h-10 w-16 object-cover" />
                  </button>
                </div>
              )}

              {isMpesa && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div 
                    className="absolute inset-0 bg-black bg-opacity-30 h" 
                    onClick={() => setIsMpesa(false)}
                  ></div>
                  <div className="relative p-4 md:p-8 w-full md:w-1/2 bg-white rounded shadow-lg">
                    <button 
                      onClick={() => setIsMpesa(false)} 
                      className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    >
                      X
                    </button>
                    <MpesaPayment />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
