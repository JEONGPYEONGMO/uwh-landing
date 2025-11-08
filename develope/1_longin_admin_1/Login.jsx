// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Mail, Globe, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    gender: '',
    country: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignup) {
        // 회원가입 로직
        const result = await signup(formData.email, formData.password, {
          name: formData.name,
          gender: formData.gender,
          country: formData.country
        });

        if (result.success) {
          alert(`회원가입 완료!\n환영합니다, ${formData.name}님! 🎉`);
          // 회원가입 후 자동으로 일반 사용자 페이지로 이동
          navigate('/');
        } else {
          setError(result.error);
        }
      } else {
        // 로그인 로직
        const result = await login(formData.email, formData.password);

        if (result.success) {
          // 역할에 따라 리디렉션
          if (result.role === 'admin') {
            navigate('/admin/events');
          } else {
            navigate('/');
          }
        } else {
          setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
        }
      }
    } catch (err) {
      setError('오류가 발생했습니다. 다시 시도해주세요.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setFormData({
      email: '',
      password: '',
      name: '',
      gender: '',
      country: ''
    });
    setError('');
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-5xl">👋</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {isSignup ? '회원가입' : '로그인'}
            </h1>
            <p className="text-white/80">
              {isSignup ? 'UWH 커뮤니티에 가입하세요' : 'UWH에 오신 것을 환영합니다'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mx-8 mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* 이메일 (아이디) */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                이메일 (아이디) *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="example@email.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* 비밀번호 */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                비밀번호 *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* 회원가입 추가 필드 */}
            {isSignup && (
              <>
                {/* 이름 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    이름 *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required={isSignup}
                      placeholder="홍길동"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* 성별 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    성별 *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required={isSignup}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                    >
                      <option value="">성별을 선택하세요</option>
                      <option value="male">남성</option>
                      <option value="female">여성</option>
                      <option value="other">기타</option>
                    </select>
                  </div>
                </div>

                {/* 국가 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    국가 *
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required={isSignup}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                    >
                      <option value="">국가를 선택하세요</option>
                      <option value="KR">🇰🇷 대한민국</option>
                      <option value="US">🇺🇸 미국</option>
                      <option value="JP">🇯🇵 일본</option>
                      <option value="CN">🇨🇳 중국</option>
                      <option value="GB">🇬🇧 영국</option>
                      <option value="FR">🇫🇷 프랑스</option>
                      <option value="DE">🇩🇪 독일</option>
                      <option value="CA">🇨🇦 캐나다</option>
                      <option value="AU">🇦🇺 호주</option>
                      <option value="NZ">🇳🇿 뉴질랜드</option>
                      <option value="SG">🇸🇬 싱가포르</option>
                      <option value="TH">🇹🇭 태국</option>
                      <option value="VN">🇻🇳 베트남</option>
                      <option value="PH">🇵🇭 필리핀</option>
                      <option value="MY">🇲🇾 말레이시아</option>
                      <option value="OTHER">🌍 기타</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '처리 중...' : (isSignup ? '가입하기' : '로그인')}
            </button>

            {/* 추가 옵션 */}
            {!isSignup && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-600 dark:text-gray-400">로그인 상태 유지</span>
                </label>
                <a href="#" className="text-blue-500 hover:text-blue-600 font-semibold">
                  비밀번호 찾기
                </a>
              </div>
            )}

            {/* 모드 전환 */}
            <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400">
                {isSignup ? '이미 계정이 있으신가요?' : '계정이 없으신가요?'}
              </p>
              <button
                type="button"
                onClick={toggleMode}
                className="mt-2 text-blue-500 hover:text-blue-600 font-bold text-lg"
              >
                {isSignup ? '로그인하기 →' : '회원가입하기 →'}
              </button>
            </div>
          </form>

          {/* 소셜 로그인 */}
          <div className="px-8 pb-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                  또는
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button className="flex items-center justify-center px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                <span className="text-2xl">G</span>
              </button>
              <button className="flex items-center justify-center px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                <span className="text-2xl">K</span>
              </button>
              <button className="flex items-center justify-center px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                <span className="text-2xl">N</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          가입하시면 UWH의 <a href="#" className="text-blue-500 hover:underline">이용약관</a> 및{' '}
          <a href="#" className="text-blue-500 hover:underline">개인정보처리방침</a>에 동의하는 것으로 간주됩니다.
        </p>
      </div>
    </div>
  );
};

export default Login;
