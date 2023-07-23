import React, { useState } from 'react';
import Login from './Login';
import { Link } from 'react-router-dom';
import profile from '/home/georget/Code/Agnam/frontend/src/assets/profile-image.png';
import { useAuth } from '../api/AuthContext';
import SearchBox from './SearchBox';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppHeader = ({ pageTitle }) => {
  
  const { isLoggedIn, handleLogin, handleLogout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  }

  const handleProfile = () => {
    setIsDropdownOpen(true);
  };
  
  return (
    <div className='row d-flex align-items-center mt-4'>
      <div className='col'>
        <div className='row d-flex align-items-center'>
          <div className='col-auto'>
            <Link to='/home' style={{ ...linkStyle }}>
              <h1>Agnam</h1>
            </Link>
          </div>
          {pageTitle && (
            <div className='col-auto'>
              <div className='verticle-line'></div>
            </div>
          )}
          {pageTitle && (
            <div className='col'>
              {/* Display page title */}
              <h1>{pageTitle}</h1>
            </div>
          )}
        </div>
      </div>
      <div className='col'>
        <div className='row d-flex align-items-center justify-content-end'>
          <div className='col-auto'>
            {pageTitle && <SearchBox />}
          </div>
          <div className='col-auto'>
            {isLoggedIn ? (
              <> 
                {/* Profile image dropdown */}
                <div className='dropdown'>
                  <img
                    src={profile}
                    width={40}
                    height={40}
                    alt='profile'
                    onClick={handleProfile}
                    style={{ cursor: 'pointer' }}
                  />
                  {isDropdownOpen && (
                    <div className='dropdown-menu'>
                      {/* Dropdown Content */}
                      <button className='dropdown-item'>Profile</button>
                      <button className='dropdown-item'>Settings</button>
                      <button 
                        className='dropdown-item'
                        onClick={() => handleLogout()}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button className='btn btn-primary' onClick={() => handleLogin()}>
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;

// {/* <div className='col-auto'>
//   <SearchBox setSearchValue={setSearchValue} />
// </div>
// <div className='col-auto'>
//   <Logout handleLogout={handleLogout} />
// </div> */}