// src/components/Navigation.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';

const Navigation = ({ darkMode, setDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white dark:bg-gray-800 shadow-lg backdrop-blur-lg bg-opacity-90 border-b border-gray-200 dark:border-gray-700' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
              <span className="text-2xl">🏒</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">UWH</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors font-medium">홈</a>
            <a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors font-medium">소개</a>
            <a href="/travel" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors font-medium">여행</a>
            <a href="/clubs" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors font-medium">클럽</a>
            <a href="/events" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors font-medium">일정</a>
            <a href="/shop" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors font-medium">샵</a>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="/login"
              className="hidden md:inline-block px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors font-medium"
            >
              로그인
            </a>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="md:hidden py-4 bg-white dark:bg-gray-800 rounded-lg mt-2 shadow-xl border border-gray-200 dark:border-gray-700">
            <a href="/" className="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">홈</a>
            <a href="/about" className="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">소개</a>
            <a href="/travel" className="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">여행</a>
            <a href="/clubs" className="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">클럽</a>
            <a href="/events" className="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">대회</a>
            <a href="/shop" className="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">샵</a>
            <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
              <a href="/login" className="block px-4 py-2 text-blue-500 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700">로그인</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
