import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Icon } from '@iconify/react';
import AddFundsForm from './AddFundsForm';

const AccountPage = () => {
  const { currentUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isCard, setIsCard] = useState(false)
  const [isMpesa, setIsMpesa] = useState(false)

  if (!currentUser) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return (
    <div className="min-h-screen bg-gray-100 relative">
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

              <div className='grid gap-8 md:grid-cols-2 '>
                
                <div className='border border-blue-500 rounded-md'>
                  <button 
                  onClick={() => setIsOpen(!isOpen)} 
                  className="block w-full text-white bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-4 rounded transition duration-300"
                >
                  Add Funds
                </button>

                {isOpen && (
                  <div className='flex py-2 px-4 gap-8'>
                    <button className='px-4 rounded antialiased font-bold border-slate-800 border-2' onClick={()=>setIsCard(!isCard)}>Stripe</button>
                    <button className='border-2 border-green-500 rounded-md overflow-hidden '>
                      <img src="/mpesa-icon.png" alt="" className='h-10 w-16 object-cover' />
                    </button>
                  </div>
                )}

                {isCard && (
                  <div className='fixed inset-0 flex items-center justify-center z-50'>
                    <div className='absolute w-1/2inset-0 bg-black bg-opacity-30' onClick={() => setIsCard(false)}></div>
                    <div className='relative p-8 w-1/2 bg-white rounded shadow-lg'>
                      <button 
                        onClick={() => setIsCard(false)} 
                        className='absolute top-2 right-2 text-gray-600 hover:text-gray-900'
                      >
                        X
                      </button>
                      <AddFundsForm/>
                    </div>
                  </div>
                )}
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
