// src/components/Navigation.jsx (수정 예시)
// 기존 Navigation 컴포넌트에 다음 코드를 추가하세요

import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navigation = ({ darkMode, setDarkMode }) => {
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/login');
      alert('로그아웃 되었습니다.');
    }
  };

  return (
    <nav className="...">
      {/* 기존 네비게이션 코드 */}
      
      {/* 사용자 정보 및 로그아웃 버튼 추가 */}
      <div className="flex items-center gap-4">
        {currentUser ? (
          <>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {currentUser.email}
              {userRole === 'admin' && (
                <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded">
                  관리자
                </span>
              )}
            </span>
            
            {/* 관리자만 보이는 링크 */}
            {userRole === 'admin' && (
              <div className="flex gap-2">
                <a 
                  href="/admin/events"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  이벤트 관리
                </a>
                <a 
                  href="/shop-admin"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  샵 관리
                </a>
                <a 
                  href="/learning-admin"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  학습 관리
                </a>
              </div>
            )}
            
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              로그아웃
            </button>
          </>
        ) : (
          <a
            href="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            로그인
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
