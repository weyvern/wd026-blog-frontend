import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthState = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signUp = async formData => {
    try {
      const {
        data: { token }
      } = await axios.post(`${process.env.REACT_APP_BLOG_API_URL}/auth/signup`, formData);
      localStorage.setItem('token', token);
    } catch (error) {
      toast.error(error.response?.data.error || error.message);
    }
  };

  const signIn = async formData => {
    try {
      const {
        data: { token }
      } = await axios.post(`${process.env.REACT_APP_BLOG_API_URL}/auth/signin`, formData);
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
    } catch (error) {
      toast.error(error.response?.data.error || error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signUp, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
