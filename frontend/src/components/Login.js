import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const data = { email: email, password: password };
    axios
      .post('http://localhost:8000/user/verifyLogin/', data)
      .then((response) => {
        console.log(response.data);
        if (response.data.message === 'Login successful') {
          const token = email;
          onLogin(token);
        } else {
          setError('Invalid login');
        }
      })
      .catch((error) => {
        console.log(error);
        setError('Email or Password Incorrect');
      });
  };

  return (
    <div className="login-container" style={{ transform: 'translate(0%, 75%)' }}>
      <form onSubmit={handleLogin}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-5 text-uppercase">Login</h2>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        className="form-control form-control-lg bg-dark border-white text-white"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        className="form-control form-control-lg bg-dark border-white text-white"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {error && <p className="text-danger mb-4">{error}</p>}
                    <button className="btn btn-outline-light btn-lg px-5" type="submit">
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

{/* 
<label>
          Username:
          <input className="form-control" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
*/}