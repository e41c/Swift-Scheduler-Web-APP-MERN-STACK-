import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initially set to false

  useEffect(() => {
    if (auth.token) {
      const decoded = jwtDecode(auth.token);
      setAuth(prevAuth => ({ ...prevAuth, user: decoded.email, userId: decoded._id, role: decoded.role }));
      setIsAuthenticated(true); // Update isAuthenticated when token exists
    } else {
      setIsAuthenticated(false); // Update isAuthenticated when token doesn't exist
    }
  }, [auth.token]);

  const setUserAuthInfo = ({ token }) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setAuth({ token, user: decoded.email, role: decoded.role, userId: decoded._id });
    setIsAuthenticated(true); // Update isAuthenticated after setting the user info
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null, role: null, userId: null });
    setIsAuthenticated(false); // Update isAuthenticated after logout
  };

  return (
    <AuthContext.Provider value={{ auth, setUserAuthInfo, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}