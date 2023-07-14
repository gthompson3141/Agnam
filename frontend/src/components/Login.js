import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = (e) => {
  e.preventDefault();
  const data = { email: email, password: password };
  axios.post('http://localhost:8000/user/verifyLogin/', data)
    .then((response) => {
      console.log(response.data);
      if (response.data.message === 'Login successful') {
        const token = email;
        onLogin(token);
      } else {
        console.log('Invalid login');
      }
    })
    .catch(error => {
      console.log(error);
    });
};

  return (
    <div className='login-container' style={{transform: 'translate(0%, 75%)'}}>
      <form onSubmit={handleLogin}>
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card bg-dark text-white" style={{borderRadius: '1rem'}}>
                <div class='card-body p-5 text-center'>
                  <div class='mb-md-5 mt-md-4 pb-5'>
                    <h2 class='fw-bold mb-5 text-uppercase'>Login</h2>
                    <div class='form-outline form-white mb-4'>
                      <input 
                        type='email' 
                        class='form-control form-control-lg bg-dark border-white text-white'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div class='form-outline form-white mb-4'>
                      <input 
                        type='password' 
                        class='form-control form-control-lg bg-dark border-white text-white' 
                        placeholder='Password'
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <button class="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
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