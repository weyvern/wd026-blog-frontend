import { Link, NavLink, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ user, isAuthenticated, logOut }) => {
  return (
    <>
      <ToastContainer />
      <nav className='navbar navbar-expand navbar-dark bg-dark' aria-label='Second navbar example'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            Cities in the world! ✈️🌍
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarsExample02'
            aria-controls='navbarsExample02'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarsExample02'>
            <ul className='navbar-nav ms-auto'>
              {user && (
                <li className='nav-item'>
                  <span className='nav-link'> Welcome back {user.firstName} ❤️</span>
                </li>
              )}
              <li className='nav-item'>
                <NavLink to='/' className='nav-link'>
                  Home
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/about' className='nav-link'>
                  About
                </NavLink>
              </li>
              {isAuthenticated ? (
                <>
                  <li className='nav-item'>
                    <NavLink to='/auth/new-post' className='nav-link'>
                      Create post
                    </NavLink>
                  </li>
                  <li className='nav-item' onClick={logOut} style={{ cursor: 'pointer' }}>
                    <span className='nav-link'>Log out</span>
                  </li>
                </>
              ) : (
                <>
                  <li className='nav-item'>
                    <NavLink to='/register' className='nav-link'>
                      Register
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink to='/login' className='nav-link'>
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
