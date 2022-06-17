import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { toast } from 'react-toastify';
import Login from './components/Login';
import Register from './components/Register';
import Layout from './components/Layout';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import About from './components/About';
import SinglePost from './components/SinglePost';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyLogin = async () => {
      const res = await fetch(`${process.env.REACT_APP_BLOG_API_URL}/auth/me`, {
        headers: {
          Authorization: token
        }
      });
      const data = await res.json();
      if (data.error) return toast.error(data.error);
      setUser(data);
      setIsAuthenticated(true);
    };
    token && verifyLogin();
  }, [token]);

  const logOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout isAuthenticated={isAuthenticated} logOut={logOut} user={user} />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login isAuthenticated={isAuthenticated} setToken={setToken} />} />
          <Route path='register' element={<Register isAuthenticated={isAuthenticated} setToken={setToken} />} />
          <Route path='post/:id' element={<SinglePost />} />
          <Route path='about' element={<About />} />
          <Route path='auth' element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path='new-post' element={<CreatePost />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
