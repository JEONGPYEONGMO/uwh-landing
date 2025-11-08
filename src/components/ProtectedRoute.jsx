// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser, userRole } = useAuth();

  // 로그인하지 않은 경우
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // 특정 역할이 필요한 경우
  if (requiredRole && userRole !== requiredRole) {
    // 관리자 페이지에 일반 사용자가 접근하려는 경우 홈으로 리디렉션
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
