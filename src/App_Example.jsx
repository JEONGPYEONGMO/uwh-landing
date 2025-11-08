// src/App.jsx - ShopAdmin 라우트 추가 예시
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ShopAdmin from './pages/ShopAdmin';  // 🆕 추가
import Events from './pages/Events';
import Clubs from './pages/Clubs';
import Travel from './pages/Travel';
import Team from './pages/Team';

// Components
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop-admin" element={<ShopAdmin />} />  {/* 🆕 추가 */}
          <Route path="/events" element={<Events />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
