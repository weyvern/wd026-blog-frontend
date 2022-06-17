import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = ({ isAuthenticated, setToken }) => {
  const [{ firstName, lastName, email, password }, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = e => setFormState(prev => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      if (!firstName || !lastName || !email || !password) return toast.error('Please fill all the fields');
      const res = await fetch(`${process.env.REACT_APP_BLOG_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password
        })
      });
      const { token, error } = await res.json();
      if (token) {
        localStorage.setItem('token', token);
        return setToken(token);
      }
      if (error) return toast.error(error);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isAuthenticated) return <Navigate to='/' />;
  return (
    <div className='container'>
      <div className='mt-5 row justify-content-center'>
        <form className='col-md-6' onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col'>
              <label htmlFor='name' className='form-label'>
                First name:
              </label>
              <div className='input-group mb-3'>
                <input type='text' className='form-control' id='firstName' value={firstName} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <label htmlFor='name' className='form-label'>
                Last name:
              </label>
              <div className='input-group mb-3'>
                <input type='text' className='form-control' id='lastName' value={lastName} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <label htmlFor='email' className='form-label'>
                Email:
              </label>
              <div className='input-group mb-3'>
                <input type='email' className='form-control' id='email' value={email} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <label htmlFor='password' className='form-label'>
                Password:
              </label>
              <div className='input-group mb-3'>
                <input type='password' className='form-control' id='password' value={password} onChange={handleChange} />
              </div>
            </div>
          </div>
          <button type='submit' className='btn btn-primary'>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
