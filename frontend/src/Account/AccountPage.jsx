import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Icon } from '@iconify/react';
import StripePayment from './PaymentForm';

const AccountPage = () => {
  const { currentUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false)

  if (!currentUser) {
    return <div>Loading...</div>; // Or some loading indicator
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-10">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center space-x-4 mb-6">
            {currentUser.avatar ? (
              <img 
                src={currentUser.avatar} 
                alt="Profile Picture" 
                className="rounded-full w-12 h-12 ring-1 ring-[#3322ca] object-cover" 
              />            
            ) : (
              <Icon icon="healthicons:ui-user-profile" className='w-12 h-12'/>
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
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-gray-700">Balance:</p>
                <p className="text-2xl font-semibold text-blue-800">$100.00</p> {/* Example balance */}
              </div>

              <div>
                <button onClick={()=>setIsOpen(!isOpen)} className="block w-full text-white bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-4 rounded transition duration-300">
                    Add Funds
                </button>

                {isOpen && (
                    <StripePayment/>
                )}

              </div>

              <button className="block w-full text-white bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-4 rounded transition duration-300">
                Withdraw Funds
              </button>
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
}

export default AccountPage;
