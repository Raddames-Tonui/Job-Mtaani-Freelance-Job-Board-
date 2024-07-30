import React, { useState } from 'react';
import { SiGooglemessages } from 'react-icons/si';

const MessageComponent = () => {
    const [showMessage, setShowMessage] = useState(false);

    const toggleMessage = () => {
        setShowMessage(!showMessage);
    };

    return (
        <> 
            <div 
                className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition-colors animate-bounce"
                onClick={toggleMessage}
            >
                <SiGooglemessages size={24} />
            </div>
            {showMessage && (
                <div className="fixed bottom-20 right-8 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
                    <div className="flex justify-between items-center border-b pb-2 mb-2">
                        <h3 className="text-lg font-semibold">Message Us</h3>
                        <button 
                            className="text-gray-500 hover:text-gray-700"
                            onClick={toggleMessage}
                        >
                            &times;
                        </button>

                    </div>
                    <p>Your message content goes here. You can put any details you want to communicate to users.</p>
                    <div>
                        
                    </div>
                </div>
            )}
        </>
    );
};

export default MessageComponent;
