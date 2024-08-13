import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { Icon } from '@iconify/react';
import PaymentForm from './PaymentForm';
import MpesaPayment from './MpesaPayment';
import PayFreelancerForm from './PayFreelancerForm'; // Assuming you have this component

const AccountPage = () => {
  const { currentUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isCard, setIsCard] = useState(false);
  const [isMpesa, setIsMpesa] = useState(false);
  const [isPayFreelancer, setIsPayFreelancer] = useState(false);
  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    // Fetch freelancers data
    const fetchFreelancers = async () => {
      try {
        const response = await fetch('/api/freelancers'); // Update with your endpoint
        const data = await response.json();
        setFreelancers(data);
      } catch (error) {
        console.error('Error fetching freelancers:', error);
      }
    };

    fetchFreelancers();
  }, []);

  if (!currentUser) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <div className="max-w-4xl mx-auto py-6 px-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center space-x-4 mb-6">
            {currentUser.avatar ? (
              <img 
                src={currentUser.avatar} 
                alt="Profile Picture" 
                className="rounded-full w-16 h-16 ring-1 ring-[#3322ca] object-cover" 
              />            
            ) : (
              <Icon icon="healthicons:ui-user-profile" className='w-16 h-16'/>
            )}
            <div>
              <h1 className="text-2xl font-semibold text-blue-800">
                {currentUser.firstname} {currentUser.lastname}
              </h1>
              <p className="text-gray-600">{currentUser.email}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Wallet</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-700">Balance:</p>
                <p className="text-2xl font-semibold text-blue-800">$100.00</p> {/* Example balance */}
              </div>

              <div className='grid gap-4 md:grid-cols-2'>
                <div className='border border-blue-500 rounded-md'>
                  <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="block w-full text-white bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-4 rounded transition duration-300"
                  >
                    Add Funds
                  </button>

                  {isOpen && (
                    <div className='flex flex-wrap py-2 px-4 gap-4'>
                      <button 
                        className='px-4 py-2 rounded border border-slate-800' 
                        onClick={() => setIsCard(!isCard)}
                      >
                        Stripe
                      </button>
                      <button 
                        className='border-2 border-green-500 rounded-md overflow-hidden' 
                        onClick={() => setIsMpesa(!isMpesa)}
                      >
                        <img src="/mpesa-icon.png" alt="Mpesa" className='h-10 w-16 object-cover' />
                      </button>
                    </div>
                  )}

                  {/* Stripe Payment Form Modal */}
                  {isCard && (
                    <div className='fixed inset-0 flex items-center justify-center z-50'>
                      <div 
                        className='absolute inset-0 bg-black bg-opacity-30' 
                        onClick={() => setIsCard(false)}
                      ></div>
                      <div className='relative p-4 md:p-8 w-full md:w-1/2 bg-white rounded shadow-lg'>
                        <button 
                          onClick={() => setIsCard(false)} 
                          className='absolute top-2 right-2 text-gray-600 hover:text-gray-900'
                        >
                          X
                        </button>
                        <PaymentForm />
                      </div>
                    </div>
                  )}

                  {/* Mpesa Payment Form Modal */}
                  {isMpesa && (
                    <div className='fixed inset-0 flex items-center justify-center z-50'>
                      <div 
                        className='absolute inset-0 bg-black bg-opacity-30' 
                        onClick={() => setIsMpesa(false)}
                      ></div>
                      <div className='relative p-4 md:p-8 w-full md:w-1/2 bg-white rounded shadow-lg'>
                        <button 
                          onClick={() => setIsMpesa(false)} 
                          className='absolute top-2 right-2 text-gray-600 hover:text-gray-900'
                        >
                          X
                        </button>
                        <MpesaPayment />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <button 
                    onClick={() => setIsPayFreelancer(!isPayFreelancer)}
                    className="block w-full text-white bg-green-600 hover:bg-green-700 font-semibold py-2 px-4 rounded transition duration-300"
                  >
                    Pay Freelancer
                  </button>

                  {/* Pay Freelancer Form Modal */}
                  {isPayFreelancer && (
                    <div className='fixed inset-0 flex items-center justify-center z-50'>
                      <div 
                        className='absolute inset-0 bg-black bg-opacity-30' 
                        onClick={() => setIsPayFreelancer(false)}
                      ></div>
                      <div className='relative p-4 md:p-8 w-full md:w-1/2 bg-white rounded shadow-lg'>
                        <button 
                          onClick={() => setIsPayFreelancer(false)} 
                          className='absolute top-2 right-2 text-gray-600 hover:text-gray-900'
                        >
                          X
                        </button>
                        <PayFreelancerForm  />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <button 
                  className="block w-full text-white bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-4 rounded transition duration-300"
                >
                  Withdraw Funds
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mt-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Recent Transactions</h2>
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <span className="text-gray-700">Payment to Freelancer</span>
                <span className="text-gray-600">-$50.00</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-700">Payment from Client</span>
                <span className="text-gray-600">+$150.00</span>
              </li>
              {/* Add more transactions as needed */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
