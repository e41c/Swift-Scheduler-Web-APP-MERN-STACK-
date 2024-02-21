import { createContext, useContext, useEffect, useState } from 'react';
//import jwt_decode from 'jwt-decode';
import * as jwt_decode from 'jwt-decode';


const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    user: null,
    userId: null,
    role: null,
  });

  useEffect(() => {
    if (auth.token) {
      const decoded = jwt_decode(auth.token);
      setAuth(prevAuth => ({ ...prevAuth, user: decoded.email, userId: decoded._id, role: decoded.role }));
    }
  }, [auth.token]);

  const setUserAuthInfo = ({ token }) => {
    localStorage.setItem('token', token);
    const decoded = jwt_decode(token);
    setAuth({ token, user: decoded.email, role: decoded.role, userId: decoded._id});
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null, role: null, userId: null});
  };

  const isAuthenticated = () => {
    return auth.token !== null;
  };

  return (
    <AuthContext.Provider value={{ auth, setUserAuthInfo, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
