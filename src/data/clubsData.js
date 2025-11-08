// src/data/clubsData.js - 대한민국(용인) 및 동아시아, 동남아시아 클럽 데이터

export const clubsData = [
  // 대한민국 (용인만)
  {
    id: 1,
    name: 'Baby Octopus Club',
    location: '서울',
    country: 'South Korea',
    countryCode: 'KR',
    region: '경기',
    members: 18,
    level: 'all-levels',
    description: '서울 및 경기 남부 지역 수중하키 클럽입니다. 초보자부터 경험자까지 모두 환영합니다!',
    schedule: '매주 토요일 11:00-13:00, 일요일 17:00-20:00',
    pool: '용인 인어다이브 수영장',
    contact: 'yongin.uwh@example.com',
    established: 2024,
    image: '🏊‍♂️',
    social: {
      kakao: 'https://open.kakao.com/o/꼴뚜기수중하키',
      instagram: '@yongin_uwh',
      naver: 'https://cafe.naver.com/yonginuwh'
    }
  },

  // 중국
  {
    id: 2,
    name: 'Beijing Eight UWH Club',
    location: '北京 (Beijing)',
    country: 'China',
    countryCode: 'CN',
    region: 'North China',
    members: 35,
    level: 'advanced',
    description: 'Beijing\'s premier underwater hockey club with experienced players',
    schedule: 'Every Saturday & Sunday 14:00-17:00',
    pool: 'Donggaodi Sports Center Pool',
    contact: 'beijing8@example.com',
    established: 2015,
    image: '🏛️',
    social: {
      wechat: 'Beijing_UWH',
      website: 'beijinguwh.com'
    }
  },
  {
    id: 3,
    name: 'Beijing Medusa',
    location: '北京 (Beijing)',
    country: 'China',
    countryCode: 'CN',
    region: 'North China',
    members: 28,
    level: 'intermediate-advanced',
    description: 'Competitive team focusing on tournament play',
    schedule: 'Every Wednesday & Friday 19:00-21:00',
    pool: 'Xiyuyuan Hotel Pool',
    contact: 'medusa.beijing@example.com',
    established: 2016,
    image: '🐙',
    social: {
      wechat: 'Beijing_Medusa'
    }
  },
  {
    id: 4,
    name: 'Underwater Hockey Beijing (UHB)',
    location: '北京 (Beijing)',
    country: 'China',
    countryCode: 'CN',
    region: 'North China',
    members: 42,
    level: 'all-levels',
    description: 'Largest Beijing club welcoming all skill levels',
    schedule: 'Multiple sessions weekly',
    pool: 'New Poly Pool & Paralympic Gym Pool',
    contact: 'uhb@example.com',
    established: 2014,
    image: '🇨🇳',
    social: {
      wechat: 'UHB_Official',
      weibo: '@UHBeijing'
    }
  },
  {
    id: 5,
    name: 'Chengdu Bubble',
    location: '成都 (Chengdu)',
    country: 'China',
    countryCode: 'CN',
    region: 'Southwest China',
    members: 20,
    level: 'beginner-intermediate',
    description: 'Friendly club in Sichuan\'s capital',
    schedule: 'Every Sunday 15:00-17:00',
    pool: 'Adiwer Fitness Club Pool',
    contact: 'chengdu.bubble@example.com',
    established: 2017,
    image: '🐼',
    social: {
      wechat: 'ChengduBubble'
    }
  },
  {
    id: 6,
    name: 'Chengdu Sea Elf',
    location: '成都 (Chengdu)',
    country: 'China',
    countryCode: 'CN',
    region: 'Southwest China',
    members: 18,
    level: 'all-levels',
    description: 'Growing Chengdu underwater hockey community',
    schedule: 'Every Saturday 16:00-18:00',
    pool: 'Wenxuan Babu Zaidao Swimming Pool',
    contact: 'seaelf.chengdu@example.com',
    established: 2018,
    image: '🧚',
    social: {
      wechat: 'SeaElf_CD'
    }
  },
  {
    id: 7,
    name: 'Dalian UWH',
    location: '大连 (Dalian)',
    country: 'China',
    countryCode: 'CN',
    region: 'Northeast China',
    members: 16,
    level: 'intermediate',
    description: 'University-based club in coastal city',
    schedule: 'Every Friday 18:00-20:00',
    pool: 'Dalian University of Technology',
    contact: 'dalian.uwh@example.com',
    established: 2019,
    image: '🏫',
    social: {
      wechat: 'DalianUWH'
    }
  },
  {
    id: 8,
    name: 'Guangzhou UWH',
    location: '广州 (Guangzhou)',
    country: 'China',
    countryCode: 'CN',
    region: 'South China',
    members: 25,
    level: 'all-levels',
    description: 'Active club in southern China',
    schedule: 'Every Tuesday & Thursday 19:00-21:00',
    pool: 'Dali Swimming Centre',
    contact: 'guangzhou.uwh@example.com',
    established: 2016,
    image: '🌆',
    social: {
      wechat: 'GZ_UWH',
      weibo: '@GuangzhouUWH'
    }
  },
  {
    id: 9,
    name: 'Handan UWH',
    location: '邯郸 (Handan)',
    country: 'China',
    countryCode: 'CN',
    region: 'North China',
    members: 12,
    level: 'beginner',
    description: 'New club in Hebei Province',
    schedule: 'Every Saturday 14:00-16:00',
    pool: 'Handan Swimming Training Center',
    contact: 'handan.uwh@example.com',
    established: 2020,
    image: '🏊',
    social: {
      wechat: 'HandanUWH'
    }
  },

  // 홍콩
  {
    id: 10,
    name: 'Hong Kong UWH Association',
    location: '香港 (Hong Kong)',
    country: 'Hong Kong',
    countryCode: 'HK',
    region: 'Hong Kong',
    members: 50,
    level: 'advanced',
    description: 'Official HK association with competitive teams',
    schedule: 'Multiple weekly sessions',
    pool: 'Various pools across HK',
    contact: 'info@hkuwh.org',
    established: 2010,
    image: '🏙️',
    social: {
      website: 'hkuwh.org',
      instagram: '@hk_uwh',
      facebook: 'HKUnderwaterHockey'
    }
  },

  // 일본
  {
    id: 11,
    name: 'Tokyo Octopush Club',
    location: '東京 (Tokyo)',
    country: 'Japan',
    countryCode: 'JP',
    region: 'Kanto',
    members: 45,
    level: 'all-levels',
    description: 'Tokyo\'s main underwater hockey community',
    schedule: 'Every weekend',
    pool: 'Tokyo Sports Center',
    contact: 'tokyo.octopush@example.jp',
    established: 2012,
    image: '🗼',
    social: {
      twitter: '@TokyoOctopush',
      instagram: '@tokyo_uwh'
    }
  },
  {
    id: 12,
    name: 'Osaka Underwater Hockey',
    location: '大阪 (Osaka)',
    country: 'Japan',
    countryCode: 'JP',
    region: 'Kansai',
    members: 32,
    level: 'intermediate',
    description: 'Osaka\'s premier UWH club',
    schedule: 'Every Saturday 15:00-18:00',
    pool: 'Osaka Prefectural Pool',
    contact: 'osaka.uwh@example.jp',
    established: 2014,
    image: '🏯',
    social: {
      twitter: '@OsakaUWH',
      line: '@osaka_uwh'
    }
  },
  {
    id: 13,
    name: 'Fukuoka Sea Dragons',
    location: '福岡 (Fukuoka)',
    country: 'Japan',
    countryCode: 'JP',
    region: 'Kyushu',
    members: 20,
    level: 'all-levels',
    description: 'Southern Japan\'s underwater hockey club',
    schedule: 'Every Sunday 14:00-16:00',
    pool: 'Fukuoka City Pool',
    contact: 'fukuoka.seadragons@example.jp',
    established: 2016,
    image: '🐉',
    social: {
      twitter: '@FukuokaSeaDragons',
      instagram: '@fukuoka_uwh'
    }
  },

  // 싱가포르
  {
    id: 14,
    name: 'Stirling Underwater Hockey Club (SUHC)',
    location: 'Singapore',
    country: 'Singapore',
    countryCode: 'SG',
    region: 'Singapore',
    members: 60,
    level: 'all-levels',
    description: 'Most international UWH club in Asia, hosting first Asian Championships in 2007. Members from 10+ countries!',
    schedule: 'Three times weekly',
    pool: 'MOE (Evans) Swimming Complex',
    contact: 'info@suhc.org',
    established: 2004,
    image: '🦁',
    social: {
      website: 'suhc.org',
      facebook: 'SingaporeUWH',
      instagram: '@suhc_singapore'
    }
  },

  // 말레이시아
  {
    id: 15,
    name: 'Malaysian UWH Association (MUHA)',
    location: 'Kuala Lumpur',
    country: 'Malaysia',
    countryCode: 'MY',
    region: 'Selangor',
    members: 38,
    level: 'intermediate-advanced',
    description: 'National association grooming athletes for international arena',
    schedule: 'Every Saturday & Sunday 16:00-18:00',
    pool: 'Bukit Jalil Aquatic Centre',
    contact: 'info@muha.org.my',
    established: 2015,
    image: '🇲🇾',
    social: {
      website: 'muha.org.my',
      facebook: 'MalaysiaUWH',
      instagram: '@muha_official'
    }
  },
  {
    id: 16,
    name: 'Penang UWH Club',
    location: 'Penang',
    country: 'Malaysia',
    countryCode: 'MY',
    region: 'Penang',
    members: 22,
    level: 'all-levels',
    description: 'Island-based club with diverse community',
    schedule: 'Every Sunday 15:00-17:00',
    pool: 'Penang Sports Complex Pool',
    contact: 'penang.uwh@example.my',
    established: 2018,
    image: '🏝️',
    social: {
      facebook: 'PenangUWH',
      instagram: '@penang_uwh'
    }
  },
  {
    id: 17,
    name: 'Johor Bahru Underwater Hockey',
    location: 'Johor Bahru',
    country: 'Malaysia',
    countryCode: 'MY',
    region: 'Johor',
    members: 18,
    level: 'beginner-intermediate',
    description: 'Southern Malaysia\'s growing UWH community',
    schedule: 'Every Saturday 17:00-19:00',
    pool: 'JB City Council Pool',
    contact: 'jb.uwh@example.my',
    established: 2019,
    image: '🌊',
    social: {
      facebook: 'JBUWH',
      instagram: '@jb_uwh'
    }
  },

  // 인도네시아
  {
    id: 18,
    name: 'Jakarta Underwater Hockey',
    location: 'Jakarta',
    country: 'Indonesia',
    countryCode: 'ID',
    region: 'Java',
    members: 28,
    level: 'intermediate',
    description: 'Indonesia\'s capital city UWH club affiliated with CMAS',
    schedule: 'Every Wednesday & Saturday 18:00-20:00',
    pool: 'Senayan Aquatic Centre',
    contact: 'jakarta.uwh@example.id',
    established: 2016,
    image: '🏙️',
    social: {
      instagram: '@jakarta_uwh',
      facebook: 'JakartaUWH'
    }
  },
  {
    id: 19,
    name: 'Bali Ocean Pucks',
    location: 'Bali',
    country: 'Indonesia',
    countryCode: 'ID',
    region: 'Bali',
    members: 20,
    level: 'all-levels',
    description: 'Paradise island club mixing locals and expats',
    schedule: 'Every Sunday 16:00-18:00',
    pool: 'Denpasar Sports Center',
    contact: 'bali.oceanpucks@example.id',
    established: 2017,
    image: '🌴',
    social: {
      instagram: '@bali_oceanpucks',
      facebook: 'BaliOceanPucks'
    }
  },
  {
    id: 20,
    name: 'Surabaya UWH Team',
    location: 'Surabaya',
    country: 'Indonesia',
    countryCode: 'ID',
    region: 'East Java',
    members: 15,
    level: 'beginner-intermediate',
    description: 'East Java\'s emerging underwater hockey club',
    schedule: 'Every Saturday 15:00-17:00',
    pool: 'Surabaya Sports Complex',
    contact: 'surabaya.uwh@example.id',
    established: 2019,
    image: '🦈',
    social: {
      instagram: '@surabaya_uwh',
      facebook: 'SurabayaUWH'
    }
  },

  // 필리핀
  {
    id: 21,
    name: 'Philippine UWH Confederation (PUHC)',
    location: 'Manila',
    country: 'Philippines',
    countryCode: 'PH',
    region: 'Metro Manila',
    members: 80,
    level: 'advanced',
    description: 'First UWH club in Asia (1979)! National sports association with Olympic Committee affiliation. Multiple Asian Championship gold medals.',
    schedule: 'Multiple weekly sessions',
    pool: 'Ayala Vermosa Sports Hub',
    contact: 'info@puhc.ph',
    established: 1979,
    image: '🏆',
    social: {
      website: 'puhc.ph',
      facebook: 'pilipinasuwh',
      instagram: '@puhc_official'
    }
  },
  {
    id: 22,
    name: 'Polo Puck Pirates',
    location: 'Manila',
    country: 'Philippines',
    countryCode: 'PH',
    region: 'Metro Manila',
    members: 35,
    level: 'intermediate-advanced',
    description: 'One of three main clubs under PUHC, competitive team',
    schedule: 'Every Tuesday & Friday 19:00-21:00',
    pool: 'Quezon City Sports Club',
    contact: 'polopuckpirates@example.ph',
    established: 1990,
    image: '🏴‍☠️',
    social: {
      facebook: 'PoloPuckPirates',
      instagram: '@polo_puck_pirates'
    }
  },
  {
    id: 23,
    name: '3P Underwater Hockey Club',
    location: 'Manila',
    country: 'Philippines',
    countryCode: 'PH',
    region: 'Metro Manila',
    members: 40,
    level: 'all-levels',
    description: 'Growing club pushing for sport development in PH',
    schedule: 'Every Wednesday & Sunday 17:00-19:00',
    pool: 'Manila Sports Complex',
    contact: '3puwh@example.ph',
    established: 2015,
    image: '💪',
    social: {
      facebook: '3PUnderwaterHockey',
      instagram: '@3p_uwh'
    }
  },
  {
    id: 24,
    name: 'UB Seals Club',
    location: 'Manila',
    country: 'Philippines',
    countryCode: 'PH',
    region: 'Metro Manila',
    members: 30,
    level: 'all-levels',
    description: 'Club focused on youth development and grassroots',
    schedule: 'Every Saturday & Sunday 14:00-16:00',
    pool: 'UP Diliman Pool',
    contact: 'ubseals@example.ph',
    established: 2016,
    image: '🦭',
    social: {
      facebook: 'UBSealsClub',
      instagram: '@ub_seals'
    }
  },
  {
    id: 25,
    name: 'Citadel Underwater Hockey Club',
    location: 'Manila',
    country: 'Philippines',
    countryCode: 'PH',
    region: 'Metro Manila',
    members: 28,
    level: 'intermediate',
    description: 'One of PUHC\'s three main affiliated clubs',
    schedule: 'Every Monday & Thursday 18:00-20:00',
    pool: 'Makati Sports Club',
    contact: 'citadel.uwh@example.ph',
    established: 2012,
    image: '🏰',
    social: {
      facebook: 'CitadelUWH',
      instagram: '@citadel_uwh'
    }
  },
  {
    id: 26,
    name: 'Cebu Underwater Hockey',
    location: 'Cebu',
    country: 'Philippines',
    countryCode: 'PH',
    region: 'Visayas',
    members: 22,
    level: 'intermediate',
    description: 'Growing club in the Queen City of the South',
    schedule: 'Every Saturday 15:00-17:00',
    pool: 'Cebu City Sports Center',
    contact: 'cebu.uwh@example.ph',
    established: 2018,
    image: '🌊',
    social: {
      facebook: 'CebuUWH',
      instagram: '@cebu_uwh'
    }
  }
];

// 레벨 정의
export const levels = {
  'beginner': '초급',
  'beginner-intermediate': '초-중급',
  'intermediate': '중급',
  'intermediate-advanced': '중-상급',
  'advanced': '상급',
  'all-levels': '전체'
};

// 국가별 필터
export const countries = [
  { code: 'KR', name: '대한민국', flag: '🇰🇷', region: 'East Asia' },
  { code: 'CN', name: '중국', flag: '🇨🇳', region: 'East Asia' },
  { code: 'HK', name: '홍콩', flag: '🇭🇰', region: 'East Asia' },
  { code: 'JP', name: '일본', flag: '🇯🇵', region: 'East Asia' },
  { code: 'SG', name: '싱가포르', flag: '🇸🇬', region: 'Southeast Asia' },
  { code: 'MY', name: '말레이시아', flag: '🇲🇾', region: 'Southeast Asia' },
  { code: 'ID', name: '인도네시아', flag: '🇮🇩', region: 'Southeast Asia' },
  { code: 'PH', name: '필리핀', flag: '🇵🇭', region: 'Southeast Asia' }
];

// 지역별 그룹
export const regions = {
  'East Asia': ['KR', 'CN', 'HK', 'JP'],
  'Southeast Asia': ['SG', 'MY', 'ID', 'PH']
};

export default clubsData;
