import { Navigate, Outlet } from 'react-router-dom';
import { useRealmApp } from '../hooks/useRealmApp';

const ProtectedRoute = ({
  isAllowed = true,
  redirectPath = '/',
  children,
}) => {
  const { currentUser } = useRealmApp();
  if (!currentUser || !isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
