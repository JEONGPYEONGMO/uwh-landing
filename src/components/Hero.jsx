// src/components/Hero.jsx
import React from 'react';
import { Play, ChevronRight, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500 bg-opacity-20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-8 animate-pulse">
            <Zap className="w-4 h-4" />
            수중 스포츠의 새로운 세계
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            UnderWater Hockey와 함께<br />
            <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
              새로운 World로
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto">
            팀을 찾고, 대회에 참가하고, 전 세계 플레이어들과 연결되세요.
            초보자부터 프로까지, 모두를 환영합니다.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              무료로 시작하기
              <ChevronRight className="w-5 h-5" />
            </button>
            <button className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 px-10 py-5 rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              2분 소개 영상
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl aspect-video flex items-center justify-center border border-gray-200 dark:border-gray-700 overflow-hidden group">
            <div className="text-center p-8">
              <div className="text-9xl mb-4 transform group-hover:scale-110 transition-transform">🏊‍♂️</div>
              <p className="text-2xl text-gray-600 dark:text-gray-400 font-semibold">실제 게임 하이라이트 영상</p>
              <p className="text-gray-600 dark:text-gray-400">역동적인 수중하키 액션</p>
            </div>
          </div>
          <div className="absolute -top-8 -left-8 w-24 h-24 bg-blue-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-cyan-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;