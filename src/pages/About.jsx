// src/pages/About.jsx
import React from 'react';
import { Target, Users, Heart, Zap } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: '우리의 미션',
      description: '전 세계 수중하키 커뮤니티를 하나로 연결하여 스포츠의 성장과 발전을 돕습니다.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: '커뮤니티 중심',
      description: '플레이어, 코치, 팬 모두가 함께 성장할 수 있는 포용적인 환경을 만듭니다.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: '열정',
      description: '수중하키에 대한 사랑과 열정을 공유하며 스포츠의 매력을 널리 알립니다.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: '혁신',
      description: '최신 기술을 활용하여 더 나은 플레이어 경험을 제공합니다.'
    }
  ];

  const team = [
    { name: 'Alex 정', role: 'CEO & Founder', avatar: '👨‍💼', description: '10년 수중하키 경력' },
    { name: 'Alex 정', role: 'CTO', avatar: '👩‍💻', description: '풀스택 개발자' },
    { name: 'Alex 정', role: '커뮤니티 매니저', avatar: '👨‍🎓', description: '국제심판 및 국제대회 출전 선수 출신' },
    { name: 'Alex 정', role: '디자이너', avatar: '👩‍🎨', description: 'UI/UX 전문가' }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">우리에 대해</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            UWH World는 전 세계 수중하키 커뮤니티를 연결하는 플랫폼입니다.
            2025년에 시작하여 빠르게 성장하고 있습니다.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                우리의 이야기
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                수중하키는 전 세계적으로 사랑받는 스포츠지만, 정보를 찾고 커뮤니티에 참여하기가 쉽지 않았습니다.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                UWH World는 이런 문제를 해결하기 위해 탄생했습니다. 클럽 찾기, 대회 정보, 학습 자료까지 
                한 곳에서 모든 것을 제공하는 플랫폼을 만들고자 했습니다.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                현재 45개국 15,000명 이상의 플레이어가 UWH World를 통해 연결되고 있으며, 
                매일 더 많은 사람들이 수중하키의 매력을 발견하고 있습니다.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl aspect-square flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <div className="text-center p-8">
                <div className="text-9xl mb-4">🏒</div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">Since 2025</p>
                <p className="text-gray-600 dark:text-gray-400">전 세계를 연결하다</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              우리의 가치
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              UWH World를 만들어가는 핵심 원칙들입니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 text-white">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              우리 팀
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              UnderWater hockey를 사랑하는 사람들이 모여 만들어갑니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center border border-gray-200 dark:border-gray-700"
              >
                <div className="text-7xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-500 font-semibold mb-2">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-500 to-cyan-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            함께 만들어가요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            UWH World는 커뮤니티와 함께 성장합니다. 여러분의 의견을 기다립니다!
          </p>
          <a href="/contact" className="inline-block bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105">
            문의하기
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;