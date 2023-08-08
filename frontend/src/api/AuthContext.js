import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    setToken(token);
    localStorage.setItem('authToken', token);
  };
    
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    // Check if there's a stored token in local storage
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
    }
  }, []);

	return (
		<AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout, token }}>
      {children}
    </AuthContext.Provider>
	);
};

export const useAuth = () => {
  return useContext(AuthContext);
}