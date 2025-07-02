import { Navigate } from 'react-router-dom';
import { type ReactNode } from 'react';
import useAuthenticated from '../hooks/useAuthenticated';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuthenticated();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
