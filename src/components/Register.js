import { useState } from 'react';
import { toast } from 'react-toastify';

const Register = () => {
  const [{ name, email, password }, setFormState] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = e => setFormState(prev => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!name || !email || !password) return toast.error('Please fill all the fields');
    console.log(name, email, password);
  };

  return (
    <div className='container'>
      <div className='mt-5 row justify-content-center'>
        <form className='col-md-6' onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col'>
              <label htmlFor='name' className='form-label'>
                Name:
              </label>
              <div className='input-group mb-3'>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  value={name}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <label htmlFor='email' className='form-label'>
                Email:
              </label>
              <div className='input-group mb-3'>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  value={email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <label htmlFor='password' className='form-label'>
                Password:
              </label>
              <div className='input-group mb-3'>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  value={password}
                  onChange={handleChange}
                />
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
