import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform your login logic here, such as making API requests to the backend
    // to authenticate the user using the provided username and password.
    // You can use libraries like axios for making HTTP requests.
    const data = { email: email, password: password, };
        axios.post('http://localhost:8000/user/verifyLogin/', data)
            .then((response) => {
              onLogin();
            })
            .catch(error => {
              console.log(error);
            });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;