import React, { useEffect, useState } from 'react';
import AppHeader from '../components/AppHeader';
import { useAuth } from '../api/AuthContext';

const ProfilePage = () => {

  const { isLoggedIn } = useAuth();
	const pageTitle = 'Profile';

	return (
		<div className='mangaPage'>
			<div className='app-header'>
				<AppHeader isLoggedIn={isLoggedIn} pageTitle={pageTitle}/>
			</div>
			<div className='app-body'>
				<h2>hi</h2>
			</div>
		</div>
	);
};

export default ProfilePage;
