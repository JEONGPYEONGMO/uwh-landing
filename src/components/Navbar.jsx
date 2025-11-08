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
            <Link to="/ShopAdminn">샵 관리</Link>            
            {/* 관리자 메뉴 (개발용 - 나중에 권한 체크 추가) */}
            <Link to="/ShopAdmin" className="hover:text-purple-500">🛠️</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;