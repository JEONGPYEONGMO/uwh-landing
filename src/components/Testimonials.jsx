// src/components/Testimonials.jsx
import React from 'react';
import { MapPin, Calendar } from 'lucide-react';

const Testimonials = () => {
  const travelers = [
    {
      name: '김수영',
      region: '제주도',
      date: '2025-11-15 ~ 2025-11-20',
      message: '제주도에서 수중하키 같이 하실 분 찾습니다! 초보도 환영합니다 😊',
      color: '#3B82F6'
    },
    {
      name: '이서연',
      region: '부산',
      date: '2025-11-25 ~ 2025-11-28',
      message: '부산 출장 가는데 저녁시간에 운동하고 싶어요! 해운대 근처면 좋겠습니다.',
      color: '#10B981'
    },
    {
      name: '박준혁',
      region: '서울',
      date: '2025-12-01 ~ 2025-12-05',
      message: '서울에서 주말에 같이 운동하실 분 구합니다. 중급 이상이면 좋겠어요!',
      color: '#F59E0B'
    }
  ];

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            UWH 여행자
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            여행지에서 함께 운동할 동료를 찾아보세요
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {travelers.map((traveler, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all border-t-4 overflow-hidden"
              style={{ borderTopColor: traveler.color }}
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: traveler.color }}
                  >
                    {traveler.name[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {traveler.name}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-900 dark:text-white font-semibold">
                      {traveler.region}
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Calendar className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {traveler.date}
                    </span>
                  </div>

                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {traveler.message}
                    </p>
                  </div>
                </div>

                <a 
                  href="/travel"
                  className="block w-full text-center py-2 px-4 rounded-lg font-semibold transition-all"
                  style={{ 
                    backgroundColor: traveler.color,
                    color: 'white'
                  }}
                >
                  자세히 보기
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/travel"
            className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
          >
            더 많은 여행자 보기 →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
