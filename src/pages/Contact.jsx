// src/pages/Contact.jsx
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('메시지가 전송되었습니다! (데모 버전)');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: '이메일',
      content: 'contact@uwh.com',
      description: '24시간 이내 답변'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: '전화',
      content: '+82 2-1234-5678',
      description: '평일 09:00 - 18:00'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: '주소',
      content: '서울시 강남구 테헤란로',
      description: 'UWH World본사'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: '카카오톡',
      content: '@uwh_official',
      description: '실시간 상담'
    }
  ];

  const faqs = [
    {
      question: '수중하키를 처음 시작하려면 어떻게 해야 하나요?',
      answer: '가까운 클럽을 찾아서 체험 프로그램에 참여해보세요. 한국에서는 카카오톡 오픈채팅에서 "꼴뚜기수중하키"를 검색하세요. 대부분의 클럽에서 초보자를 위한 장비와 교육을 제공합니다.'
    },
    {
      question: '회원가입 비용이 있나요?',
      answer: 'UWH World플랫폼 이용은 완전 무료입니다. 다만 클럽 활동이나 대회 참가는 별도 비용이 있을 수 있습니다.'
    },
    {
      question: '대회 등록은 어떻게 하나요?',
      answer: '대회 페이지에서 원하는 대회를 선택하고 "공식 웹사이트" 버튼을 클릭하시고 해당 페이지에서 신청하시면 됩니다.'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">문의하기</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            궁금한 점이 있으신가요? 언제든지 연락주세요!
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((info, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 text-center"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                  {info.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {info.title}
                </h3>
                <p className="text-blue-500 font-semibold mb-1">{info.content}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{info.description}</p>
              </div>
            ))}
          </div>

          {/* Contact Form & Map */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                메시지 보내기
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="홍길동"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    제목 *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="문의 제목"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    메시지 *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="궁금하신 내용을 자세히 적어주세요..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  메시지 전송
                </button>
              </form>
            </div>

            {/* Map Placeholder & FAQs */}
            <div className="space-y-8">
              {/* Map */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 aspect-square flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-7xl mb-4">🗺️</div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white mb-2">위치 지도</p>
                  <p className="text-gray-600 dark:text-gray-400">서울시 강남구 테헤란로</p>
                </div>
              </div>

              {/* Quick FAQs */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  자주 묻는 질문
                </h3>
                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <details key={idx} className="group">
                      <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-blue-500 transition-colors list-none flex items-center">
                        <span className="mr-2">•</span>
                        {faq.question}
                      </summary>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 ml-4">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;