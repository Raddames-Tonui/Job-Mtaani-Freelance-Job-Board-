import React from 'react';

const MessageModal = ({ isOpen, onClose, senderId, receiverId }) => {
  if (!isOpen) return null;

  const handleSend = () => {
    // Add logic to handle sending the message here
    console.log('Sending message from:', senderId, 'to:', receiverId);
    onClose(); // Close the modal after sending
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Send Message</h2>
        <p className="mb-4">Sender ID: {senderId}</p>
        <p className="mb-4">Receiver ID: {receiverId}</p>
        <textarea
          rows="4"
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          placeholder="Type your message here..."
        ></textarea>
        <div className="flex justify-end space-x-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-md"
            onClick={handleSend}
          >
            Send
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white py-1 px-3 rounded-md"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
