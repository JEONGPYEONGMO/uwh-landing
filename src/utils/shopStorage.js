// 📦 shopStorage.js - 수중하키 쇼핑몰 데이터 관리 유틸리티
// localStorage 기반 상품 및 판매자 관리 시스템

const STORAGE_KEYS = {
  PRODUCTS: 'uwh_shop_products',
  SELLERS: 'uwh_shop_sellers',
  NEXT_PRODUCT_ID: 'uwh_next_product_id',
  NEXT_SELLER_ID: 'uwh_next_seller_id'
};

// ======================
// 🔧 Helper Functions
// ======================

/**
 * localStorage에서 데이터 읽기
 */
const getFromStorage = (key, defaultValue = []) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from storage:`, error);
    return defaultValue;
  }
};

/**
 * localStorage에 데이터 저장
 */
const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return { success: true };
  } catch (error) {
    console.error(`Error saving ${key} to storage:`, error);
    return { success: false, error: error.message };
  }
};

/**
 * 다음 ID 가져오기 및 증가
 */
const getNextId = (key) => {
  const currentId = parseInt(localStorage.getItem(key) || '1', 10);
  localStorage.setItem(key, (currentId + 1).toString());
  return currentId;
};

/**
 * 현재 타임스탬프 반환
 */
const getCurrentTimestamp = () => new Date().toISOString();

// ======================
// 📦 상품 관리 함수
// ======================

/**
 * 모든 상품 가져오기
 * @returns {Array} 상품 배열
 */
export const getProducts = () => {
  return getFromStorage(STORAGE_KEYS.PRODUCTS, []);
};

/**
 * 상품 추가
 * @param {Object} productData - 상품 정보
 * @returns {Object} 결과 { success, product?, error? }
 */
export const addProduct = (productData) => {
  try {
    // 필수 필드 검증
    if (!productData.name || !productData.category || !productData.sellerId) {
      return { 
        success: false, 
        error: '필수 필드(name, category, sellerId)가 누락되었습니다.' 
      };
    }

    const products = getProducts();
    const newProduct = {
      id: getNextId(STORAGE_KEYS.NEXT_PRODUCT_ID),
      name: productData.name,
      category: productData.category,
      sellerId: productData.sellerId,
      price: productData.price || '0원',
      image: productData.image || '📦',
      description: productData.description || '',
      features: productData.features || [],
      rating: productData.rating || 0,
      reviews: productData.reviews || 0,
      inStock: productData.inStock !== undefined ? productData.inStock : true,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp()
    };

    products.push(newProduct);
    const saveResult = saveToStorage(STORAGE_KEYS.PRODUCTS, products);

    if (saveResult.success) {
      return { success: true, product: newProduct };
    } else {
      return saveResult;
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * 상품 수정
 * @param {number} productId - 상품 ID
 * @param {Object} updatedData - 수정할 데이터
 * @returns {Object} 결과 { success, product?, error? }
 */
export const updateProduct = (productId, updatedData) => {
  try {
    const products = getProducts();
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
      return { success: false, error: '상품을 찾을 수 없습니다.' };
    }

    // 수정 불가능한 필드 제외
    const { id, createdAt, ...updateFields } = updatedData;

    products[productIndex] = {
      ...products[productIndex],
      ...updateFields,
      updatedAt: getCurrentTimestamp()
    };

    const saveResult = saveToStorage(STORAGE_KEYS.PRODUCTS, products);

    if (saveResult.success) {
      return { success: true, product: products[productIndex] };
    } else {
      return saveResult;
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * 상품 삭제
 * @param {number} productId - 상품 ID
 * @returns {Object} 결과 { success, error? }
 */
export const deleteProduct = (productId) => {
  try {
    const products = getProducts();
    const filteredProducts = products.filter(p => p.id !== productId);

    if (products.length === filteredProducts.length) {
      return { success: false, error: '상품을 찾을 수 없습니다.' };
    }

    return saveToStorage(STORAGE_KEYS.PRODUCTS, filteredProducts);
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * ID로 상품 찾기
 * @param {number} productId - 상품 ID
 * @returns {Object|null} 상품 객체 또는 null
 */
export const getProductById = (productId) => {
  const products = getProducts();
  return products.find(p => p.id === productId) || null;
};

/**
 * 카테고리로 상품 필터링
 * @param {string} category - 카테고리명
 * @returns {Array} 필터링된 상품 배열
 */
export const getProductsByCategory = (category) => {
  const products = getProducts();
  return products.filter(p => p.category === category);
};

/**
 * 판매자로 상품 필터링
 * @param {number} sellerId - 판매자 ID
 * @returns {Array} 필터링된 상품 배열
 */
export const getProductsBySeller = (sellerId) => {
  const products = getProducts();
  return products.filter(p => p.sellerId === sellerId);
};

/**
 * 상품 검색
 * @param {string} searchTerm - 검색어
 * @returns {Array} 검색 결과 배열
 */
export const searchProducts = (searchTerm) => {
  const products = getProducts();
  const term = searchTerm.toLowerCase();

  return products.filter(product => 
    product.name.toLowerCase().includes(term) ||
    product.description.toLowerCase().includes(term) ||
    product.category.toLowerCase().includes(term) ||
    (product.features && product.features.some(f => f.toLowerCase().includes(term)))
  );
};

// ======================
// 👤 판매자 관리 함수
// ======================

/**
 * 모든 판매자 가져오기
 * @returns {Array} 판매자 배열
 */
export const getSellers = () => {
  return getFromStorage(STORAGE_KEYS.SELLERS, []);
};

/**
 * 판매자 추가
 * @param {Object} sellerData - 판매자 정보
 * @returns {Object} 결과 { success, seller?, error? }
 */
export const addSeller = (sellerData) => {
  try {
    // 필수 필드 검증
    if (!sellerData.name) {
      return { 
        success: false, 
        error: '필수 필드(name)가 누락되었습니다.' 
      };
    }

    const sellers = getSellers();
    const newSeller = {
      id: getNextId(STORAGE_KEYS.NEXT_SELLER_ID),
      name: sellerData.name,
      avatar: sellerData.avatar || '🏪',
      description: sellerData.description || '',
      phone: sellerData.phone || '',
      email: sellerData.email || '',
      address: sellerData.address || '',
      verified: sellerData.verified !== undefined ? sellerData.verified : false,
      rating: sellerData.rating || 0,
      totalReviews: sellerData.totalReviews || 0,
      joinedAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp()
    };

    sellers.push(newSeller);
    const saveResult = saveToStorage(STORAGE_KEYS.SELLERS, sellers);

    if (saveResult.success) {
      return { success: true, seller: newSeller };
    } else {
      return saveResult;
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * 판매자 수정
 * @param {number} sellerId - 판매자 ID
 * @param {Object} updatedData - 수정할 데이터
 * @returns {Object} 결과 { success, seller?, error? }
 */
export const updateSeller = (sellerId, updatedData) => {
  try {
    const sellers = getSellers();
    const sellerIndex = sellers.findIndex(s => s.id === sellerId);

    if (sellerIndex === -1) {
      return { success: false, error: '판매자를 찾을 수 없습니다.' };
    }

    // 수정 불가능한 필드 제외
    const { id, joinedAt, ...updateFields } = updatedData;

    sellers[sellerIndex] = {
      ...sellers[sellerIndex],
      ...updateFields,
      updatedAt: getCurrentTimestamp()
    };

    const saveResult = saveToStorage(STORAGE_KEYS.SELLERS, sellers);

    if (saveResult.success) {
      return { success: true, seller: sellers[sellerIndex] };
    } else {
      return saveResult;
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * 판매자 삭제
 * @param {number} sellerId - 판매자 ID
 * @returns {Object} 결과 { success, error? }
 */
export const deleteSeller = (sellerId) => {
  try {
    const sellers = getSellers();
    const filteredSellers = sellers.filter(s => s.id !== sellerId);

    if (sellers.length === filteredSellers.length) {
      return { success: false, error: '판매자를 찾을 수 없습니다.' };
    }

    // 해당 판매자의 상품도 함께 삭제할지 확인
    const products = getProducts();
    const sellerProducts = products.filter(p => p.sellerId === sellerId);
    
    if (sellerProducts.length > 0) {
      console.warn(`판매자 ${sellerId}의 상품 ${sellerProducts.length}개가 존재합니다.`);
      // 실제로는 상품은 유지하고 sellerId를 null로 변경하는 것이 좋을 수 있습니다
    }

    return saveToStorage(STORAGE_KEYS.SELLERS, filteredSellers);
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * ID로 판매자 찾기
 * @param {number} sellerId - 판매자 ID
 * @returns {Object|null} 판매자 객체 또는 null
 */
export const getSellerById = (sellerId) => {
  const sellers = getSellers();
  return sellers.find(s => s.id === sellerId) || null;
};

/**
 * 인증된 판매자만 가져오기
 * @returns {Array} 인증된 판매자 배열
 */
export const getVerifiedSellers = () => {
  const sellers = getSellers();
  return sellers.filter(s => s.verified === true);
};

// ======================
// 📊 통계 및 분석 함수
// ======================

/**
 * 샵 통계 가져오기
 * @returns {Object} 통계 객체
 */
export const getShopStats = () => {
  const products = getProducts();
  const sellers = getSellers();

  const stats = {
    totalProducts: products.length,
    inStockProducts: products.filter(p => p.inStock).length,
    outOfStockProducts: products.filter(p => !p.inStock).length,
    totalSellers: sellers.length,
    verifiedSellers: sellers.filter(s => s.verified).length,
    averageRating: products.length > 0 
      ? products.reduce((sum, p) => sum + (p.rating || 0), 0) / products.length 
      : 0,
    totalReviews: products.reduce((sum, p) => sum + (p.reviews || 0), 0),
    categoryCounts: getCategoryCounts()
  };

  return stats;
};

/**
 * 카테고리별 상품 개수
 * @returns {Object} 카테고리별 개수 객체
 */
export const getCategoryCounts = () => {
  const products = getProducts();
  const counts = {};

  products.forEach(product => {
    counts[product.category] = (counts[product.category] || 0) + 1;
  });

  return counts;
};

/**
 * 최고 평점 상품 가져오기
 * @param {number} limit - 가져올 개수 (기본값: 10)
 * @returns {Array} 상위 평점 상품 배열
 */
export const getTopRatedProducts = (limit = 10) => {
  const products = getProducts();
  
  return products
    .filter(p => p.rating > 0)
    .sort((a, b) => {
      // 평점 우선, 같으면 리뷰 수로 정렬
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return (b.reviews || 0) - (a.reviews || 0);
    })
    .slice(0, limit);
};

// ======================
// 🗑️ 데이터 관리 함수
// ======================

/**
 * 모든 상품 삭제
 * @returns {Object} 결과 { success, error? }
 */
export const clearAllProducts = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.NEXT_PRODUCT_ID);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * 모든 판매자 삭제
 * @returns {Object} 결과 { success, error? }
 */
export const clearAllSellers = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.SELLERS);
    localStorage.removeItem(STORAGE_KEYS.NEXT_SELLER_ID);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * 모든 샵 데이터 삭제
 * @returns {Object} 결과 { success, error? }
 */
export const clearAllShopData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * 데이터 백업
 * @returns {Object} 백업 데이터
 */
export const backupShopData = () => {
  return {
    products: getProducts(),
    sellers: getSellers(),
    backupDate: getCurrentTimestamp(),
    version: '1.0'
  };
};

/**
 * 데이터 복원
 * @param {Object} backupData - 백업 데이터
 * @returns {Object} 결과 { success, error? }
 */
export const restoreShopData = (backupData) => {
  try {
    if (!backupData || !backupData.products || !backupData.sellers) {
      return { 
        success: false, 
        error: '유효하지 않은 백업 데이터입니다.' 
      };
    }

    // 데이터 복원
    saveToStorage(STORAGE_KEYS.PRODUCTS, backupData.products);
    saveToStorage(STORAGE_KEYS.SELLERS, backupData.sellers);

    // ID 카운터 재설정
    if (backupData.products.length > 0) {
      const maxProductId = Math.max(...backupData.products.map(p => p.id));
      localStorage.setItem(STORAGE_KEYS.NEXT_PRODUCT_ID, (maxProductId + 1).toString());
    }

    if (backupData.sellers.length > 0) {
      const maxSellerId = Math.max(...backupData.sellers.map(s => s.id));
      localStorage.setItem(STORAGE_KEYS.NEXT_SELLER_ID, (maxSellerId + 1).toString());
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * JSON 파일로 내보내기
 * @param {string} filename - 파일명 (기본값: shop-backup-{날짜}.json)
 */
export const exportToJSON = (filename) => {
  try {
    const backupData = backupShopData();
    const dataStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `shop-backup-${new Date().toISOString().split('T')[0]}.json`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    return { success: true };
  } catch (error) {
    console.error('Export error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * JSON 파일에서 가져오기
 * @param {File} file - JSON 파일
 * @returns {Promise<Object>} 결과 { success, error? }
 */
export const importFromJSON = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject({ success: false, error: '파일이 선택되지 않았습니다.' });
      return;
    }

    if (!file.name.endsWith('.json')) {
      reject({ success: false, error: 'JSON 파일만 가져올 수 있습니다.' });
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const backupData = JSON.parse(e.target.result);
        const result = restoreShopData(backupData);
        
        if (result.success) {
          resolve({ success: true });
        } else {
          reject(result);
        }
      } catch (error) {
        reject({ success: false, error: 'JSON 파싱 오류: ' + error.message });
      }
    };

    reader.onerror = () => {
      reject({ success: false, error: '파일 읽기 오류' });
    };

    reader.readAsText(file);
  });
};

// ======================
// 🎯 Default Export
// ======================

const shopStorage = {
  // 상품 관리
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductsByCategory,
  getProductsBySeller,
  searchProducts,
  
  // 판매자 관리
  getSellers,
  addSeller,
  updateSeller,
  deleteSeller,
  getSellerById,
  getVerifiedSellers,
  
  // 통계 및 분석
  getShopStats,
  getCategoryCounts,
  getTopRatedProducts,
  
  // 데이터 관리
  clearAllProducts,
  clearAllSellers,
  clearAllShopData,
  backupShopData,
  restoreShopData,
  exportToJSON,
  importFromJSON
};

export default shopStorage;
