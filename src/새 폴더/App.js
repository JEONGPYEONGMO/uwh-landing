// src/App.js - 업데이트 버전
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:bg-gray-900 transition-all duration-300">
          <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
          
          <Routes>
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
            <Route path="/learning" element={<Learning />} />
            <Route path="/admin/events" element={<AdminEventForm />} />
            <Route path="/club-event-form" element={<ClubEventForm />} />
            <Route path="/shop-admin" element={<ShopAdmin />} />
            <Route path="/learning-admin" element={<LearningAdmin />} />
          </Routes>
          
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
