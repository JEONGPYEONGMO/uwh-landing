# 🚀 ShopAdmin.jsx 실행 가이드

## 📋 단계별 설치 방법

### Step 1: ShopAdmin.jsx 파일 생성

#### 위치
```
src/
  pages/
    ShopAdmin.jsx  ← 여기에 생성
```

#### 방법
1. `src/pages` 폴더로 이동
2. 새 파일 `ShopAdmin.jsx` 생성
3. SHOP_MANAGEMENT_GUIDE.md의 전체 ShopAdmin 코드 복사/붙여넣기

---

### Step 2: shopStorage.js 유틸리티 파일 생성

#### 위치
```
src/
  utils/
    shopStorage.js  ← 여기에 생성
```

#### 방법
1. `src/utils` 폴더가 없으면 생성
2. 새 파일 `shopStorage.js` 생성
3. SHOP_MANAGEMENT_GUIDE.md의 shopStorage.js 코드 복사/붙여넣기

---

### Step 3: 라우터 설정

#### App.jsx 또는 Router 파일 수정

```javascript
// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 기존 imports
import Home from './pages/Home';
import Shop from './pages/Shop';
// ... 기타 페이지들

// 🆕 ShopAdmin import 추가
import ShopAdmin from './pages/ShopAdmin';

function App() {
  return (
    <Router>
      <Routes>
        {/* 기존 라우트들 */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        
        {/* 🆕 ShopAdmin 라우트 추가 */}
        <Route path="/shop-admin" element={<ShopAdmin />} />
        
        {/* 기타 라우트들 */}
      </Routes>
    </Router>
  );
}

export default App;
```

---

### Step 4: 네비게이션에 링크 추가 (선택사항)

#### Navbar.jsx 수정

```javascript
// Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      {/* 기존 메뉴들 */}
      <Link to="/">홈</Link>
      <Link to="/shop">샵</Link>
      
      {/* 🆕 관리자 링크 추가 (개발용) */}
      <Link to="/shop-admin">샵 관리</Link>
      
      {/* 기타 메뉴들 */}
    </nav>
  );
};
```

---

### Step 5: 실행

#### 방법 1: 직접 URL 입력
```
브라우저 주소창에 입력:
http://localhost:3000/shop-admin
```

#### 방법 2: 네비게이션 클릭
```
네비게이션 바에서 "샵 관리" 클릭
```

#### 방법 3: Shop 페이지에서 링크 추가

```javascript
// Shop.jsx에 관리자 링크 버튼 추가
import { Link } from 'react-router-dom';

// Hero 섹션 내부에 추가
<div className="bg-gradient-to-r from-blue-500 to-cyan-500 py-20">
  <div className="max-w-7xl mx-auto px-4 text-center text-white">
    <h1 className="text-5xl font-bold mb-6">샵</h1>
    <p className="text-xl mb-6">수중하키 장비를 구매하세요</p>
    
    {/* 🆕 관리자 페이지 링크 */}
    <Link 
      to="/shop-admin"
      className="inline-block bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold transition-all"
    >
      🛠️ 관리자 페이지
    </Link>
  </div>
</div>
```

---

## 🎯 완전한 예제 코드

### 1. App.jsx (전체)

```javascript
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Shop from './pages/Shop';
import ShopAdmin from './pages/ShopAdmin';  // 추가
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
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop-admin" element={<ShopAdmin />} />  {/* 추가 */}
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
```

### 2. Navbar.jsx에 링크 추가 (선택)

```javascript
// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">UWH Asia</Link>
          
          <div className="flex gap-6">
            <Link to="/" className="hover:text-blue-500">홈</Link>
            <Link to="/about" className="hover:text-blue-500">소개</Link>
            <Link to="/shop" className="hover:text-blue-500">샵</Link>
            <Link to="/events" className="hover:text-blue-500">일정</Link>
            <Link to="/clubs" className="hover:text-blue-500">클럽</Link>
            <Link to="/travel" className="hover:text-blue-500">여행</Link>
            <Link to="/team" className="hover:text-blue-500">팀빌딩</Link>
            
            {/* 관리자 메뉴 (개발용 - 나중에 권한 체크 추가) */}
            <Link to="/shop-admin" className="hover:text-purple-500">🛠️</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
```

---

## 🔧 문제 해결

### 문제 1: "ShopAdmin is not defined"

**원인**: import를 안했거나 파일 경로가 틀림

**해결**:
```javascript
// App.jsx 상단에 추가
import ShopAdmin from './pages/ShopAdmin';
```

---

### 문제 2: "Cannot find module './utils/shopStorage'"

**원인**: shopStorage.js 파일이 없거나 경로가 틀림

**해결**:
1. `src/utils/shopStorage.js` 파일 생성 확인
2. ShopAdmin.jsx의 import 경로 확인
```javascript
// ShopAdmin.jsx 상단
import * as shopStorage from '../utils/shopStorage';
```

---

### 문제 3: 404 Not Found

**원인**: 라우터 설정이 안됨

**해결**:
```javascript
// App.jsx에서 Route 추가 확인
<Route path="/shop-admin" element={<ShopAdmin />} />
```

---

### 문제 4: 빈 페이지만 표시됨

**원인**: ShopAdmin 컴포넌트 코드 오류

**해결**:
1. 브라우저 개발자 도구 (F12) 열기
2. Console 탭에서 에러 메시지 확인
3. 에러 메시지 기반으로 수정

---

## ✅ 설치 확인 체크리스트

- [ ] `src/pages/ShopAdmin.jsx` 파일 생성
- [ ] `src/utils/shopStorage.js` 파일 생성
- [ ] `App.jsx`에 import 추가
- [ ] `App.jsx`에 Route 추가
- [ ] 브라우저에서 `/shop-admin` 접속 테스트
- [ ] 통계가 표시되는지 확인
- [ ] "상품 추가" 버튼이 보이는지 확인

---

## 🎨 빠른 테스트 방법

### 콘솔에서 직접 테스트

```javascript
// 브라우저 개발자 도구 Console에서

// 1. shopStorage 함수가 작동하는지 확인
localStorage.setItem('shopProducts', JSON.stringify([
  {
    id: 999,
    name: '테스트 상품',
    category: '장갑',
    sellerId: 1,
    price: '10,000원',
    image: '🧪',
    rating: 5.0,
    reviews: 1,
    description: '테스트용 상품입니다',
    features: ['테스트1', '테스트2'],
    inStock: true
  }
]));

// 2. /shop-admin 페이지로 이동
window.location.href = '/shop-admin';

// 3. 통계에 "전체 상품: 1" 이 표시되면 성공!
```

---

## 📱 사용 시나리오

### 시나리오 1: 새 상품 추가

```
1. http://localhost:3000/shop-admin 접속
2. "상품 추가" 버튼 클릭
3. 폼 작성:
   - 상품명: 초경량 고글
   - 카테고리: 마스크
   - 판매자 ID: 1
   - 가격: 42,000원
   - 이모지: 👓
   - 설명: 초경량 디자인
   - 특징: 경량, 넓은 시야각, UV 차단
4. "추가하기" 클릭
5. 성공 메시지 확인
6. /shop 페이지에서 새 상품 확인
```

### 시나리오 2: 상품 삭제

```
1. /shop-admin의 상품 목록에서
2. 삭제할 상품 찾기
3. 휴지통 아이콘 클릭
4. 확인 대화상자에서 "확인"
5. 삭제 완료
```

### 시나리오 3: 데이터 확인

```
1. /shop-admin 접속
2. 통계 카드 확인:
   - 전체 상품
   - 재고 있음
   - 판매자 수
   - 평균 평점
3. 상품 목록 스크롤
4. 판매자 목록 확인
```

---

## 🔐 보안 고려사항 (향후 추가)

현재는 누구나 접근 가능하므로, 실제 프로덕션에서는:

```javascript
// 1. 로그인 체크
const [isAdmin, setIsAdmin] = useState(false);

useEffect(() => {
  // 관리자 권한 확인
  const adminStatus = checkAdminStatus();
  if (!adminStatus) {
    navigate('/'); // 홈으로 리다이렉트
  }
}, []);

// 2. 비밀번호 보호
if (!isAdmin) {
  return <AdminLogin onSuccess={() => setIsAdmin(true)} />;
}
```

---

## 🎉 완료!

이제 ShopAdmin을 사용할 수 있습니다!

**접속 URL**: `http://localhost:3000/shop-admin`

추가 질문이 있으시면 언제든 물어보세요! 🚀
