// src/components/CTA.jsx - 업데이트 버전
import React from 'react';

const CTA = () => {
  return (
    <div className="py-20 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          지금 바로 시작하세요
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          전 세계 수중하키 커뮤니티와 함께하세요. 무료로 가입하고 다양한 기능을 경험해보세요!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/login"
            className="inline-block bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 hover:bg-gray-50"
          >
            무료 가입하기
          </a>
          <a
            href="/about"
            className="inline-block bg-transparent border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105"
          >
            더 알아보기
          </a>
        </div>
        <p className="text-white/80 text-sm mt-8">
          이미 회원이신가요? <a href="/login" className="underline hover:text-white font-semibold">로그인하기</a>
        </p>
      </div>
    </div>
  );
};

export default CTA;
