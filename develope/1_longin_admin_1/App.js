// src/App.js - 업데이트 버전
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Clubs from './pages/Clubs';
import Events from './pages/Events';
import About from './pages/About';
import Shop from './pages/Shop';
import Team from './pages/Team';
import Strategy from './pages/Strategy';
import Travel from './pages/Travel';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Learning from './pages/LearningFirebase';
import AdminEventForm from './pages/AdminEventForm';
import ClubEventForm from './pages/ClubEventForm';
import ShopAdmin from './pages/ShopAdmin';
import LearningAdmin from './pages/LearningAdminFirebase';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <div className={darkMode ? 'dark' : ''}>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:bg-gray-900 transition-all duration-300">
            <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
            
            <Routes>
              {/* 공개 페이지 */}
              <Route path="/" element={<Home />} />
              <Route path="/clubs" element={<Clubs />} />
              <Route path="/events" element={<Events />} />
              <Route path="/about" element={<About />} />
              <Route path="/travel" element={<Travel />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/team" element={<Team />} />
              <Route path="/strategy" element={<Strategy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              
              {/* 로그인 필요한 일반 사용자 페이지 */}
              <Route 
                path="/learning" 
                element={
                  <ProtectedRoute>
                    <Learning />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/club-event-form" 
                element={
                  <ProtectedRoute>
                    <ClubEventForm />
                  </ProtectedRoute>
                } 
              />
              
              {/* 관리자 전용 페이지 */}
              <Route 
                path="/admin/events" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminEventForm />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/shop-admin" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <ShopAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/learning-admin" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <LearningAdmin />
                  </ProtectedRoute>
                } 
              />

              {/* 404 페이지 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            
            <Footer />
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
