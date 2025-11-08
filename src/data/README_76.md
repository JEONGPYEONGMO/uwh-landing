# 🏒 전 세계 수중하키 클럽 데이터베이스

## 📋 개요

pucku.org 기반으로 전 세계 수중하키(Underwater Hockey) 클럽 정보를 정리한 데이터베이스입니다.

## 📊 통계

- **총 클럽 수**: 74개
- **국가 수**: 26개
- **대륙**: 6개 대륙 전체

### 대륙별 분포

| 대륙 | 클럽 수 |
|------|---------|
| 🌏 아시아 (Asia) | 25개 |
| 🌍 유럽 (Europe) | 19개 |
| 🌎 북아메리카 (North America) | 16개 |
| 🌏 오세아니아 (Oceania) | 8개 |
| 🌍 아프리카 (Africa) | 4개 |
| 🌎 남아메리카 (South America) | 2개 |

## 🌍 포함된 국가

### 아시아
- 🇰🇷 한국 (South Korea)
- 🇨🇳 중국 (China)
- 🇯🇵 일본 (Japan)
- 🇸🇬 싱가포르 (Singapore)
- 🇮🇩 인도네시아 (Indonesia)
- 🇵🇭 필리핀 (Philippines)
- 🇮🇳 인도 (India)

### 유럽
- 🇬🇧 영국 (United Kingdom)
- 🇫🇷 프랑스 (France)
- 🇳🇱 네덜란드 (Netherlands)
- 🇧🇪 벨기에 (Belgium)
- 🇪🇸 스페인 (Spain)
- 🇩🇪 독일 (Germany)
- 🇨🇿 체코 (Czech Republic)
- 🇵🇱 폴란드 (Poland)
- 🇮🇪 아일랜드 (Ireland)
- 🇹🇷 터키 (Turkey)

### 북아메리카
- 🇨🇦 캐나다 (Canada)
- 🇺🇸 미국 (United States)
- 🇲🇽 멕시코 (Mexico)

### 남아메리카
- 🇧🇷 브라질 (Brazil)
- 🇨🇴 콜롬비아 (Colombia)

### 오세아니아
- 🇦🇺 호주 (Australia)
- 🇳🇿 뉴질랜드 (New Zealand)

### 아프리카
- 🇿🇦 남아프리카 (South Africa)
- 🇪🇬 이집트 (Egypt)

## 📌 주요 클럽

### 역사적 클럽
- **Southsea Octopush Club** (영국, 1954년) - 세계 최초의 수중하키 클럽!
- **Vancouver Underwater Hockey** (캐나다, 1962년) - 캐나다 최초 클럽
- **Monash Underwater Hockey** (호주, 1966년) - 호주 최대 대학 클럽

### 대륙별 주요 클럽

#### 아시아
- **Hong Kong Underwater Hockey Association** - 85명 회원
- **Beijing Eight Underwater Hockey Club** - 60명 회원
- **Stirling Underwater Hockey Club** (싱가포르) - 52명 회원

#### 유럽
- **Southsea Octopush Club** (영국) - 130명 회원, 영국 최고 랭킹
- **Paris UWH** (프랑스) - 95명 회원
- **MDG Manchester Diving Group** (영국) - 85명 회원

#### 북아메리카
- **Vancouver Underwater Hockey** (캐나다) - 95명 회원
- **Toronto Underwater Hockey** (캐나다) - 88명 회원
- **CAMO Hockey Sous-Marin** (캐나다 몬트리올) - 75명 회원

#### 오세아니아
- **Monash Underwater Hockey** (호주) - 95명 회원
- **Brisbane Barracudas** (호주) - 88명 회원
- **Sydney Starfish** (호주) - 85명 회원

## 💾 데이터 구조

각 클럽 정보는 다음 필드를 포함합니다:

```javascript
{
  id: Number,              // 고유 ID
  name: String,            // 클럽 이름
  region: String,          // 지역/도시
  country: String,         // 국가
  continent: String,       // 대륙
  lat: Number,             // 위도
  lng: Number,             // 경도
  members: Number,         // 회원 수
  level: String,           // 수준 (All levels, Beginner, Intermediate, Advanced, Competitive)
  schedule: String,        // 훈련 일정
  facilities: Array,       // 시설 정보
  description: String,     // 클럽 설명
  poolName: String,        // 수영장 이름
  established: String,     // 설립 연도
  website: String          // 웹사이트
}
```

## 🔧 사용 가능한 함수

### 1. 대륙별 필터링
```javascript
const asianClubs = getClubsByContinent('Asia');
const europeanClubs = getClubsByContinent('Europe');
```

### 2. 국가별 필터링
```javascript
const koreanClubs = getClubsByCountry('South Korea');
const ukClubs = getClubsByCountry('United Kingdom');
```

### 3. 검색
```javascript
const results = searchClubs('underwater');
const seoulClubs = searchClubs('Seoul');
```

### 4. 통계 정보
```javascript
console.log(clubStats.totalClubs);     // 총 클럽 수
console.log(clubStats.continents);     // 대륙별 통계
console.log(clubStats.totalMembers);   // 총 회원 수
console.log(clubStats.oldestClub);     // 가장 오래된 클럽
```

## 📚 데이터 출처

- **주요 출처**: [pucku.org](https://pucku.org/tourist/)
- **업데이트 날짜**: 2024년 11월
- **데이터 품질**: pucku.org의 공식 등록 클럽 정보 기반

## 🔄 업데이트 이력

- **2024-11-04**: pucku.org 기반 전 세계 74개 클럽 데이터 통합 완료
  - 26개국, 6개 대륙 클럽 정보 포함
  - 역사적 정보 및 상세 설명 추가
  - 검색 및 필터링 함수 구현

## 📖 수중하키(Underwater Hockey)란?

수중하키는 수영장 바닥에서 진행되는 팀 스포츠입니다:
- 각 팀 6명의 선수
- 스노클링 장비 사용 (마스크, 스노클, 핀)
- 짧은 스틱으로 무게가 있는 퍽을 상대 골로 밀어넣기
- 비접촉 스포츠
- 1954년 영국 포츠머스에서 시작

## 🤝 기여

데이터 업데이트나 오류 수정은 pucku.org를 통해 직접 확인하시거나 해당 클럽에 문의해주세요.

## 📧 문의

각 클럽의 연락처는 클럽 데이터의 `website` 필드를 참조하시거나, pucku.org에서 최신 정보를 확인하세요.

---

**마지막 업데이트**: 2024년 11월 4일
**데이터 버전**: v1.0
