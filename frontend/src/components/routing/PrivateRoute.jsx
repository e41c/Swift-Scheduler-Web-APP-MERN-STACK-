// frontend\src\components\routing\PrivateRoute.jsx
import { Route, Navigate } from 'react-router-dom'
import { useAuth } from '../../AuthContext'

export default function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}
