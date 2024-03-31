// frontend\src\components\routing\PublicRoute.jsx
import { Route, Navigate } from 'react-router-dom'
import { useAuth } from '../../AuthContext'
export default function PublicRoute({ children }) {
    const { isAuthenticated } = useAuth();
  return !isAuthenticated ? (
    children
  ) : (
    <Navigate to="/home" />
  );
}
