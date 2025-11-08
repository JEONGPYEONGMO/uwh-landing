// src/pages/Shop.jsx - 완전한 버전 (판매자 시스템 + 새 카테고리 + 인증 + 로컬 스토리지)
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Store, CheckCircle, X, Phone, Mail, TrendingUp, Package } from 'lucide-react';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedSeller, setSelectedSeller] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [userProducts, setUserProducts] = useState([]);
  const [userSellers, setUserSellers] = useState([]);

  // 로컬 스토리지에서 데이터 불러오기
  useEffect(() => {
    const loadStoredData = () => {
      try {
        const savedProducts = localStorage.getItem('shopProducts');
        const savedSellers = localStorage.getItem('shopSellers');
        
        if (savedProducts) {
          setUserProducts(JSON.parse(savedProducts));
        }
        
        if (savedSellers) {
          setUserSellers(JSON.parse(savedSellers));
        }
      } catch (error) {
        console.error('Failed to load shop data:', error);
      }
    };
    
    loadStoredData();
  }, []);

  // 기본 판매자 데이터 (4개의 인증된 판매자)
  const defaultSellers = [
    {
      id: 1,
      name: 'AquaTech Korea',
      avatar: '🏪',
      rating: 4.8,
      totalSales: 1250,
      verified: true,
      description: '프리미엄 수중하키 장비 전문',
      phone: '02-1234-5678',
      email: 'info@aquatech.kr'
    },
    {
      id: 2,
      name: 'Ocean Sports',
      avatar: '🌊',
      rating: 4.6,
      totalSales: 890,
      verified: true,
      description: '수입 브랜드 정식 딜러',
      phone: '031-234-5678',
      email: 'sales@oceansports.com'
    },
    {
      id: 3,
      name: '서울 마린스 클럽샵',
      avatar: '⚡',
      rating: 4.9,
      totalSales: 650,
      verified: true,
      description: '클럽 공식 굿즈 & 장비',
      phone: '02-345-6789',
      email: 'shop@marines.kr'
    },
    {
      id: 4,
      name: 'UWH Gear Master',
      avatar: '🎯',
      rating: 4.7,
      totalSales: 1100,
      verified: true,
      description: '커스텀 장비 제작 전문',
      phone: '031-456-7890',
      email: 'master@uwhgear.com'
    }
  ];

  // 기본 + 사용자 추가 판매자 통합
  const sellers = [...defaultSellers, ...userSellers];

  const categories = ['전체', '장갑', '스노클', '마스크', '마우스가드', '의류', '핀', '기타'];

  // 기본 상품 데이터
  const defaultProducts = [
    // AquaTech Korea 상품
    { id: 1, name: 'Pro 수중하키 장갑', category: '장갑', sellerId: 1, price: '45,000원', image: '🧤', rating: 4.8, reviews: 124, description: '프로 선수용 고급 장갑. 내구성이 뛰어나고 그립감이 우수합니다.', features: ['고급 실리콘 패드', '통풍 메쉬', '손목 보호대'], inStock: true },
    { id: 2, name: 'Elite 스노클', category: '스노클', sellerId: 1, price: '35,000원', image: '🤿', rating: 4.7, reviews: 89, description: '수중하키 전용 스노클. 물이 들어가지 않는 밸브 시스템', features: ['실리콘 마우스피스', '조절 가능한 스트랩', '밸브 시스템'], inStock: true },
    { id: 3, name: 'Competition 마스크', category: '마스크', sellerId: 1, price: '55,000원', image: '🥽', rating: 4.9, reviews: 156, description: '넓은 시야각을 제공하는 전문가용 마스크', features: ['강화 렌즈', '김서림 방지', '조절 가능한 스트랩'], inStock: true },
    
    // Ocean Sports 상품
    { id: 4, name: '프리미엄 마우스가드', category: '마우스가드', sellerId: 2, price: '25,000원', image: '🦷', rating: 4.6, reviews: 67, description: '치아 보호를 위한 맞춤형 마우스가드', features: ['맞춤 제작', '충격 흡수', '편안한 착용감'], inStock: true },
    { id: 5, name: 'Pro 팀 유니폼', category: '의류', sellerId: 2, price: '65,000원', image: '👕', rating: 4.5, reviews: 203, description: '팀 로고 인쇄 가능한 프로 유니폼', features: ['속건성 원단', '로고 인쇄 가능', '다양한 사이즈'], inStock: true },
    { id: 6, name: '수중하키 핀', category: '핀', sellerId: 2, price: '85,000원', image: '🦶', rating: 4.8, reviews: 92, description: '강력한 추진력의 전문가용 핀', features: ['경량 디자인', '조절 가능한 스트랩', '내구성 강화'], inStock: false },
    
    // 서울 마린스 클럽샵 상품
    { id: 7, name: '마린스 팀 져지', category: '의류', sellerId: 3, price: '68,000원', image: '👔', rating: 5.0, reviews: 45, description: '서울 마린스 공식 져지', features: ['정품 인증', '팀 로고', '커스텀 이름 가능'], inStock: true },
    { id: 8, name: '응원 타올', category: '기타', sellerId: 3, price: '18,000원', image: '🧣', rating: 4.9, reviews: 78, description: '흡수력 좋은 마이크로파이버', features: ['40x100cm', '마이크로파이버', '팀 로고'], inStock: true },
    { id: 9, name: '스티커 팩', category: '기타', sellerId: 3, price: '8,000원', image: '🎨', rating: 4.7, reviews: 134, description: '방수 스티커 10종 세트', features: ['10종 구성', '방수 코팅', '다양한 디자인'], inStock: true },
    
    // UWH Gear Master 상품
    { id: 10, name: '커스텀 프로텍터', category: '기타', sellerId: 4, price: '95,000원', image: '🛡️', rating: 4.9, reviews: 56, description: '무릎/팔꿈치 보호대 세트', features: ['맞춤 제작 가능', '고밀도 패드', '통풍 메쉬'], inStock: true },
    { id: 11, name: '트레이닝 퍽 세트', category: '기타', sellerId: 4, price: '35,000원', image: '⚫', rating: 4.6, reviews: 89, description: '연습용 퍽 6개 세트', features: ['6개 구성', '표준 무게', '내구성 우수'], inStock: true },
    { id: 12, name: '코치용 전술보드', category: '기타', sellerId: 4, price: '48,000원', image: '📋', rating: 4.8, reviews: 34, description: '방수 전술보드 + 마커 세트', features: ['방수 코팅', '마커 포함', '휴대용'], inStock: true }
  ];

  // 기본 + 사용자 추가 상품 통합
  const products = [...defaultProducts, ...userProducts];

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === '전체' || p.category === selectedCategory;
    const matchesSeller = selectedSeller === 'all' || p.sellerId === parseInt(selectedSeller);
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSeller && matchesSearch;
  });

  const getSeller = (sellerId) => sellers.find(s => s.id === sellerId);

  const openDetailModal = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  const openContactModal = (product) => {
    setSelectedProduct(product);
    setShowContactModal(true);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-6">샵</h1>
          <p className="text-xl mb-6">수중하키 장비를 구매하세요</p>
          
          {/* 관리자 페이지 링크 */}
          <Link 
            to="/shop-admin"
            className="inline-block bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold transition-all"
          >
            🛠️ 관리자 페이지
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* 판매자 섹션 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
            <Store className="w-6 h-6 text-blue-500" />
            인증된 판매자
          </h2>
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {sellers.map(seller => (
              <div
                key={seller.id}
                onClick={() => setSelectedSeller(selectedSeller === seller.id.toString() ? 'all' : seller.id.toString())}
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 cursor-pointer transition-all border-2 ${
                  selectedSeller === seller.id.toString()
                    ? 'border-blue-500 shadow-lg'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-5xl mb-3">{seller.avatar}</div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 dark:text-white">{seller.name}</h3>
                    {seller.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
                  </div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{seller.rating}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-600 dark:text-gray-400 mb-2">
                    <Package className="w-3 h-3" />
                    <span>{seller.totalSales.toLocaleString()}건 판매</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{seller.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedSeller('all')}
              className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                selectedSeller === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              모든 판매자
            </button>
            <button
              onClick={() => setShowSellerModal(true)}
              className="px-6 py-2 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all"
            >
              판매자 신청
            </button>
          </div>
        </div>

        {/* 필터 섹션 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* 검색바 */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="상품 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 카테고리 필터 */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 필터 결과 */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>총 {filteredProducts.length}개의 상품</span>
            {(searchTerm || selectedCategory !== '전체' || selectedSeller !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('전체');
                  setSelectedSeller('all');
                }}
                className="text-blue-500 hover:underline"
              >
                필터 초기화
              </button>
            )}
          </div>
        </div>

        {/* 상품 그리드 */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredProducts.map(product => {
            const seller = getSeller(product.sellerId);
            return (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
                onClick={() => openDetailModal(product)}
              >
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 p-8 flex items-center justify-center">
                  <div className="text-8xl">{product.image}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                    {!product.inStock && (
                      <span className="text-xs bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-2 py-1 rounded-full">
                        품절
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gray-600 dark:text-gray-400">{seller?.avatar} {seller?.name}</span>
                    {seller?.verified && <CheckCircle className="w-3 h-3 text-green-500" />}
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">({product.reviews})</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-500 mb-4">{product.price}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openContactModal(product);
                    }}
                    className="w-full bg-blue-500 text-white py-2 rounded-xl font-semibold hover:bg-blue-600 transition-all"
                  >
                    문의하기
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 상품이 없을 때 */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">상품을 찾을 수 없습니다</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">다른 검색어나 필터를 시도해보세요</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('전체');
                setSelectedSeller('all');
              }}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all"
            >
              필터 초기화
            </button>
          </div>
        )}
      </div>

      {/* 상세 모달 */}
      {showDetailModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-cyan-500 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">상품 상세</h2>
              <button onClick={() => setShowDetailModal(false)} className="text-white hover:bg-white/20 p-2 rounded-lg transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8">
              <div className="text-8xl text-center mb-6">{selectedProduct.image}</div>
              <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{selectedProduct.name}</h3>
              
              {(() => {
                const seller = getSeller(selectedProduct.sellerId);
                return (
                  <div className="flex items-center gap-2 mb-4">
                    <p className="text-gray-600 dark:text-gray-400">{seller.avatar} {seller.name}</p>
                    {seller.verified && (
                      <span className="flex items-center gap-1 text-sm bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 px-3 py-1 rounded-full">
                        <CheckCircle className="w-4 h-4" />
                        인증 판매자
                      </span>
                    )}
                  </div>
                );
              })()}

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900 dark:text-white">{selectedProduct.rating}</span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">({selectedProduct.reviews} 리뷰)</span>
              </div>

              <p className="text-xl text-blue-500 font-bold mb-6">{selectedProduct.price}</p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">제품 설명</h4>
                  <p className="text-gray-600 dark:text-gray-400">{selectedProduct.description}</p>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">주요 특징</h4>
                  <ul className="space-y-2">
                    {selectedProduct.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                        <span className="text-blue-500">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => { setShowDetailModal(false); openContactModal(selectedProduct); }}
                  className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-all"
                >
                  문의하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 문의 모달 */}
      {showContactModal && selectedProduct && (() => {
        const seller = getSeller(selectedProduct.sellerId);
        return (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowContactModal(false)}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-8" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">판매자 연락처</h2>
                <button onClick={() => setShowContactModal(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-blue-500 mb-2">
                    <Store className="w-5 h-5" />
                    <span className="font-semibold">판매자</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{seller.name}</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-blue-500 mb-2">
                    <Phone className="w-5 h-5" />
                    <span className="font-semibold">전화번호</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{seller.phone}</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-green-500 mb-2">
                    <Mail className="w-5 h-5" />
                    <span className="font-semibold">이메일</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white break-all">{seller.email}</p>
                </div>

                <div className="pt-4">
                  <a
                    href={`mailto:${seller.email}`}
                    className="block w-full text-center bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-all"
                  >
                    이메일 보내기
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 판매자 신청 모달 */}
      {showSellerModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowSellerModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">판매자 신청</h2>
              <button onClick={() => setShowSellerModal(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert('판매자 신청이 관리자에게 전송되었습니다!');
                setShowSellerModal(false);
              }}
            >
              <div>
                <label className="block font-semibold mb-2 text-gray-900 dark:text-white">상호명 *</label>
                <input type="text" required className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white" placeholder="예: UWH Gear Korea" />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-gray-900 dark:text-white">담당자 이름 *</label>
                <input type="text" required className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white" placeholder="홍길동" />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-gray-900 dark:text-white">전화번호 *</label>
                <input type="tel" required className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white" placeholder="02-1234-5678" />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-gray-900 dark:text-white">이메일 *</label>
                <input type="email" required className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white" placeholder="seller@example.com" />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-gray-900 dark:text-white">사업자등록번호</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white" placeholder="123-45-67890" />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-gray-900 dark:text-white">판매 예정 상품</label>
                <textarea className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white" rows="3" placeholder="판매하고자 하는 상품을 간단히 설명해주세요"></textarea>
              </div>
              <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-all">
                신청하기
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
