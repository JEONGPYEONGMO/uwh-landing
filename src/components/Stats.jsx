// src/components/Stats.jsx
import React from 'react';

const Stats = () => {
  const stats = [
    { number: '2,400+', label: '활성 플레이어', icon: '🏊' },
    { number: '180+', label: '등록 클럽', icon: '🏟️' },
    { number: '50+', label: '연간 대회', icon: '🏆' },
    { number: '45+', label: '참여 국가', icon: '🌍' }
  ];

  return (
    <div className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-center transform hover:scale-105 transition-all cursor-pointer"
            >
              <div className="text-5xl mb-3">{stat.icon}</div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;