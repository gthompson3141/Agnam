import React from 'react';
import logoutButton from '/home/georget/Code/Agnam/frontend/src/assets/logout-image.png';

const Logout = ({handleLogout}) => {
    return (
        <div className='col-sm-1'>
            <img 
                src={logoutButton}
                width={40}
                height={40}
                alt='Logout'
                onClick={handleLogout}
                style={{ cursor: 'pointer', filter: 'brightness(100%)', WebkitFilter: 'brightness(100%)', }}
            />
        </div>
    )
}

export default Logout;
