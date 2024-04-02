import { Route, Navigate } from 'react-router-dom'
import { useAuth } from '../../AuthContext'

export default function PrivateRoute({ children }) {
    const { auth } = useAuth();
  return auth.isAdmin ? (
    children
  ) : (
    <Navigate to="/home" />
  );
}