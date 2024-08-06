// frontend/src/components/SubmitProposal.jsx
import React, { useState } from 'react';

function SubmitProposal({ serverUrl, freelancerId, jobPostingId }) {
    const [content, setContent] = useState('');

    const handleSubmit = () => {
        fetch(`${serverUrl}/proposals`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                freelancer_id: freelancerId,
                job_posting_id: jobPostingId,
                content: content
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Proposal submitted:', data);
            setContent(''); // Clear the content after submission
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <h2>Submit Proposal</h2>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            <button onClick={handleSubmit}>Submit Proposal</button>
        </div>
    );
}

export default SubmitProposal;
