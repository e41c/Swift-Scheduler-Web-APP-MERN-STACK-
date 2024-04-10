/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode' // Correct import statement
import axios from 'axios';

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    token: null,
    user: null,
    userId: null,
    role: null,
    isAdmin: false
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Attempt to get token from local storage on component mount
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setAuth({ ...auth, token: storedToken });
    }
  }, []);

  useEffect(() => {
    if (auth.token) {
      fetchUserData(auth.token);
    }
  }, [auth.token]);

  const fetchUserData = async (token) => {
    try {
      const decoded = jwtDecode(token);
      const url = decoded.role === 'student' ? `/auth/student/${decoded.userId}` : `/auth/teacher/${decoded.userId}`;
      
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserData(response.data);
      setIsAuthenticated(true);
      setAuth({ token, user: decoded.email, role: decoded.role, userId: decoded.userId, isAdmin: decoded.isAdmin });
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsAuthenticated(false);
    }
    console.log("auth ", auth)
  };

  const setUserAuthInfo = ({ token }) => {
    localStorage.setItem('token', token);
    setAuth({ ...auth, token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null, userId: null, role: null });
    setUserData(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ auth, setUserAuthInfo, logout, isAuthenticated, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}


// import { createContext, useContext, useEffect, useState } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import axios from 'axios';

// const AuthContext = createContext({});
// export const useAuth = () => useContext(AuthContext);

// // eslint-disable-next-line react/prop-types
// export default function AuthProvider({ children }) {
//   const [auth, setAuth] = useState({
//     token: localStorage.getItem('token'),
//     user: null,
//     userId: null,
//     role: null,
//   });
//   const [isAuthenticated, setIsAuthenticated] = useState(false); 
//   const [userData, setUserData] = useState(null);
  
//   useEffect(() => {
//     console.log('User data after update:', userData);
//   }, [userData]); // This effect runs whenever userData changes.
  
//   useEffect(() => {
//     if (auth.token) {
//       const decoded = jwtDecode(auth.token);
//       setAuth(prevAuth => ({ ...prevAuth, user: decoded.email, userId: decoded._id, role: decoded.role }));
//       //console.log('use effect token check:', decoded);
//       setIsAuthenticated(true); // Update isAuthenticated when token exists

//     } else {
//       setIsAuthenticated(false); // Update isAuthenticated when token doesn't exist
//     }
//   }, [auth.token]);

//   const setUserAuthInfo = ({ token }) => {
//     localStorage.setItem('token', token);
//     const decoded = jwtDecode(token);
//     setAuth({ token, user: decoded.email, role: decoded.role, userId: decoded._id });
//     setIsAuthenticated(true);

//     fetchUserData(decoded, token);
//   };
  
//   const fetchUserData = async (decoded, token) => {
//     if(!decoded || !decoded.userId) {
//       console.error('failed to send request:', decoded.userId, decoded);
//       return
//     }
//     console.log('decoded content:', decoded);
//     const url = decoded.role === 'student' ? `/auth/student/${decoded.userId}` : `/auth/teacher/${decoded.userId}`;
//     try {
//       console.log("api call token check", auth.token, decoded.userId, decoded.role)
//       const response = await axios.get(url, {
//         headers: { Authorization: `Bearer ${token}` },

//       });
//       console.log('User data fetched:', response.data);
//       setUserData(response.data);
//       //console.log('User data stored:', userData);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   }

//   const logout = () => {
//     localStorage.removeItem('token');
//     setAuth({ token: null, user: null, role: null, userId: null });
//     setIsAuthenticated(false); // Update isAuthenticated after logout
//   };

//   return (
//     <AuthContext.Provider value={{ auth, setUserAuthInfo, logout, isAuthenticated, userData, setUserData }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

