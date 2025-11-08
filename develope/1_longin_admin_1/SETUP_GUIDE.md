# Firebase 인증 및 권한별 라우팅 구현 가이드

## 📦 설치 방법

### 1. 필요한 패키지 설치
```bash
npm install firebase react-router-dom
```

## 📁 파일 구조

```
src/
├── contexts/
│   └── AuthContext.jsx          # 인증 컨텍스트
├── components/
│   ├── Navigation.jsx           # 네비게이션 (수정 필요)
│   └── ProtectedRoute.jsx       # 라우트 보호
├── pages/
│   ├── Login.jsx                # 로그인 페이지 (수정됨)
│   ├── Home.jsx                 # 홈 (공개)
│   ├── AdminEventForm.jsx       # 관리자 전용
│   ├── ShopAdmin.jsx            # 관리자 전용
│   └── LearningAdmin.jsx        # 관리자 전용
├── firebase/
│   └── config.js                # Firebase 설정
└── App.js                       # 메인 앱 (수정됨)
```

## 🚀 구현 단계

### 1단계: contexts 폴더 생성 및 AuthContext.jsx 추가
- `src/contexts/AuthContext.jsx` 파일 생성
- 제공된 AuthContext 코드 복사

### 2단계: ProtectedRoute 컴포넌트 추가
- `src/components/ProtectedRoute.jsx` 파일 생성
- 제공된 ProtectedRoute 코드 복사

### 3단계: Login.jsx 수정
- 기존 `src/pages/Login.jsx` 파일을 제공된 코드로 교체

### 4단계: App.js 수정
- 기존 `src/App.js` 파일을 제공된 코드로 교체

### 5단계: Navigation 컴포넌트 수정
- `src/components/Navigation.jsx`에 로그아웃 기능 추가
- Navigation_Example.jsx 참고

### 6단계: Firestore 보안 규칙 설정
1. Firebase Console 접속 (https://console.firebase.google.com/)
2. 프로젝트 선택 (uwh-world)
3. Firestore Database > 규칙 탭
4. 제공된 firestore.rules 코드로 교체
5. "게시" 버튼 클릭

## 🔑 테스트용 관리자 계정 생성

Firebase Console에서 직접 관리자 계정을 만들어야 합니다:

### 방법 1: Firestore에서 직접 생성
1. Firebase Console > Firestore Database
2. "users" 컬렉션 선택 (없으면 생성)
3. 문서 추가:
   ```
   문서 ID: [사용자 UID]
   필드:
   - email: "admin@uwh.com"
   - name: "관리자"
   - role: "admin"  ← 중요!
   - createdAt: [현재 타임스탬프]
   ```

### 방법 2: 코드로 생성 (임시)
```javascript
// 임시로 관리자 생성하는 함수 (개발용)
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase/config';

const createAdmin = async (userId) => {
  await setDoc(doc(db, 'users', userId), {
    email: 'admin@uwh.com',
    role: 'admin',
    name: '관리자',
    createdAt: new Date()
  });
};
```

## 📝 사용 방법

### 일반 사용자 회원가입/로그인
1. `/login` 페이지 접속
2. "회원가입하기" 클릭
3. 정보 입력 후 가입
4. 로그인하면 자동으로 홈(`/`)으로 이동

### 관리자 로그인
1. Firestore에서 role이 'admin'인 계정으로 로그인
2. 자동으로 관리자 페이지(`/admin/events`)로 이동
3. Navigation에 관리자 전용 메뉴 표시

### 페이지 접근 권한
- **공개 페이지**: 로그인 없이 접근 가능
  - Home, Clubs, Events, About, Travel, Shop, Team, Strategy, Contact
  
- **로그인 필요**: 일반 사용자 이상
  - Learning, Club Event Form
  
- **관리자 전용**: admin 역할만 접근 가능
  - Admin Event Form (`/admin/events`)
  - Shop Admin (`/shop-admin`)
  - Learning Admin (`/learning-admin`)

## 🔒 보안 기능

1. **라우트 보호**: 권한 없는 사용자의 페이지 접근 차단
2. **자동 리디렉션**: 권한에 따라 적절한 페이지로 이동
3. **Firestore 규칙**: 데이터베이스 레벨에서 권한 검증
4. **역할 기반 접근 제어**: admin/user 역할 구분

## 🎯 주요 기능

### AuthContext에서 제공하는 함수
```javascript
const { 
  currentUser,      // 현재 로그인한 사용자
  userRole,         // 사용자 역할 ('admin' 또는 'user')
  loading,          // 로딩 상태
  login,            // 로그인 함수
  signup,           // 회원가입 함수
  logout            // 로그아웃 함수
} = useAuth();
```

### 컴포넌트에서 사용 예시
```javascript
import { useAuth } from '../contexts/AuthContext';

const MyComponent = () => {
  const { currentUser, userRole } = useAuth();
  
  return (
    <div>
      {currentUser && <p>환영합니다, {currentUser.email}님!</p>}
      {userRole === 'admin' && <p>관리자 권한이 있습니다.</p>}
    </div>
  );
};
```

## 🐛 문제 해결

### 로그인 후 리디렉션이 안 되는 경우
- AuthContext가 App.js에서 제대로 감싸져 있는지 확인
- Firebase config가 올바르게 설정되어 있는지 확인

### 관리자 페이지 접근이 안 되는 경우
- Firestore의 users 컬렉션에서 해당 사용자의 role이 'admin'인지 확인
- 브라우저 콘솔에서 에러 메시지 확인

### "권한이 거부되었습니다" 에러
- Firestore 보안 규칙이 제대로 설정되어 있는지 확인
- Firebase Console > Firestore > 규칙 탭에서 규칙 확인

## 📞 추가 도움이 필요하신가요?

구현 중 문제가 발생하면 다음 정보를 확인해주세요:
1. 브라우저 개발자 도구 콘솔의 에러 메시지
2. Firebase Console의 Authentication 탭에서 사용자가 제대로 생성되었는지
3. Firestore Database 탭에서 users 컬렉션의 데이터 구조
