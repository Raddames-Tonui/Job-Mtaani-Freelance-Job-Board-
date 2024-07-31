import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

function NoPage() {
    const { user, loading, error } = useContext(UserContext);

    useEffect(() => {
        console.log('User data:', user);
    }, [user]);

    return (
        <div className='h-[90vh]'>
            <h1>NoPage</h1>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {user && Array.isArray(user) && (
                <div>
                    {user.map(u => (
                        <div key={u.id}>
                            <p>Username: {u.username}</p>
                            <p>Email: {u.email}</p>
                            <p>Admin: {u.is_admin ? 'Yes' : 'No'}</p>
                            <p>Client: {u.is_client ? 'Yes' : 'No'}</p>
                            <p>Freelancer: {u.is_freelancer ? 'Yes' : 'No'}</p>
                            <hr />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default NoPage;
