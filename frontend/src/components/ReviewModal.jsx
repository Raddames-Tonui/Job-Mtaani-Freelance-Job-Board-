import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ReviewModal = ({ isOpen, onClose, userId }) => {
    const [score, setScore] = useState(5);
    const [review, setReview] = useState('');
    const { createRating, currentUser } = useContext(UserContext);

    const handleSubmit = () => {
        if (!currentUser || !userId) return;

        createRating(userId, score, review)
            .then(() => {
                toast.success('Review submitted successfully!');
                onClose();
            })
            .catch(err => {
                toast.error(`Error: ${err.message}`);
            });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-gray-900 opacity-50" onClick={onClose}></div>
            <div className="bg-white p-6 rounded-lg shadow-lg relative">
                <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={onClose}>
                    <FaTimes size={20} />
                </button>
                <h2 className="text-lg font-semibold mb-4">Submit a Review</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Score</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={score}
                        onChange={(e) => setScore(parseInt(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Review</label>
                    <textarea
                        rows="4"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default ReviewModal;
