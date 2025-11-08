// src/pages/Clubs.jsx
import React, { useState } from 'react';
import { MapPin, Users, Search, Globe, Calendar, X, Phone, Mail, ExternalLink, Award, Map } from 'lucide-react';

const Clubs = () => {
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClub, setSelectedClub] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const clubs = [
    { id: 1, name: 'Baby Octopus Club', location: '서울', country: 'South Korea', countryCode: 'KR', members: 70, level: 'all-levels', description: '서울 및 경기 남부 지역 수중하키 클럽입니다. 초보자부터 경험자까지 모두 환영합니다!', schedule: '매주 토요일 11:00-13:00, 일요일 17:00-20:00', pool: '용인 인어다이브 수영장', contact: 'yongin.uwh@example.com', established: 2024, image: '🏊‍♂️', phone: '031-123-4567', email: 'yongin.uwh@example.com', website: 'https://yonginuwh.com', social: { kakao: 'open.kakao.com/o/yongin', instagram: '@yongin_uwh' }, history: '2021년 설립된 용인 지역 최초의 수중하키 클럽으로, 경기도 지역 수중 스포츠 활성화를 목표로 합니다.', facilities: ['수중 카메라', '훈련용 장비', '락커룸'], achievements: ['2023 경기도 수중스포츠 대회 참가'], fees: '월 회비: 50,000원' },
    { id: 2, name: 'Beijing Eight UWH Club', location: '北京 (Beijing)', country: 'China', countryCode: 'CN', members: 35, level: 'advanced', description: 'Beijing\'s premier underwater hockey club with experienced players', schedule: 'Every Saturday & Sunday 14:00-17:00', pool: 'Donggaodi Sports Center Pool', contact: 'beijing8@example.com', established: 2015, image: '🏛️', phone: '+86-10-1234-5678', email: 'beijing8@example.com', website: 'https://beijinguwh.cn', social: { wechat: 'Beijing_UWH', weibo: '@BeijingEight' }, history: 'Established in 2015, Beijing Eight is the premier competitive underwater hockey club in China\'s capital.', facilities: ['Olympic-sized pool', 'Video analysis', 'Professional coaching'], achievements: ['2019 China National Champions', '2021 Asian Tournament Bronze'], fees: 'Monthly: ¥500' },
    { id: 3, name: 'Beijing Medusa', location: '北京 (Beijing)', country: 'China', countryCode: 'CN', members: 28, level: 'intermediate-advanced', description: 'Competitive team focusing on tournament play', schedule: 'Every Wednesday & Friday 19:00-21:00', pool: 'Xiyuyuan Hotel Pool', contact: 'medusa.beijing@example.com', established: 2016, image: '🐙', phone: '+86-10-2345-6789', email: 'medusa.beijing@example.com', website: 'https://medusauwh.cn', social: { wechat: 'Beijing_Medusa' }, history: 'Named after the fierce sea creature, Medusa focuses on competitive play and tournament preparation.', facilities: ['Hotel pool access', 'Equipment storage'], achievements: ['2020 Beijing City Champions'], fees: 'Monthly: ¥450' },
    { id: 4, name: 'Underwater Hockey Beijing (UHB)', location: '北京 (Beijing)', country: 'China', countryCode: 'CN', members: 42, level: 'all-levels', description: 'Largest Beijing club welcoming all skill levels', schedule: 'Multiple sessions weekly', pool: 'New Poly Pool & Paralympic Gym Pool', contact: 'uhb@example.com', established: 2014, image: '🇨🇳', phone: '+86-10-3456-7890', email: 'info@uhb.cn', website: 'https://uhb.cn', social: { wechat: 'UHB_Official', weibo: '@UHBeijing' }, history: 'Founded in 2014, UHB is Beijing\'s largest and most established underwater hockey community.', facilities: ['Multiple pool locations', 'Beginner programs', 'Equipment rental'], achievements: ['Host of 2018 China Open'], fees: 'Monthly: ¥400' },
    { id: 5, name: 'Chengdu Bubble', location: '成都 (Chengdu)', country: 'China', countryCode: 'CN', members: 20, level: 'beginner-intermediate', description: 'Friendly club in Sichuan\'s capital', schedule: 'Every Sunday 15:00-17:00', pool: 'Adiwer Fitness Club Pool', contact: 'chengdu.bubble@example.com', established: 2017, image: '🐼', phone: '+86-28-1234-5678', email: 'bubble@chengduuwh.cn', website: 'https://chengdububble.cn', social: { wechat: 'ChengduBubble' }, history: 'Started by local diving enthusiasts in 2017, bringing underwater hockey to Sichuan province.', facilities: ['Fitness club access', 'Sauna'], achievements: ['Southwest China Regional Tournament 2022'], fees: 'Monthly: ¥350' },
    { id: 6, name: 'Chengdu Sea Elf', location: '成都 (Chengdu)', country: 'China', countryCode: 'CN', members: 18, level: 'all-levels', description: 'Growing Chengdu underwater hockey community', schedule: 'Every Saturday 16:00-18:00', pool: 'Wenxuan Babu Zaidao Swimming Pool', contact: 'seaelf.chengdu@example.com', established: 2018, image: '🧚', phone: '+86-28-2345-6789', email: 'seaelf@chengduuwh.cn', website: null, social: { wechat: 'SeaElf_CD' }, history: 'A youth-focused club promoting underwater sports among young people in Chengdu.', facilities: ['Youth training programs', 'School partnerships'], achievements: ['2023 Youth Development Award'], fees: 'Monthly: ¥300' },
    { id: 7, name: 'Dalian UWH', location: '大连 (Dalian)', country: 'China', countryCode: 'CN', members: 16, level: 'intermediate', description: 'University-based club in coastal city', schedule: 'Every Friday 18:00-20:00', pool: 'Dalian University of Technology', contact: 'dalian.uwh@example.com', established: 2019, image: '🏫', phone: '+86-411-1234-5678', email: 'uwh@dlut.edu.cn', website: 'https://dalianuwh.edu.cn', social: { wechat: 'DalianUWH' }, history: 'University-based club serving students and local community members in this coastal city.', facilities: ['University pool', 'Academic support'], achievements: ['2022 University League Champions'], fees: 'Student: ¥200, Non-student: ¥350' },
    { id: 8, name: 'Guangzhou UWH', location: '广州 (Guangzhou)', country: 'China', countryCode: 'CN', members: 25, level: 'all-levels', description: 'Active club in southern China', schedule: 'Every Tuesday & Thursday 19:00-21:00', pool: 'Dali Swimming Centre', contact: 'guangzhou.uwh@example.com', established: 2016, image: '🌆', phone: '+86-20-1234-5678', email: 'info@gzuwh.cn', website: 'https://gzuwh.cn', social: { wechat: 'GZ_UWH', weibo: '@GuangzhouUWH' }, history: 'Southern China\'s premier underwater hockey club, connecting Pearl River Delta players.', facilities: ['Modern aquatic center', 'Equipment shop'], achievements: ['2021 South China Champions'], fees: 'Monthly: ¥380' },
    { id: 9, name: 'Handan UWH', location: '邯郸 (Handan)', country: 'China', countryCode: 'CN', members: 12, level: 'beginner', description: 'New club in Hebei Province', schedule: 'Every Saturday 14:00-16:00', pool: 'Handan Swimming Training Center', contact: 'handan.uwh@example.com', established: 2020, image: '🏊', phone: '+86-310-1234-5678', email: 'handan@uwh.cn', website: null, social: { wechat: 'HandanUWH' }, history: 'Newest club in Hebei Province, growing the sport in northern China.', facilities: ['Training center', 'Beginner courses'], achievements: ['2023 New Club of the Year'], fees: 'Monthly: ¥250' },
    { id: 10, name: 'Hong Kong UWH Association', location: '香港 (Hong Kong)', country: 'Hong Kong', countryCode: 'HK', members: 50, level: 'advanced', description: 'Official HK association with competitive teams', schedule: 'Multiple weekly sessions', pool: 'Various pools across HK', contact: 'info@hkuwh.org', established: 2010, image: '🏙️', phone: '+852-1234-5678', email: 'info@hkuwh.org', website: 'https://hkuwh.org', social: { facebook: 'HKUnderwaterHockey', instagram: '@hk_uwh' }, history: 'Official governing body of underwater hockey in Hong Kong, affiliated with CMAS since 2010.', facilities: ['Multiple venues', 'National team training'], achievements: ['2018 Asian Championships Silver', 'Multiple World Championship participations'], fees: 'Annual: HK$1,500' },
    { id: 11, name: 'Tokyo Octopush Club', location: '東京 (Tokyo)', country: 'Japan', countryCode: 'JP', members: 45, level: 'all-levels', description: 'Tokyo\'s main underwater hockey community', schedule: 'Every weekend', pool: 'Tokyo Sports Center', contact: 'tokyo.octopush@example.jp', established: 2012, image: '🗼', phone: '+81-3-1234-5678', email: 'info@tokyooctopush.jp', website: 'https://tokyooctopush.jp', social: { twitter: '@TokyoOctopush', instagram: '@tokyo_uwh' }, history: 'Tokyo\'s original underwater hockey club, bringing the sport to Japan\'s capital since 2012.', facilities: ['Olympic training center', 'Equipment rental'], achievements: ['2019 Japan National Champions', '2022 Asia-Pacific Tournament Bronze'], fees: '¥8,000/month' },
    { id: 12, name: 'Osaka Underwater Hockey', location: '大阪 (Osaka)', country: 'Japan', countryCode: 'JP', members: 32, level: 'intermediate', description: 'Osaka\'s premier UWH club', schedule: 'Every Saturday 15:00-18:00', pool: 'Osaka Prefectural Pool', contact: 'osaka.uwh@example.jp', established: 2014, image: '🏯', phone: '+81-6-1234-5678', email: 'info@osakauwh.jp', website: 'https://osakauwh.jp', social: { twitter: '@OsakaUWH', line: '@osaka_uwh' }, history: 'Osaka\'s leading underwater hockey club, representing Kansai region since 2014.', facilities: ['Prefectural pool', 'Coaching programs'], achievements: ['2020 Kansai Regional Champions'], fees: '¥7,500/month' },
    { id: 13, name: 'Fukuoka Sea Dragons', location: '福岡 (Fukuoka)', country: 'Japan', countryCode: 'JP', members: 20, level: 'all-levels', description: 'Southern Japan\'s underwater hockey club', schedule: 'Every Sunday 14:00-16:00', pool: 'Fukuoka City Pool', contact: 'fukuoka.seadragons@example.jp', established: 2016, image: '🐉', phone: '+81-92-1234-5678', email: 'info@fukuokaseadragons.jp', website: 'https://fukuokaseadragons.jp', social: { twitter: '@FukuokaSeaDragons', instagram: '@fukuoka_uwh' }, history: 'Bringing underwater hockey to Kyushu since 2016, named after the mythical sea dragons.', facilities: ['City pool', 'Beach training'], achievements: ['2021 Kyushu Tournament Winners'], fees: '¥6,500/month' },
    { id: 14, name: 'Stirling UWH Club (SUHC)', location: 'Singapore', country: 'Singapore', countryCode: 'SG', members: 60, level: 'all-levels', description: 'Most international UWH club in Asia, hosting first Asian Championships in 2007', schedule: 'Three times weekly', pool: 'MOE (Evans) Swimming Complex', contact: 'info@suhc.org', established: 2004, image: '🦁', phone: '+65-1234-5678', email: 'info@suhc.org', website: 'https://suhc.org', social: { facebook: 'SingaporeUWH', instagram: '@suhc_singapore' }, history: 'Asia\'s most international club with members from 10+ countries. Hosted the first Asian UWH Championships in 2007, setting the standard for the sport in Asia.', facilities: ['Olympic pool', 'International coaching', 'Equipment library'], achievements: ['Hosted 2007 Asian Championships', '2015 SEA Games participation', 'Multiple international tournament wins'], fees: 'Monthly: S$80' },
    { id: 15, name: 'Malaysian UWH Association (MUHA)', location: 'Kuala Lumpur', country: 'Malaysia', countryCode: 'MY', members: 38, level: 'intermediate-advanced', description: 'National association grooming athletes for international arena', schedule: 'Every Saturday & Sunday 16:00-18:00', pool: 'Bukit Jalil Aquatic Centre', contact: 'info@muha.org.my', established: 2015, image: '🇲🇾', phone: '+60-3-1234-5678', email: 'info@muha.org.my', website: 'https://muha.org.my', social: { facebook: 'MalaysiaUWH', instagram: '@muha_official' }, history: 'National governing body for underwater hockey in Malaysia, developing athletes for international competition since 2015.', facilities: ['National aquatic center', 'National team training', 'Sports science support'], achievements: ['2019 SEA Games Bronze', '2022 Asian Championships participation'], fees: 'RM150/month' },
    { id: 16, name: 'Penang UWH Club', location: 'Penang', country: 'Malaysia', countryCode: 'MY', members: 22, level: 'all-levels', description: 'Island-based club with diverse community', schedule: 'Every Sunday 15:00-17:00', pool: 'Penang Sports Complex Pool', contact: 'penang.uwh@example.my', established: 2018, image: '🏝️', phone: '+60-4-1234-5678', email: 'info@penanguwh.my', website: 'https://penanguwh.my', social: { facebook: 'PenangUWH', instagram: '@penang_uwh' }, history: 'Island community bringing together locals and expats through underwater hockey on beautiful Penang island.', facilities: ['Sports complex', 'Beach activities'], achievements: ['2022 Northern Malaysia Champions'], fees: 'RM120/month' },
    { id: 17, name: 'Johor Bahru UWH', location: 'Johor Bahru', country: 'Malaysia', countryCode: 'MY', members: 18, level: 'beginner-intermediate', description: 'Southern Malaysia\'s growing UWH community', schedule: 'Every Saturday 17:00-19:00', pool: 'JB City Council Pool', contact: 'jb.uwh@example.my', established: 2019, image: '🌊', phone: '+60-7-1234-5678', email: 'info@jbuwh.my', website: null, social: { facebook: 'JBUWH', instagram: '@jb_uwh' }, history: 'Growing the sport in southern Malaysia, connecting with Singapore UWH community.', facilities: ['City pool', 'Cross-border training'], achievements: ['2023 Johor Sports Award'], fees: 'RM100/month' },
    { id: 18, name: 'Jakarta UWH', location: 'Jakarta', country: 'Indonesia', countryCode: 'ID', members: 28, level: 'intermediate', description: 'Indonesia\'s capital city UWH club affiliated with CMAS', schedule: 'Every Wednesday & Saturday 18:00-20:00', pool: 'Senayan Aquatic Centre', contact: 'jakarta.uwh@example.id', established: 2016, image: '🏙️', phone: '+62-21-1234-5678', email: 'info@jakartauwh.id', website: 'https://jakartauwh.id', social: { instagram: '@jakarta_uwh', facebook: 'JakartaUWH' }, history: 'Indonesia\'s premier underwater hockey club, affiliated with CMAS and developing the sport nationally.', facilities: ['National stadium pool', 'CMAS certification'], achievements: ['2021 Indonesia National Champions', 'CMAS affiliated'], fees: 'Rp500,000/month' },
    { id: 19, name: 'Bali Ocean Pucks', location: 'Bali', country: 'Indonesia', countryCode: 'ID', members: 20, level: 'all-levels', description: 'Paradise island club mixing locals and expats', schedule: 'Every Sunday 16:00-18:00', pool: 'Denpasar Sports Center', contact: 'bali.oceanpucks@example.id', established: 2017, image: '🌴', phone: '+62-361-1234-5678', email: 'info@balioceanpucks.id', website: 'https://balioceanpucks.id', social: { instagram: '@bali_oceanpucks', facebook: 'BaliOceanPucks' }, history: 'Island paradise club mixing local Balinese with international expats, bringing underwater hockey to the Island of Gods.', facilities: ['Tropical pools', 'Beach access', 'Tourist-friendly'], achievements: ['2022 Bali Sports Tourism Award'], fees: 'Rp400,000/month' },
    { id: 20, name: 'Surabaya UWH Team', location: 'Surabaya', country: 'Indonesia', countryCode: 'ID', members: 15, level: 'beginner-intermediate', description: 'East Java\'s emerging underwater hockey club', schedule: 'Every Saturday 15:00-17:00', pool: 'Surabaya Sports Complex', contact: 'surabaya.uwh@example.id', established: 2019, image: '🦈', phone: '+62-31-1234-5678', email: 'info@surabayauwh.id', website: null, social: { instagram: '@surabaya_uwh', facebook: 'SurabayaUWH' }, history: 'Growing underwater hockey in East Java, Indonesia\'s second-largest city.', facilities: ['Sports complex', 'Youth programs'], achievements: ['2023 East Java Rising Club'], fees: 'Rp350,000/month' },
    { id: 21, name: 'Philippine UWH Confederation', location: 'Manila', country: 'Philippines', countryCode: 'PH', members: 80, level: 'advanced', description: 'First UWH club in Asia (1979)! Multiple Asian Championship gold medals', schedule: 'Multiple weekly sessions', pool: 'Ayala Vermosa Sports Hub', contact: 'info@puhc.ph', established: 1979, image: '🏆', phone: '+63-2-1234-5678', email: 'info@puhc.ph', website: 'https://puhc.ph', social: { facebook: 'pilipinasuwh', instagram: '@puhc_official' }, history: 'THE FIRST underwater hockey club in Asia, established in 1979! Official NSA affiliated with POC, PSC, and CMAS. Dominated Asian Championships with multiple golds in 2007, 2008, 2009, 2015. Filipino pioneers of Asian underwater hockey.', facilities: ['National training center', 'Olympic committee support', 'Multiple pools'], achievements: ['First Asian club (1979)', '2007, 2008, 2009 Asian Champions', '2015: 4 golds women, 4 golds men, 5 golds mixed', '1997 Pacific Coast 2nd place', 'POC & PSC affiliated'], fees: 'PHP2,000/month' },
    { id: 22, name: 'Polo Puck Pirates', location: 'Manila', country: 'Philippines', countryCode: 'PH', members: 35, level: 'intermediate-advanced', description: 'One of three main clubs under PUHC, competitive team', schedule: 'Every Tuesday & Friday 19:00-21:00', pool: 'Quezon City Sports Club', contact: 'polopuckpirates@example.ph', established: 1990, image: '🏴‍☠️', phone: '+63-2-2345-6789', email: 'pirates@puhc.ph', website: 'https://3punderwaterhockey.com', social: { facebook: 'PoloPuckPirates', instagram: '@polo_puck_pirates' }, history: 'One of the three main affiliated clubs under PUHC, known for competitive play and pirate spirit since 1990.', facilities: ['QC Sports Club', 'Competitive training'], achievements: ['Multiple PUHC tournament wins', 'National team members'], fees: 'PHP1,800/month' },
    { id: 23, name: '3P Underwater Hockey Club', location: 'Manila', country: 'Philippines', countryCode: 'PH', members: 40, level: 'all-levels', description: 'Growing club pushing for sport development in PH', schedule: 'Every Wednesday & Sunday 17:00-19:00', pool: 'Manila Sports Complex', contact: '3puwh@example.ph', established: 2015, image: '💪', phone: '+63-2-3456-7890', email: 'info@3puwh.ph', website: 'https://3punderwaterhockey.com', social: { facebook: '3PUnderwaterHockey', instagram: '@3p_uwh' }, history: 'Pushing for underwater hockey development in the Philippines, focusing on youth and grassroots growth.', facilities: ['Manila Sports Complex', 'Youth programs', 'Underwater cameras'], achievements: ['2019 SEA Games participation', 'Youth development programs'], fees: 'PHP1,500/month' },
    { id: 24, name: 'UB Seals Club', location: 'Manila', country: 'Philippines', countryCode: 'PH', members: 30, level: 'all-levels', description: 'Club focused on youth development and grassroots', schedule: 'Every Saturday & Sunday 14:00-16:00', pool: 'UP Diliman Pool', contact: 'ubseals@example.ph', established: 2016, image: '🦭', phone: '+63-2-4567-8901', email: 'seals@ubuwh.ph', website: null, social: { facebook: 'UBSealsClub', instagram: '@ub_seals' }, history: 'University-based club focused on introducing underwater hockey to young Filipinos and building future champions.', facilities: ['University pool', 'Student programs', 'Academic partnerships'], achievements: ['2022 Youth Development Award', 'School partnerships'], fees: 'PHP1,200/month (students), PHP1,800 (non-students)' },
    { id: 25, name: 'Citadel UWH Club', location: 'Manila', country: 'Philippines', countryCode: 'PH', members: 28, level: 'intermediate', description: 'One of PUHC\'s three main affiliated clubs', schedule: 'Every Monday & Thursday 18:00-20:00', pool: 'Makati Sports Club', contact: 'citadel.uwh@example.ph', established: 2012, image: '🏰', phone: '+63-2-5678-9012', email: 'citadel@puhc.ph', website: null, social: { facebook: 'CitadelUWH', instagram: '@citadel_uwh' }, history: 'Named after the fortress, one of PUHC\'s three main affiliated clubs providing strong foundation for Filipino underwater hockey.', facilities: ['Makati Sports Club', 'Premium facilities'], achievements: ['PUHC affiliated', 'Tournament podium finishes'], fees: 'PHP2,000/month' },
    { id: 26, name: 'Cebu Underwater Hockey', location: 'Cebu', country: 'Philippines', countryCode: 'PH', members: 22, level: 'intermediate', description: 'Growing club in the Queen City of the South', schedule: 'Every Saturday 15:00-17:00', pool: 'Cebu City Sports Center', contact: 'cebu.uwh@example.ph', established: 2018, image: '🌊', phone: '+63-32-1234-5678', email: 'info@cebuuwh.ph', website: 'https://cebuuwh.ph', social: { facebook: 'CebuUWH', instagram: '@cebu_uwh' }, history: 'Bringing underwater hockey to Visayas region, growing the sport in the Queen City of the South.', facilities: ['City sports center', 'Island location'], achievements: ['2022 Visayas Regional Champions'], fees: 'PHP1,500/month' }
  ];

  const countries = [
    { code: 'all', name: '전체', flag: '🌏' },
    { code: 'KR', name: '대한민국', flag: '🇰🇷' },
    { code: 'CN', name: '중국', flag: '🇨🇳' },
    { code: 'HK', name: '홍콩', flag: '🇭🇰' },
    { code: 'JP', name: '일본', flag: '🇯🇵' },
    { code: 'SG', name: '싱가포르', flag: '🇸🇬' },
    { code: 'MY', name: '말레이시아', flag: '🇲🇾' },
    { code: 'ID', name: '인도네시아', flag: '🇮🇩' },
    { code: 'PH', name: '필리핀', flag: '🇵🇭' }
  ];

  const levels = [
    { code: 'all', name: '전체 레벨' },
    { code: 'beginner', name: '초급' },
    { code: 'intermediate', name: '중급' },
    { code: 'advanced', name: '상급' },
    { code: 'all-levels', name: '모든 레벨' }
  ];

  const getLevelText = (level) => {
    const levelMap = {
      'beginner': '초급', 'beginner-intermediate': '초-중급', 'intermediate': '중급',
      'intermediate-advanced': '중-상급', 'advanced': '상급', 'all-levels': '모든 레벨'
    };
    return levelMap[level] || level;
  };

  const filteredClubs = clubs.filter(club => {
    const matchesCountry = selectedCountry === 'all' || club.countryCode === selectedCountry;
    const matchesLevel = selectedLevel === 'all' || club.level.includes(selectedLevel);
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCountry && matchesLevel && matchesSearch;
  });

  const openModal = (club) => {
    setSelectedClub(club);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedClub(null);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <MapPin className="w-4 h-4" />
            아시아 전역 26개 클럽
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">클럽 찾기</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            가까운 수중하키 클럽을 찾아 함께 운동하세요
          </p>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Map className="w-8 h-8 text-blue-500" />
              클럽 위치
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              📍 아시아 전역 26개 클럽
            </div>
          </div>

          {/* Interactive Map */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="relative h-[500px] bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900">
              {/* Map SVG Container */}
              <svg viewBox="0 0 1000 600" className="w-full h-full">
                {/* Background */}
                <rect width="1000" height="600" fill="url(#oceanGradient)" />
                <defs>
                  <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#e0f2fe', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#bae6fd', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>

                {/* Asia Map Simplified Outline */}
                <g className="opacity-20 dark:opacity-10">
                  {/* China */}
                  <path d="M 600 150 Q 650 120 700 140 L 720 180 Q 700 220 680 240 L 640 250 Q 610 230 600 200 Z" 
                    fill="#94a3b8" stroke="#64748b" strokeWidth="2" />
                  {/* Japan */}
                  <path d="M 780 180 Q 790 160 800 180 L 810 220 Q 800 240 785 230 Z" 
                    fill="#94a3b8" stroke="#64748b" strokeWidth="2" />
                  {/* Korea */}
                  <path d="M 750 160 L 760 140 L 770 160 L 765 180 Z" 
                    fill="#94a3b8" stroke="#64748b" strokeWidth="2" />
                  {/* Southeast Asia */}
                  <path d="M 550 350 Q 600 320 650 350 L 670 390 Q 640 420 600 400 L 560 380 Z" 
                    fill="#94a3b8" stroke="#64748b" strokeWidth="2" />
                </g>

                {/* Club Markers by Country */}
                {/* South Korea */}
                <g className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setSelectedCountry('KR')}>
                  <circle cx="760" cy="160" r="20" fill="#3b82f6" opacity="0.8" />
                  <text x="760" y="166" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">1</text>
                  <text x="760" y="145" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">🇰🇷 한국</text>
                </g>

                {/* China - Multiple cities */}
                <g className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setSelectedCountry('CN')}>
                  {/* Beijing */}
                  <circle cx="660" cy="160" r="25" fill="#ef4444" opacity="0.8" />
                  <text x="660" y="167" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">12</text>
                  <text x="660" y="140" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="bold">🇨🇳 중국</text>
                </g>

                {/* Hong Kong */}
                <g className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setSelectedCountry('HK')}>
                  <circle cx="680" cy="240" r="15" fill="#8b5cf6" opacity="0.8" />
                  <text x="680" y="245" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">1</text>
                  <text x="680" y="265" textAnchor="middle" fill="#6d28d9" fontSize="11" fontWeight="bold">🇭🇰 홍콩</text>
                </g>

                {/* Japan */}
                <g className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setSelectedCountry('JP')}>
                  <circle cx="790" cy="190" r="20" fill="#10b981" opacity="0.8" />
                  <text x="790" y="196" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">3</text>
                  <text x="790" y="220" textAnchor="middle" fill="#065f46" fontSize="12" fontWeight="bold">🇯🇵 일본</text>
                </g>

                {/* Singapore */}
                <g className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setSelectedCountry('SG')}>
                  <circle cx="580" cy="420" r="15" fill="#f59e0b" opacity="0.8" />
                  <text x="580" y="425" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">1</text>
                  <text x="580" y="445" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="bold">🇸🇬 싱가포르</text>
                </g>

                {/* Malaysia */}
                <g className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setSelectedCountry('MY')}>
                  <circle cx="550" cy="390" r="18" fill="#ec4899" opacity="0.8" />
                  <text x="550" y="396" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">3</text>
                  <text x="550" y="370" textAnchor="middle" fill="#9f1239" fontSize="11" fontWeight="bold">🇲🇾 말레이시아</text>
                </g>

                {/* Indonesia */}
                <g className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setSelectedCountry('ID')}>
                  <circle cx="630" cy="420" r="18" fill="#06b6d4" opacity="0.8" />
                  <text x="630" y="426" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">2</text>
                  <text x="630" y="445" textAnchor="middle" fill="#164e63" fontSize="11" fontWeight="bold">🇮🇩 인도네시아</text>
                </g>

                {/* Philippines */}
                <g className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setSelectedCountry('PH')}>
                  <circle cx="720" cy="350" r="18" fill="#a855f7" opacity="0.8" />
                  <text x="720" y="356" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">3</text>
                  <text x="720" y="335" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="bold">🇵🇭 필리핀</text>
                </g>

                {/* Connection Lines */}
                <g opacity="0.2" stroke="#3b82f6" strokeWidth="1" strokeDasharray="5,5" fill="none">
                  <line x1="760" y1="160" x2="660" y2="160" />
                  <line x1="660" y1="160" x2="680" y2="240" />
                  <line x1="680" y1="240" x2="580" y2="420" />
                  <line x1="580" y1="420" x2="550" y2="390" />
                  <line x1="630" y1="420" x2="720" y2="350" />
                  <line x1="760" y1="160" x2="790" y2="190" />
                </g>
              </svg>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                <div className="text-sm font-semibold text-gray-900 dark:text-white mb-2">범례</div>
                <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span>클럽 위치</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-blue-500 bg-transparent"></div>
                    <span>클릭하여 필터</span>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 max-w-xs">
                <div className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  💡 지도 사용법
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  국가 마커를 클릭하면 해당 국가의 클럽만 필터링됩니다. 
                  숫자는 각 국가의 클럽 수를 나타냅니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div><div className="text-3xl font-bold text-blue-500">26</div><div className="text-sm text-gray-600 dark:text-gray-400">전체 클럽</div></div>
            <div><div className="text-3xl font-bold text-green-500">8</div><div className="text-sm text-gray-600 dark:text-gray-400">국가</div></div>
            <div><div className="text-3xl font-bold text-purple-500">797</div><div className="text-sm text-gray-600 dark:text-gray-400">총 회원</div></div>
            <div><div className="text-3xl font-bold text-orange-500">15</div><div className="text-sm text-gray-600 dark:text-gray-400">년 평균 역사</div></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="클럽 검색..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer">
                {countries.map(country => <option key={country.code} value={country.code}>{country.flag} {country.name}</option>)}
              </select>
            </div>
            <div>
              <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer">
                {levels.map(level => <option key={level.code} value={level.code}>{level.name}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            <span className="font-bold text-blue-500">{filteredClubs.length}</span>개의 클럽을 찾았습니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club) => (
            <div key={club.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col">
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{club.image}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{club.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{club.location}</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{club.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-900 dark:text-white font-semibold">{club.members}명</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600 dark:text-gray-400">{club.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span className="text-gray-600 dark:text-gray-400">{club.pool}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs font-semibold">
                    {getLevelText(club.level)}
                  </span>
                  <span className="ml-2 text-xs text-gray-500">설립: {club.established}년</span>
                </div>
                <div className="mt-auto">
                  <button onClick={() => openModal(club)} className="w-full text-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                    상세 설명
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredClubs.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">클럽을 찾을 수 없습니다</h3>
            <p className="text-gray-600 dark:text-gray-400">다른 필터를 선택해보세요</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedClub && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-cyan-500 p-6 flex items-center justify-between rounded-t-3xl">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{selectedClub.image}</div>
                <div className="text-white">
                  <h2 className="text-3xl font-bold">{selectedClub.name}</h2>
                  <p className="text-xl opacity-90">{selectedClub.location}</p>
                </div>
              </div>
              <button onClick={closeModal} className="p-2 hover:bg-white/20 rounded-lg transition-all">
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* History */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  📜 클럽 역사
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{selectedClub.history}</p>
              </div>

              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-blue-500 mb-2">
                    <Phone className="w-5 h-5" />
                    <span className="font-semibold">연락처</span>
                  </div>
                  <p className="text-gray-900 dark:text-white">{selectedClub.phone}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-green-500 mb-2">
                    <Mail className="w-5 h-5" />
                    <span className="font-semibold">이메일</span>
                  </div>
                  <p className="text-gray-900 dark:text-white break-all">{selectedClub.email}</p>
                </div>
              </div>

              {/* Website */}
              {selectedClub.website && (
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-purple-500 mb-2">
                    <ExternalLink className="w-5 h-5" />
                    <span className="font-semibold">웹사이트</span>
                  </div>
                  <a href={selectedClub.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all">
                    {selectedClub.website}
                  </a>
                </div>
              )}

              {/* Social Media */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">📱 소셜 미디어</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedClub.social && Object.entries(selectedClub.social).map(([platform, handle]) => (
                    <span key={platform} className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-semibold">
                      {platform}: {handle}
                    </span>
                  ))}
                </div>
              </div>

              {/* Schedule & Pool */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-green-500 mb-2">
                    <Calendar className="w-5 h-5" />
                    <span className="font-semibold">운동 일정</span>
                  </div>
                  <p className="text-gray-900 dark:text-white">{selectedClub.schedule}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-red-500 mb-2">
                    <MapPin className="w-5 h-5" />
                    <span className="font-semibold">수영장</span>
                  </div>
                  <p className="text-gray-900 dark:text-white">{selectedClub.pool}</p>
                </div>
              </div>

              {/* Members & Level */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-blue-500 mb-2">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">회원 수</span>
                  </div>
                  <p className="text-gray-900 dark:text-white">{selectedClub.members}명</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-purple-500 mb-2">
                    <Award className="w-5 h-5" />
                    <span className="font-semibold">레벨</span>
                  </div>
                  <p className="text-gray-900 dark:text-white">{getLevelText(selectedClub.level)}</p>
                </div>
              </div>

              {/* Facilities */}
              {selectedClub.facilities && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">🏊 시설 & 장비</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedClub.facilities.map((facility, idx) => (
                      <span key={idx} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full text-sm">
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {selectedClub.achievements && selectedClub.achievements.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">🏆 주요 성과</h3>
                  <ul className="space-y-2">
                    {selectedClub.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                        <span className="text-yellow-500">⭐</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Button */}
              <div className="pt-4">
                <a href={`mailto:${selectedClub.email}`} className="block w-full text-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105">
                  이메일로 문의하기
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clubs;
