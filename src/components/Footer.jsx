// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  const footerSections = [
    { title: '커뮤니티', links: ['클럽 찾기', '대회','팀 찾기'] },
    { title: '배우기', links: ['초보 가이드','장비', '규칙', '전략'] },
    { title: '회사', links: ['소개', '채용', '문의'] }
  ];

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">🏒</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">UWH</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              전 세계 수중하키 커뮤니티를 연결하는<br />최고의 플랫폼
            </p>
            <div className="flex gap-3">
              {['📷', '▶️', '🐦'].map((emoji, idx) => (
                <button 
                  key={idx} 
                  className="w-10 h-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all flex items-center justify-center text-xl"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, idx) => (
            <div key={idx}>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 dark:text-gray-400">
            © 2025 UWH World. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 text-sm">개인정보처리방침</a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 text-sm">이용약관</a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 text-sm">쿠키 설정</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;