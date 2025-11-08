// src/components/Navigation.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navigation = ({ darkMode, setDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      setMobileMenu(false);
      navigate('/login');
      alert('로그아웃 되었습니다.');
    }
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white dark:bg-gray-800 shadow-lg backdrop-blur-lg bg-opacity-90 border-b border-gray-200 dark:border-gray-700' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
              <span className="text-2xl">👋</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">UWH</span>
          </Link>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors font-medium">홈</Link>
            <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors font-medium">소개</Link>
            <Link to="/travel" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors font-medium">여행</Link>
            <Link to="/clubs" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors font-medium">클럽</Link>
            <Link to="/events" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors font-medium">일정</Link>
            <Link to="/shop" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors font-medium">샵</Link>
            
            {/* 로그인한 사용자만 보이는 메뉴 */}
            {currentUser && (
              <Link to="/learning" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors font-medium">학습</Link>
            )}
            
            {/* 관리자만 보이는 메뉴 */}
            {userRole === 'admin' && (
              <>
                <Link to="/admin/events" className="text-orange-600 dark:text-orange-400 hover:text-orange-700 transition-colors font-medium">이벤트 관리</Link>
                <Link to="/shop-admin" className="text-orange-600 dark:text-orange-400 hover:text-orange-700 transition-colors font-medium">샵 관리</Link>
                <Link to="/learning-admin" className="text-orange-600 dark:text-orange-400 hover:text-orange-700 transition-colors font-medium">학습 관리</Link>
              </>
            )}
          </div>

          {/* 우측 버튼들 */}
          <div className="flex items-center gap-3">
            {/* 사용자 정보 (데스크톱) */}
            {currentUser ? (
              <div className="hidden md:flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {currentUser.email}
                  </span>
                  {userRole === 'admin' && (
                    <span className="ml-1 px-2 py-0.5 bg-red-500 text-white text-xs rounded font-semibold">
                      관리자
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  로그아웃
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                로그인
              </Link>
            )}

            {/* 다크모드 토글 */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              aria-label="다크모드 토글"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>

            {/* 모바일 메뉴 버튼 */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label="메뉴"
            >
              {mobileMenu ? <X className="w-6 h-6 text-gray-900 dark:text-white" /> : <Menu className="w-6 h-6 text-gray-900 dark:text-white" />}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {mobileMenu && (
          <div className="md:hidden py-4 bg-white dark:bg-gray-800 rounded-lg mt-2 shadow-xl border border-gray-200 dark:border-gray-700">
            {/* 사용자 정보 (모바일) */}
            {currentUser && (
              <div className="px-4 py-3 mb-2 bg-gray-50 dark:bg-gray-700 rounded-lg mx-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {currentUser.email}
                  </span>
                </div>
                {userRole === 'admin' && (
                  <span className="inline-block mt-1 px-2 py-0.5 bg-red-500 text-white text-xs rounded font-semibold">
                    관리자
                  </span>
                )}
              </div>
            )}

            {/* 일반 메뉴 */}
            <Link to="/" onClick={() => setMobileMenu(false)} className="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">홈</Link>
            <Link to="/about" onClick={() => setMobileMenu(false)} className="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">소개</Link>
            <Link to="/travel" onClick={() => setMobileMenu(false)} className="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">여행</Link>
            <Link to="/clubs" onClick={() => setMobileMenu(false)} className="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">클럽</Link>
            <Link to="/events" onClick={() => setMobileMenu(false)} className="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">대회</Link>
            <Link to="/shop" onClick={() => setMobileMenu(false)} className="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">샵</Link>
            
            {/* 로그인한 사용자 메뉴 */}
            {currentUser && (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <Link to="/learning" onClick={() => setMobileMenu(false)} className="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">학습</Link>
              </>
            )}

            {/* 관리자 메뉴 */}
            {userRole === 'admin' && (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <div className="px-4 py-2 text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase">관리자 메뉴</div>
                <Link to="/admin/events" onClick={() => setMobileMenu(false)} className="block px-4 py-2 text-orange-600 dark:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-700">이벤트 관리</Link>
                <Link to="/shop-admin" onClick={() => setMobileMenu(false)} className="block px-4 py-2 text-orange-600 dark:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-700">샵 관리</Link>
                <Link to="/learning-admin" onClick={() => setMobileMenu(false)} className="block px-4 py-2 text-orange-600 dark:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-700">학습 관리</Link>
              </>
            )}

            {/* 로그인/로그아웃 버튼 */}
            <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
              {currentUser ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-red-500 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <LogOut className="w-4 h-4" />
                  로그아웃
                </button>
              ) : (
                <Link to="/login" onClick={() => setMobileMenu(false)} className="block px-4 py-2 text-blue-500 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700">로그인</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
