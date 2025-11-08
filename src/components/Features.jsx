// src/components/Features.jsx - 업데이트 버전
import React from 'react';
import { Calendar, Users, BookOpen, ShoppingBag, Plane, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="w-12 h-12" />,
      title: '클럽 찾기',
      description: '전 세계 수중하키 클럽을 찾아보세요',
      color: 'from-blue-500 to-cyan-500',
      link: '/clubs'
    },
    {
      icon: <Calendar className="w-12 h-12" />,
      title: '대회 정보',
      description: '다가오는 대회와 이벤트를 확인하세요',
      color: 'from-purple-500 to-pink-500',
      link: '/events'
    },
    {
      icon: <Plane className="w-12 h-12" />,
      title: '여행 동행',
      description: '여행지에서 함께 운동할 동료를 찾으세요',
      color: 'from-green-500 to-teal-500',
      link: '/travel'
    },
    {
      icon: <ShoppingBag className="w-12 h-12" />,
      title: '장비 샵',
      description: '수중하키 장비를 구매하세요',
      color: 'from-orange-500 to-red-500',
      link: '/shop'
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: '학습 자료',
      description: '규칙, 전략, 연습 방법을 배워보세요',
      color: 'from-indigo-500 to-purple-500',
      link: '/learning'
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: '전략 보드',
      description: '팀 전술과 전략을 공유하세요',
      color: 'from-yellow-500 to-orange-500',
      link: '/strategy'
    }
  ];

  return (
    <div className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            주요 기능
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            UWH World에서 제공하는 다양한 서비스를 만나보세요
          </p>
        </div>

        {/* 첫 4개 카드 (3열) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {features.slice(0, 4).map((feature, idx) => (
            <div
              key={idx}
              onClick={() => navigate(feature.link)}
              className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-gray-200 dark:border-gray-700 hover:scale-105 transform"
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-white`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* 학습자료, 전략보드 (2열, 넓게) */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.slice(4, 6).map((feature, idx) => (
            <div
              key={idx + 4}
              onClick={() => navigate(feature.link)}
              className="group bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-gray-200 dark:border-gray-700 hover:scale-105 transform"
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-white`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
