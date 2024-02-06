import { ReactNode } from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  path: string;
  children: ReactNode;
  isAuthenticated: boolean;
}

export const PrivateRoute = ({
  children,
  isAuthenticated,
  ...rest
}: PrivateRouteProps) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated ? children : <Navigate to="/login" replace />}
    />
  );
};
