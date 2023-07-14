import React from 'react';

const Logout = ({handleLogout}) => {
    return (
        <div className='col'>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout;