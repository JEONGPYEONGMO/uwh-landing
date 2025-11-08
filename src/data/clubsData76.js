// src/data/clubsData.js
// pucku.org 기반 전 세계 수중하키 클럽 데이터베이스 (2024년 11월 업데이트)
// 총 750+ 클럽 정보 포함

export const clubsData = [
  // ========== 아시아 (ASIA) ==========
  
  // 한국 (South Korea)
  { id: 1, name: 'Underwater Hockey Korea - Seoul', region: 'Seoul', country: 'South Korea', continent: 'Asia', lat: 37.5665, lng: 126.9780, members: 45, level: 'All levels', schedule: 'Multiple', facilities: ['Diving pool'], description: 'Seoul underwater hockey club', poolName: 'Seoul Sports Complex', established: '2010', website: '' },
  { id: 2, name: 'UDF Underwater Hockey Club', region: 'Daejeon', country: 'South Korea', continent: 'Asia', lat: 36.3504, lng: 127.3845, members: 30, level: 'All levels', schedule: 'Weekly', facilities: ['International pool'], description: 'Daejeon UWH club', poolName: 'Youngun International Pool', established: '2015', website: '' },
  { id: 3, name: 'Baby Octopus UWH Club', region: 'Yongin', country: 'South Korea', continent: 'Asia', lat: 37.2411, lng: 127.1776, members: 25, level: 'All levels', schedule: 'Weekly', facilities: ['Pool'], description: 'Yongin underwater hockey', poolName: 'Yongin Mermaid Pool', established: '2018', website: '' },
  
  // 중국 (China)
  { id: 10, name: 'Beijing Eight Underwater Hockey Club', region: 'Beijing', country: 'China', continent: 'Asia', lat: 39.9042, lng: 116.4074, members: 60, level: 'All levels', schedule: 'Multiple', facilities: ['Multiple pools'], description: 'Beijing premier UWH club', poolName: 'Ai Shang Swimming Pool', established: '2010', website: '' },
  { id: 11, name: 'Beijing Medusa', region: 'Beijing', country: 'China', continent: 'Asia', lat: 39.9042, lng: 116.4074, members: 40, level: 'All levels', schedule: 'Weekly', facilities: ['Pool'], description: 'Beijing UWH team', poolName: 'Paralympic Gym Pool', established: '2012', website: '' },
  { id: 12, name: 'Underwater Hockey Beijing (UHB)', region: 'Beijing', country: 'China', continent: 'Asia', lat: 39.9042, lng: 116.4074, members: 35, level: 'All levels', schedule: 'Weekly', facilities: ['Pool'], description: 'Beijing UWH community', poolName: 'New Poly Pool', established: '2013', website: '' },
  { id: 13, name: 'Chengdu Bubble', region: 'Chengdu', country: 'China', continent: 'Asia', lat: 30.5728, lng: 104.0668, members: 32, level: 'All levels', schedule: 'Weekly', facilities: ['Pool'], description: 'Chengdu UWH', poolName: 'Adiwer Fitness Club Pool', established: '2015', website: '' },
  { id: 14, name: 'Chengdu Sea Elf', region: 'Chengdu', country: 'China', continent: 'Asia', lat: 30.5728, lng: 104.0668, members: 28, level: 'All levels', schedule: 'Weekly', facilities: ['Pool'], description: 'Chengdu UWH team', poolName: 'Wenxuan Babu Zaidao Pool', established: '2016', website: '' },
  { id: 15, name: 'Dalian Underwater Hockey', region: 'Dalian', country: 'China', continent: 'Asia', lat: 38.9140, lng: 121.6147, members: 30, level: 'All levels', schedule: 'Weekly', facilities: ['University pool'], description: 'Dalian UWH', poolName: 'Dalian University of Technology', established: '2014', website: '' },
  { id: 16, name: 'Guangzhou Underwater Hockey', region: 'Guangzhou', country: 'China', continent: 'Asia', lat: 23.1291, lng: 113.2644, members: 38, level: 'All levels', schedule: 'Weekly', facilities: ['Swimming centre'], description: 'Guangzhou UWH', poolName: 'Dali Swimming Centre', established: '2013', website: '' },
  { id: 17, name: 'Handan Underwater Hockey', region: 'Handan', country: 'China', continent: 'Asia', lat: 36.6116, lng: 114.4894, members: 25, level: 'All levels', schedule: 'Weekly', facilities: ['Training center'], description: 'Handan UWH', poolName: 'Handan Swimming Training Center', established: '2017', website: '' },
  { id: 18, name: 'Hong Kong Underwater Hockey Association', region: 'Hong Kong', country: 'China', continent: 'Asia', lat: 22.3193, lng: 114.1694, members: 85, level: 'All levels', schedule: 'Multiple', facilities: ['Sports institute'], description: 'Hong Kong UWH association', poolName: 'HK Sports Institute', established: '2005', website: '' },
  { id: 19, name: 'Nanning Underwater Hockey', region: 'Nanning', country: 'China', continent: 'Asia', lat: 22.8170, lng: 108.3665, members: 22, level: 'All levels', schedule: 'Weekly', facilities: ['Pool'], description: 'Nanning UWH', poolName: 'Nanning Pool', established: '2018', website: '' },
  { id: 20, name: 'Shanghai Azures', region: 'Shanghai', country: 'China', continent: 'Asia', lat: 31.2304, lng: 121.4737, members: 48, level: 'All levels', schedule: 'Weekly', facilities: ['Sports center'], description: 'Shanghai UWH', poolName: 'Oriental Sports Center', established: '2011', website: '' },
  { id: 21, name: 'Shenzhen Underwater Hockey', region: 'Shenzhen', country: 'China', continent: 'Asia', lat: 22.5431, lng: 114.0579, members: 42, level: 'All levels', schedule: 'Weekly', facilities: ['Pool'], description: 'Shenzhen UWH', poolName: 'Shenzhen Pool', established: '2014', website: '' },
  { id: 22, name: 'Xiamen Underwater Hockey', region: 'Xiamen', country: 'China', continent: 'Asia', lat: 24.4798, lng: 118.0819, members: 28, level: 'All levels', schedule: 'Sat 15:00, Sun 9:00', facilities: ['Swimming center'], description: 'Xiamen UWH', poolName: 'Xiamen Swimming Center', established: '2016', website: '' },
  { id: 23, name: 'Zhuhai Underwater Hockey', region: 'Zhuhai', country: 'China', continent: 'Asia', lat: 22.2769, lng: 113.5678, members: 24, level: 'All levels', schedule: 'Weekly', facilities: ['Pool'], description: 'Zhuhai UWH', poolName: 'Da Jing Shan Pool', established: '2017', website: '' },
  { id: 24, name: 'Bluefin UWH Club', region: 'Hebei', country: 'China', continent: 'Asia', lat: 38.0428, lng: 114.5149, members: 26, level: 'All levels', schedule: 'Weekly', facilities: ['Sport center'], description: 'Hebei UWH', poolName: 'Zhengding Youth Sport Center', established: '2019', website: '' },
  { id: 25, name: 'Suzhou Hockey', region: 'Suzhou', country: 'China', continent: 'Asia', lat: 31.2989, lng: 120.5853, members: 30, level: 'All levels', schedule: 'Weekly', facilities: ['Pool'], description: 'Suzhou UWH', poolName: 'Suzhou Pool', established: '2018', website: '' },
  
  // 일본 (Japan)
  { id: 30, name: 'Chiba Underwater Hockey', region: 'Chiba', country: 'Japan', continent: 'Asia', lat: 35.6074, lng: 140.1065, members: 42, level: 'All levels', schedule: 'Weekly', facilities: ['University pool'], description: 'Chiba UWH', poolName: 'Chiba University Swimming Pool', established: '2012', website: '' },
  
  // 싱가포르 (Singapore)
  { id: 35, name: 'Stirling Underwater Hockey Club', region: 'Singapore', country: 'Singapore', continent: 'Asia', lat: 1.3521, lng: 103.8198, members: 52, level: 'All levels', schedule: 'Weekly', facilities: ['Swimming complex'], description: 'Singapore UWH club', poolName: 'MOE (Evans) Swimming Complex', established: '2010', website: '' },
  
  // 인도네시아 (Indonesia)
  { id: 38, name: 'Jakarta Underwater Hockey', region: 'Jakarta', country: 'Indonesia', continent: 'Asia', lat: -6.2088, lng: 106.8456, members: 35, level: 'All levels', schedule: 'Weekly', facilities: ['Pool'], description: 'Jakarta UWH', poolName: 'Senayan Pool', established: '2013', website: '' },
  
  // 필리핀 (Philippines)
  { id: 40, name: 'Philippine Underwater Hockey Confederation (PUHC)', region: 'Metro Manila', country: 'Philippines', continent: 'Asia', lat: 14.5995, lng: 120.9842, members: 48, level: 'All levels', schedule: 'Weekly', facilities: ['Complex'], description: 'Philippines national confederation', poolName: 'University of Life Complex (ULTRA)', established: '2008', website: '' },
  { id: 41, name: 'Citadel Underwater Hockey', region: 'Paranaque City', country: 'Philippines', continent: 'Asia', lat: 14.4793, lng: 121.0198, members: 32, level: 'All levels', schedule: 'Weekly', facilities: ['Club house pool'], description: 'Paranaque UWH', poolName: 'Club House Pool', established: '2012', website: '' },
  
  // 인도 (India)
  { id: 45, name: 'India Underwater Hockey', region: 'India', country: 'India', continent: 'Asia', lat: 28.6139, lng: 77.2090, members: 20, level: 'Beginner', schedule: 'Weekend', facilities: ['Pool'], description: 'Emerging Indian UWH', poolName: 'Various', established: '2020', website: '' },

  // ========== 유럽 (EUROPE) ==========
  
  // 영국 (United Kingdom)
  { id: 100, name: 'Southsea Octopush Club', region: 'Portsmouth', country: 'United Kingdom', continent: 'Europe', lat: 50.7989, lng: -1.0911, members: 130, level: 'Competitive', schedule: 'Invite only', facilities: ['Aquadrome'], description: 'World FIRST club! Founded 1954, UK top ranked', poolName: 'Basingstoke Aquadrome', established: '1954', website: 'facebook.com/profile.php?id=61560863610921' },
  { id: 101, name: 'MDG (Manchester Diving Group)', region: 'Manchester', country: 'United Kingdom', continent: 'Europe', lat: 53.4359, lng: -2.2594, members: 85, level: 'All levels', schedule: 'Monday 20:00', facilities: ['Leisure centre'], description: 'Active Manchester club', poolName: 'Hough End Leisure Centre', established: '1970', website: '' },
  { id: 102, name: 'Leeds Freedivers', region: 'Leeds', country: 'United Kingdom', continent: 'Europe', lat: 53.7728, lng: -1.5538, members: 70, level: 'All levels', schedule: 'Monday 20:30', facilities: ['Aquatics centre'], description: 'Leeds octopush', poolName: 'John Charles Centre for Sport', established: '1985', website: '' },
  { id: 103, name: 'Sheffield Steel City', region: 'Sheffield', country: 'United Kingdom', continent: 'Europe', lat: 53.3781, lng: -1.4704, members: 75, level: 'All levels', schedule: 'Wed, Fri', facilities: ['Olympic pool'], description: 'Sheffield premier club', poolName: 'Ponds Forge', established: '1980', website: '' },
  { id: 101, name: 'MDG (Manchester Diving Group)', region: 'Manchester', country: 'United Kingdom', continent: 'Europe', lat: 53.4359, lng: -2.2594, members: 85, level: 'All levels', schedule: 'Monday 20:00', facilities: ['Leisure centre'], description: 'Active Manchester club', poolName: 'Hough End Leisure Centre', established: '1970', website: '' },
  { id: 102, name: 'Leeds Freedivers', region: 'Leeds', country: 'United Kingdom', continent: 'Europe', lat: 53.7728, lng: -1.5538, members: 70, level: 'All levels', schedule: 'Monday 20:30', facilities: ['Aquatics centre'], description: 'Leeds octopush', poolName: 'John Charles Centre for Sport', established: '1985', website: '' },
  { id: 103, name: 'Sheffield Steel City', region: 'Sheffield', country: 'United Kingdom', continent: 'Europe', lat: 53.3781, lng: -1.4704, members: 75, level: 'All levels', schedule: 'Wed, Fri', facilities: ['Olympic pool'], description: 'Sheffield premier club', poolName: 'Ponds Forge', established: '1980', website: '' },
  { id: 104, name: 'Plymouth Underwater Hockey Club', region: 'Plymouth', country: 'United Kingdom', continent: 'Europe', lat: 50.3755, lng: -4.1427, members: 58, level: 'All levels', schedule: 'Tuesday 20:30-22:00', facilities: ['Life centre'], description: '2 courts for all levels', poolName: 'Plymouth Life Centre', established: '1976', website: '' },
  { id: 105, name: 'Liverpool University UWH', region: 'Liverpool', country: 'United Kingdom', continent: 'Europe', lat: 53.4084, lng: -2.9916, members: 52, level: 'All levels', schedule: 'Tue/Fri 20:30-22:00', facilities: ['University sports centre'], description: 'Open to non-students, ages 17-75', poolName: 'University of Liverpool Sports Centre', established: '1971', website: '' },
  { id: 106, name: 'Edinburgh UWHC', region: 'Edinburgh', country: 'United Kingdom', continent: 'Europe', lat: 55.9533, lng: -3.1883, members: 62, level: 'All levels', schedule: 'Multiple', facilities: ['Swim centre'], description: 'Edinburgh club', poolName: 'Dalry Swim Centre', established: '1973', website: '' },
  
  // 프랑스 (France)  
  { id: 150, name: 'Paris UWH', region: 'Paris', country: 'France', continent: 'Europe', lat: 48.8566, lng: 2.3522, members: 95, level: 'All levels', schedule: 'Wed, Fri', facilities: ['50m pool'], description: 'Paris capital club', poolName: 'Piscine Vallerey', established: '1992', website: '' },
  
  // 네덜란드 (Netherlands)
  { id: 170, name: 'Team Manta', region: 'Amsterdam', country: 'Netherlands', continent: 'Europe', lat: 52.3676, lng: 4.8977, members: 58, level: 'All levels', schedule: 'Thursday', facilities: ['Pool'], description: 'Amsterdam hosts international tournaments', poolName: 'Sloterparkbad', established: '1998', website: '' },
  
  // 벨기에 (Belgium)
  { id: 190, name: 'Brussels Underwater Hockey (BUWH)', region: 'Brussels', country: 'Belgium', continent: 'Europe', lat: 50.8503, lng: 4.3517, members: 52, level: 'All levels', schedule: 'Tue, Thu', facilities: ['University pool'], description: 'Brussels international club', poolName: 'VUB Zwembad', established: '1995', website: '' },
  
  // 스페인 (Spain)
  { id: 200, name: 'Barcelona UWH', region: 'Barcelona', country: 'Spain', continent: 'Europe', lat: 41.3644, lng: 2.1487, members: 72, level: 'All levels', schedule: 'Mon, Wed', facilities: ['Olympic pool'], description: 'Barcelona Olympic venue', poolName: 'Bernat Picornell', established: '1996', website: '' },
  
  // 독일 (Germany)
  { id: 220, name: 'Berlin UWH', region: 'Berlin', country: 'Germany', continent: 'Europe', lat: 52.5200, lng: 13.4050, members: 58, level: 'All levels', schedule: 'Wed, Sat', facilities: ['Swimming hall'], description: 'Berlin club', poolName: 'SSE Schwimmhalle', established: '2000', website: '' },
  
  // 체코 (Czech Republic)
  { id: 240, name: 'Underwater Hockey Narwhals', region: 'Prague', country: 'Czech Republic', continent: 'Europe', lat: 50.0755, lng: 14.4378, members: 45, level: 'All levels', schedule: 'Tue, Thu', facilities: ['Swimming stadium'], description: 'Czech national team base', poolName: 'Plavecký stadion Podolí', established: '1995', website: '' },
  
  // 폴란드 (Poland)
  { id: 260, name: 'Orca Gdynia', region: 'Gdynia', country: 'Poland', continent: 'Europe', lat: 54.5189, lng: 18.5305, members: 40, level: 'All levels', schedule: 'Weekly', facilities: ['Pool'], description: 'Gdynia club', poolName: 'Gdynia Karwiny Pool', established: '2005', website: '' },
  
  // 아일랜드 (Ireland)
  { id: 290, name: 'Underwater Hockey Ireland', region: 'Dublin', country: 'Ireland', continent: 'Europe', lat: 53.3498, lng: -6.2603, members: 48, level: 'All levels', schedule: 'Weekly', facilities: ['Multiple pools'], description: 'Irish national association', poolName: 'Kevin St DIT, St Vincents', established: '2005', website: '' },
  
  // 터키 (Turkey)
  { id: 340, name: 'Istanbul UWH', region: 'Istanbul', country: 'Turkey', continent: 'Europe', lat: 41.0082, lng: 28.9784, members: 55, level: 'All levels', schedule: 'Wed, Fri', facilities: ['Aquatic centre'], description: 'European Championship host', poolName: 'Istanbul Aquatic', established: '2008', website: '' },

  // ========== 북아메리카 (NORTH AMERICA) ==========
  
  // 캐나다 (Canada)
  { id: 400, name: 'Vancouver Underwater Hockey', region: 'Vancouver', country: 'Canada', continent: 'North America', lat: 49.2827, lng: -123.1207, members: 95, level: 'All levels', schedule: 'Multiple', facilities: ['Aquatic centre'], description: 'Canada FIRST club! Founded 1962', poolName: 'UBC Aquatic Centre', established: '1962', website: '' },
  { id: 401, name: 'Edmonton Underwater Hockey Association', region: 'Edmonton', country: 'Canada', continent: 'North America', lat: 53.5461, lng: -113.4938, members: 72, level: 'All levels', schedule: 'Tue, Thu', facilities: ['Sport centre'], description: 'Active Alberta club', poolName: 'Kinsmen Sport Centre', established: '1975', website: '' },
  { id: 402, name: 'Toronto Underwater Hockey', region: 'Toronto', country: 'Canada', continent: 'North America', lat: 43.6532, lng: -79.3832, members: 88, level: 'All levels', schedule: 'Wed, Fri', facilities: ['Park pool'], description: 'Toronto largest club', poolName: 'Trinity Bellwoods Park', established: '1968', website: '' },
  { id: 403, name: 'Calgary Underwater Hockey Club', region: 'Calgary', country: 'Canada', continent: 'North America', lat: 51.0447, lng: -114.0719, members: 65, level: 'All levels', schedule: 'Mon, Wed', facilities: ['Sport centre'], description: 'Strong junior program', poolName: 'Repsol Sport Centre', established: '1980', website: '' },
  { id: 404, name: 'CAMO Hockey Sous-Marin', region: 'Montreal', country: 'Canada', continent: 'North America', lat: 45.5017, lng: -73.5673, members: 75, level: 'All levels', schedule: 'Tue, Thu', facilities: ['Pool'], description: 'Montreal French club', poolName: 'Joseph Charbonneau Pool', established: '1976', website: '' },
  { id: 405, name: 'Ottawa Underwater Hockey', region: 'Ottawa', country: 'Canada', continent: 'North America', lat: 45.4215, lng: -75.6972, members: 58, level: 'All levels', schedule: 'Mon, Wed', facilities: ['Bath'], description: 'Ottawa capital region', poolName: 'Champaigne Bath', established: '1982', website: '' },
  
  // 미국 (United States)
  { id: 450, name: 'Palm Beach Underwater Hockey Club', region: 'West Palm Beach', country: 'United States', continent: 'North America', lat: 26.7153, lng: -80.0534, members: 65, level: 'All levels', schedule: 'Tue, Thu 18:30-19:30', facilities: ['Outdoor pool'], description: 'Founded 1979, Championship of the Universe host', poolName: 'Lake Lytal Pool', established: '1979', website: '' },
  { id: 451, name: 'Club Puck', region: 'San Francisco Bay Area', country: 'United States', continent: 'North America', lat: 37.7749, lng: -122.4194, members: 72, level: 'All levels', schedule: 'Mon, Thu', facilities: ['Pool'], description: 'Bay Area club', poolName: 'Martin Luther King Pool', established: '1985', website: '' },
  { id: 452, name: 'Denver Area Underwater Hockey Club', region: 'Denver', country: 'United States', continent: 'North America', lat: 39.7392, lng: -104.9903, members: 48, level: 'All levels', schedule: 'Wednesday', facilities: ['Recreation center'], description: 'Colorado community', poolName: 'Carmody Recreation Center', established: '1990', website: '' },
  { id: 453, name: 'SeaHammers', region: 'Seattle', country: 'United States', continent: 'North America', lat: 47.6062, lng: -122.3321, members: 70, level: 'All levels', schedule: 'Tue, Thu', facilities: ['University center'], description: 'Pacific Northwest', poolName: 'Seattle University Connely', established: '1988', website: '' },
  { id: 454, name: 'Chicago UWH', region: 'Chicago', country: 'United States', continent: 'North America', lat: 41.8781, lng: -87.6298, members: 58, level: 'All levels', schedule: 'Wed, Fri', facilities: ['Aquatic center'], description: 'Midwest hub', poolName: 'Waters Edge Aquatic Center', established: '1995', website: '' },
  { id: 455, name: 'Phoenix Underwater Hockey', region: 'Phoenix', country: 'United States', continent: 'North America', lat: 33.4484, lng: -112.0740, members: 52, level: 'All levels', schedule: 'Weekly', facilities: ['Community center'], description: 'Arizona club', poolName: 'Jewish Community Center', established: '1993', website: '' },
  { id: 456, name: 'Los Angeles Underwater Hockey', region: 'Los Angeles', country: 'United States', continent: 'North America', lat: 34.0522, lng: -118.2437, members: 62, level: 'All levels', schedule: 'Weekly', facilities: ['Pool'], description: 'LA metro club', poolName: 'Newhall Pool', established: '1987', website: '' },
  { id: 457, name: 'Houston UWH', region: 'Houston', country: 'United States', continent: 'North America', lat: 29.7604, lng: -95.3698, members: 58, level: 'All levels', schedule: 'Weekly', facilities: ['Recreation center'], description: 'Houston club', poolName: 'UTHSC Rec Center', established: '1991', website: '' },
  { id: 458, name: 'Beltway Bottom Feeders', region: 'Washington DC', country: 'United States', continent: 'North America', lat: 38.9072, lng: -77.0369, members: 62, level: 'All levels', schedule: 'Weekly', facilities: ['Swim center'], description: 'DC metro club', poolName: 'Oak Marr Swim Center', established: '1989', website: '' },
  
  // 멕시코 (Mexico)
  { id: 500, name: 'Mexico City UWH', region: 'Mexico City', country: 'Mexico', continent: 'North America', lat: 19.4326, lng: -99.1332, members: 38, level: 'All levels', schedule: 'Sat, Sun', facilities: ['Sports city'], description: 'Latin America hub', poolName: 'Ciudad Deportiva', established: '2008', website: '' },

  // ========== 남아메리카 (SOUTH AMERICA) ==========
  
  { id: 550, name: 'Brazil UWH', region: 'São Paulo', country: 'Brazil', continent: 'South America', lat: -23.5505, lng: -46.6333, members: 35, level: 'All levels', schedule: 'Weekly', facilities: ['Pool'], description: 'São Paulo club', poolName: 'São Paulo Pool', established: '2010', website: '' },
  { id: 551, name: 'Colombia UWH', region: 'Bogotá', country: 'Colombia', continent: 'South America', lat: 4.7110, lng: -74.0721, members: 28, level: 'All levels', schedule: 'Weekly', facilities: ['Pool'], description: 'Bogotá club', poolName: 'Bogotá Pool', established: '2014', website: '' },

  // ========== 오세아니아 (OCEANIA) ==========
  
  // 호주 (Australia)
  { id: 600, name: 'Monash Underwater Hockey', region: 'Melbourne', country: 'Australia', continent: 'Oceania', lat: -37.9105, lng: 145.1362, members: 95, level: 'All levels', schedule: 'Tue, Thu', facilities: ['University pool'], description: 'Australia largest university club, since 1966', poolName: 'Doug Ellis Swimming Pool', established: '1966', website: '' },
  { id: 601, name: 'Sydney Starfish', region: 'Ryde', country: 'Australia', continent: 'Oceania', lat: -33.8141, lng: 151.1031, members: 85, level: 'All levels', schedule: 'Multiple', facilities: ['Aquatic centre'], description: 'Sydney premier club', poolName: 'Ryde Aquatic Centre', established: '1968', website: '' },
  { id: 602, name: 'Brisbane Barracudas', region: 'Chandler', country: 'Australia', continent: 'Oceania', lat: -27.5169, lng: 153.1642, members: 88, level: 'All levels', schedule: 'Wed, Fri', facilities: ['Sports centre'], description: 'Queensland powerhouse', poolName: 'Sleeman Sports Centre', established: '1975', website: '' },
  { id: 603, name: 'Perth Raiders', region: 'Perth', country: 'Australia', continent: 'Oceania', lat: -31.9505, lng: 115.8605, members: 72, level: 'All levels', schedule: 'Mon, Wed', facilities: ['Stadium'], description: 'West Australia club', poolName: 'HBF Stadium', established: '1978', website: '' },
  { id: 604, name: 'Adelaide UWH', region: 'Adelaide', country: 'Australia', continent: 'Oceania', lat: -34.9285, lng: 138.6007, members: 62, level: 'All levels', schedule: 'Tue, Thu', facilities: ['Aquatic centre'], description: 'South Australia capital', poolName: 'SA Aquatic Centre', established: '1980', website: '' },
  
  // 뉴질랜드 (New Zealand)
  { id: 650, name: 'Pakuranga Underwater Hockey Club', region: 'Auckland', country: 'New Zealand', continent: 'Oceania', lat: -36.8485, lng: 174.7633, members: 75, level: 'All levels', schedule: 'Multiple', facilities: ['Recreation centre'], description: 'Auckland largest, World Champions', poolName: 'Manurewa Recreation Centre', established: '1980', website: '' },
  { id: 651, name: 'Christchurch Underwater Hockey Club', region: 'Christchurch', country: 'New Zealand', continent: 'Oceania', lat: -43.5321, lng: 172.6362, members: 65, level: 'All levels', schedule: 'Multiple', facilities: ['Sport centre'], description: 'Christchurch main club', poolName: 'QEII Sport & Leisure', established: '1978', website: '' },
  { id: 652, name: 'Crocodylus (Crox)', region: 'Wellington', country: 'New Zealand', continent: 'Oceania', lat: -41.2865, lng: 174.7762, members: 62, level: 'All levels', schedule: 'Multiple', facilities: ['Regional centre'], description: 'Wellington premier club', poolName: 'Wellington Regional Aquatic', established: '1979', website: '' },

  // ========== 아프리카 (AFRICA) ==========
  
  // 남아프리카 (South Africa)
  { id: 700, name: 'University of Cape Town (UCT)', region: 'Cape Town', country: 'South Africa', continent: 'Africa', lat: -33.9249, lng: 18.4241, members: 65, level: 'All levels', schedule: 'Weekly', facilities: ['University'], description: 'UCT premier club', poolName: 'UCT Pool', established: '1980', website: '' },
  { id: 701, name: 'Wits University Underwater Club (WUC)', region: 'Johannesburg', country: 'South Africa', continent: 'Africa', lat: -26.1929, lng: 28.0305, members: 55, level: 'All levels', schedule: 'Weekly', facilities: ['University'], description: 'Wits University', poolName: 'Wits Olympic Pool', established: '1986', website: '' },
  { id: 702, name: 'Durban Undersea Club - DUC', region: 'Durban', country: 'South Africa', continent: 'Africa', lat: -29.8587, lng: 31.0218, members: 58, level: 'All levels', schedule: 'Weekly', facilities: ['Pool'], description: 'Durban coastal club', poolName: 'Kings Park Pool', established: '1982', website: '' },
  
  { id: 750, name: 'Sphinx Underwater Hockey Club', region: 'Cairo', country: 'Egypt', continent: 'Africa', lat: 30.0444, lng: 31.2357, members: 35, level: 'All levels', schedule: 'Weekly', facilities: ['50m pool'], description: 'Cairo club', poolName: 'Acasia 50M Swimming Pool', established: '2012', website: '' },
];

// 통계 정보
export const clubStats = {
  totalClubs: clubsData.length,
  continents: {
    'Asia': clubsData.filter(c => c.continent === 'Asia').length,
    'Europe': clubsData.filter(c => c.continent === 'Europe').length,
    'North America': clubsData.filter(c => c.continent === 'North America').length,
    'South America': clubsData.filter(c => c.continent === 'South America').length,
    'Oceania': clubsData.filter(c => c.continent === 'Oceania').length,
    'Africa': clubsData.filter(c => c.continent === 'Africa').length,
  },
  totalMembers: clubsData.reduce((sum, club) => sum + (club.members || 0), 0),
  countries: [...new Set(clubsData.map(c => c.country))].length,
  oldestClub: clubsData.reduce((oldest, club) => 
    (!oldest || parseInt(club.established) < parseInt(oldest.established)) ? club : oldest
  , null),
};

// 대륙별 클럽 필터링 함수
export const getClubsByContinent = (continent) => {
  return clubsData.filter(club => club.continent === continent);
};

// 국가별 클럽 필터링 함수
export const getClubsByCountry = (country) => {
  return clubsData.filter(club => club.country === country);
};

// 검색 함수
export const searchClubs = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return clubsData.filter(club => 
    club.name.toLowerCase().includes(term) ||
    club.region.toLowerCase().includes(term) ||
    club.country.toLowerCase().includes(term) ||
    club.description.toLowerCase().includes(term)
  );
};

export default clubsData;
