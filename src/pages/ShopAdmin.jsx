import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Package, Store, RefreshCw, Download, Upload } from 'lucide-react';

const ShopAdmin = () => {
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [showAddSellerForm, setShowAddSellerForm] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '장갑',
    sellerId: '',
    price: '',
    image: '📦',
    description: '',
    features: ''
  });

  const [newSeller, setNewSeller] = useState({
    name: '',
    avatar: '🏪',
    description: '',
    phone: '',
    email: ''
  });

  // 로컬 스토리지에서 데이터 불러오기
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const savedProducts = localStorage.getItem('shopProducts');
      const savedSellers = localStorage.getItem('shopSellers');
      
      setProducts(savedProducts ? JSON.parse(savedProducts) : []);
      setSellers(savedSellers ? JSON.parse(savedSellers) : []);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  // 상품 추가
  const handleAddProduct = (e) => {
    e.preventDefault();
    
    try {
      const productData = {
        id: Date.now(),
        ...newProduct,
        sellerId: parseInt(newProduct.sellerId),
        features: newProduct.features.split(',').map(f => f.trim()),
        rating: 0,
        reviews: 0,
        inStock: true,
        createdAt: new Date().toISOString()
      };
      
      const updatedProducts = [...products, productData];
      localStorage.setItem('shopProducts', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
      
      alert('✅ 상품이 추가되었습니다!');
      setShowAddProductForm(false);
      
      // 폼 초기화
      setNewProduct({
        name: '',
        category: '장갑',
        sellerId: '',
        price: '',
        image: '📦',
        description: '',
        features: ''
      });
    } catch (error) {
      alert('❌ 상품 추가 실패: ' + error.message);
    }
  };

  // 상품 삭제
  const handleDeleteProduct = (productId) => {
    if (window.confirm('이 상품을 삭제하시겠습니까?')) {
      try {
        const updatedProducts = products.filter(p => p.id !== productId);
        localStorage.setItem('shopProducts', JSON.stringify(updatedProducts));
        setProducts(updatedProducts);
        alert('✅ 상품이 삭제되었습니다.');
      } catch (error) {
        alert('❌ 삭제 실패: ' + error.message);
      }
    }
  };

  // 판매자 추가
  const handleAddSeller = (e) => {
    e.preventDefault();
    
    try {
      const sellerData = {
        id: Date.now(),
        ...newSeller,
        rating: 0,
        totalSales: 0,
        verified: false,
        createdAt: new Date().toISOString()
      };
      
      const updatedSellers = [...sellers, sellerData];
      localStorage.setItem('shopSellers', JSON.stringify(updatedSellers));
      setSellers(updatedSellers);
      
      alert('✅ 판매자가 추가되었습니다!');
      setShowAddSellerForm(false);
      
      setNewSeller({
        name: '',
        avatar: '🏪',
        description: '',
        phone: '',
        email: ''
      });
    } catch (error) {
      alert('❌ 판매자 추가 실패: ' + error.message);
    }
  };

  // 통계 계산
  const stats = {
    totalProducts: products.length,
    inStockProducts: products.filter(p => p.inStock).length,
    outOfStockProducts: products.filter(p => !p.inStock).length,
    totalSellers: sellers.length,
    averageRating: products.length > 0 
      ? (products.reduce((sum, p) => sum + (p.rating || 0), 0) / products.length).toFixed(1)
      : 0
  };

  // 데이터 내보내기
  const handleExport = () => {
    const data = {
      products,
      sellers,
      exportedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `shop-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <div className="text-6xl mb-6">🛠️</div>
          <h1 className="text-5xl font-bold mb-6">샵 관리자</h1>
          <p className="text-xl">상품 및 판매자 관리</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* 통계 */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-blue-500">{stats.totalProducts}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">전체 상품</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-green-500">{stats.inStockProducts}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">재고 있음</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-red-500">{stats.outOfStockProducts}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">품절</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-orange-500">{stats.totalSellers}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">판매자</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-purple-500">{stats.averageRating}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">평균 평점</div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setShowAddProductForm(true)}
            className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all"
          >
            <Plus className="w-5 h-5" />
            상품 추가
          </button>
          <button
            onClick={() => setShowAddSellerForm(true)}
            className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-all"
          >
            <Store className="w-5 h-5" />
            판매자 추가
          </button>
          <button
            onClick={loadData}
            className="flex items-center gap-2 bg-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-600 transition-all"
          >
            <RefreshCw className="w-5 h-5" />
            새로고침
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-all"
          >
            <Download className="w-5 h-5" />
            내보내기
          </button>
        </div>

        {/* 상품 목록 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            상품 목록 ({products.length})
          </h2>
          
          {products.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              등록된 상품이 없습니다. "상품 추가" 버튼을 눌러 새 상품을 추가하세요.
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-4xl">{product.image}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{product.name}</h3>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="mr-4">카테고리: {product.category}</span>
                          <span className="mr-4">가격: {product.price}</span>
                          <span className="mr-4">평점: {product.rating || 0}</span>
                          <span>리뷰: {product.reviews || 0}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          ID: {product.id} | 판매자 ID: {product.sellerId}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 판매자 목록 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            판매자 목록 ({sellers.length})
          </h2>
          
          {sellers.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              등록된 판매자가 없습니다. "판매자 추가" 버튼을 눌러 새 판매자를 추가하세요.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {sellers.map((seller) => (
                <div key={seller.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{seller.avatar}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white">{seller.name}</h3>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{seller.description}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {seller.phone} | {seller.email}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 상품 추가 모달 */}
      {showAddProductForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddProductForm(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">새 상품 추가</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block font-semibold mb-2 text-gray-900 dark:text-white">상품명 *</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="Pro 수중하키 장갑"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2 text-gray-900 dark:text-white">카테고리 *</label>
                  <select
                    required
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  >
                    <option value="장갑">장갑</option>
                    <option value="스노클">스노클</option>
                    <option value="마스크">마스크</option>
                    <option value="마우스가드">마우스가드</option>
                    <option value="의류">의류</option>
                    <option value="핀">핀</option>
                    <option value="기타">기타</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-2 text-gray-900 dark:text-white">판매자 ID *</label>
                  <input
                    type="number"
                    required
                    value={newProduct.sellerId}
                    onChange={(e) => setNewProduct({ ...newProduct, sellerId: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="1"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2 text-gray-900 dark:text-white">가격 *</label>
                  <input
                    type="text"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="45,000원"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2 text-gray-900 dark:text-white">이모지</label>
                  <input
                    type="text"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="🧤"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-900 dark:text-white">상품 설명 *</label>
                <textarea
                  required
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  rows="3"
                  placeholder="프로 선수용 고급 장갑. 내구성이 뛰어나고..."
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-900 dark:text-white">주요 특징 (쉼표로 구분)</label>
                <input
                  type="text"
                  value={newProduct.features}
                  onChange={(e) => setNewProduct({ ...newProduct, features: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="고급 실리콘 패드, 통풍 메쉬, 손목 보호대"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-all"
                >
                  추가하기
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddProductForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-400 transition-all"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 판매자 추가 모달 */}
      {showAddSellerForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddSellerForm(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-8" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">새 판매자 추가</h2>
            <form onSubmit={handleAddSeller} className="space-y-4">
              <div>
                <label className="block font-semibold mb-2 text-gray-900 dark:text-white">판매자명 *</label>
                <input
                  type="text"
                  required
                  value={newSeller.name}
                  onChange={(e) => setNewSeller({ ...newSeller, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="부산 샤크스 프로샵"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-900 dark:text-white">이모지</label>
                <input
                  type="text"
                  value={newSeller.avatar}
                  onChange={(e) => setNewSeller({ ...newSeller, avatar: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="🦈"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-900 dark:text-white">설명 *</label>
                <input
                  type="text"
                  required
                  value={newSeller.description}
                  onChange={(e) => setNewSeller({ ...newSeller, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="부산 지역 공식 딜러"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-900 dark:text-white">전화번호 *</label>
                <input
                  type="tel"
                  required
                  value={newSeller.phone}
                  onChange={(e) => setNewSeller({ ...newSeller, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="051-123-4567"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-900 dark:text-white">이메일 *</label>
                <input
                  type="email"
                  required
                  value={newSeller.email}
                  onChange={(e) => setNewSeller({ ...newSeller, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="busan@sharks.kr"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-all"
                >
                  추가하기
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddSellerForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-400 transition-all"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopAdmin;
