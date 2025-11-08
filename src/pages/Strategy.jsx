// src/pages/Strategy.jsx
import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, Trash2, Download, Upload, RefreshCw, Save } from 'lucide-react';

const Strategy = () => {
  const canvasRef = useRef(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  
  // 초기 선수 위치
  const [blackPlayers, setBlackPlayers] = useState([
    // 앞줄 3명 (왼쪽 팀, 오른쪽을 향함)
    { id: 'b1', x: 550, y: 150, rotation: 90 },
    { id: 'b2', x: 550, y: 350, rotation: 90 },
    { id: 'b3', x: 550, y: 550, rotation: 90 },
    // 뒷줄 3명
    { id: 'b4', x: 250, y: 150, rotation: 90 },
    { id: 'b5', x: 250, y: 350, rotation: 90 },
    { id: 'b6', x: 250, y: 550, rotation: 90 }
  ]);

  const [whitePlayers, setWhitePlayers] = useState([
    // 앞줄 3명 (오른쪽 팀, 왼쪽을 향함)
    { id: 'w1', x: 750, y: 150, rotation: 270 },
    { id: 'w2', x: 750, y: 350, rotation: 270 },
    { id: 'w3', x: 750, y: 550, rotation: 270 },
    // 뒷줄 3명
    { id: 'w4', x: 1050, y: 150, rotation: 270 },
    { id: 'w5', x: 1050, y: 350, rotation: 270 },
    { id: 'w6', x: 1050, y: 550, rotation: 270 }
  ]);

  const [referees, setReferees] = useState([
    { id: 'r1', x: 650, y: 50, rotation: 0 },
    { id: 'r2', x: 650, y: 650, rotation: 0 }
  ]);

  const [puck, setPuck] = useState({ x: 650, y: 350 });

  // 풀 그리기
  const drawPool = (ctx) => {
    const poolWidth = 1200;
    const poolHeight = 700;
    const centerX = 650;
    const centerY = 350;

    // 배경
    ctx.fillStyle = '#B8E6F0';
    ctx.fillRect(0, 0, 1300, 700);

    // 메인 풀
    ctx.strokeStyle = '#0077BE';
    ctx.lineWidth = 3;
    ctx.strokeRect(50, 0, poolWidth, poolHeight);

    // 중앙선
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, poolHeight);
    ctx.stroke();
    ctx.setLineDash([]);

    // 중앙원
    ctx.beginPath();
    ctx.arc(centerX, centerY, 100, 0, 2 * Math.PI);
    ctx.stroke();

    // 골 영역 (왼쪽)
    ctx.beginPath();
    ctx.arc(50, centerY, 150, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();

    // 골 영역 (오른쪽)
    ctx.beginPath();
    ctx.arc(1250, centerY, 150, Math.PI / 2, (3 * Math.PI) / 2);
    ctx.stroke();

    // 코너 라인 (왼쪽 위)
    ctx.beginPath();
    ctx.moveTo(50, 0);
    ctx.lineTo(200, 150);
    ctx.stroke();

    // 코너 라인 (왼쪽 아래)
    ctx.beginPath();
    ctx.moveTo(50, 700);
    ctx.lineTo(200, 550);
    ctx.stroke();

    // 코너 라인 (오른쪽 위)
    ctx.beginPath();
    ctx.moveTo(1250, 0);
    ctx.lineTo(1100, 150);
    ctx.stroke();

    // 코너 라인 (오른쪽 아래)
    ctx.beginPath();
    ctx.moveTo(1250, 700);
    ctx.lineTo(1100, 550);
    ctx.stroke();
  };

  // 선수 그리기
  const drawPlayer = (ctx, x, y, rotation, color, isSelected) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);

    // 선택 효과
    if (isSelected) {
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 30, 0, 2 * Math.PI);
      ctx.stroke();
    }

    // 몸통
    ctx.fillStyle = color;
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, 5, 15, 22, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // 머리 (더 크게 - 1.2배)
    ctx.beginPath();
    ctx.arc(0, -25, 14.4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // 팔 - 만세 동작 (더 길게, 위로)
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    
    // 왼팔
    ctx.strokeStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(-8, 0);
    ctx.lineTo(-18, -15);
    ctx.lineTo(-15, -25);
    ctx.stroke();

    // 오른팔
    ctx.strokeStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(8, 0);
    ctx.lineTo(18, -15);
    ctx.lineTo(15, -25);
    ctx.stroke();

    // 다리
    ctx.strokeStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(-5, 22);
    ctx.lineTo(-10, 35);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(5, 22);
    ctx.lineTo(10, 35);
    ctx.stroke();

    // 방향 표시 (스틱) - 머리 옆을 지나서, 빨간색, 1.5배 두께
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 6;  // 4 * 1.5 = 6
    ctx.beginPath();
    ctx.moveTo(10, -25);  // 손 위치 (머리 근처)
    ctx.lineTo(20, -30);  // 오른쪽 위로
    ctx.lineTo(10, -55);  // 스틱 끝까지 왼쪽 위로
    ctx.stroke();

    ctx.restore();
  };

  // 심판 그리기
  const drawReferee = (ctx, x, y, rotation, isSelected) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);

    // 선택 효과
    if (isSelected) {
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 20, 0, 2 * Math.PI);
      ctx.stroke();
    }

    // 몸통 (빨간색)
    ctx.fillStyle = '#FF0000';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // 숫자
    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(rotation === 0 ? '1' : '2', 0, 0);

    ctx.restore();
  };

  // 퍽 그리기
  const drawPuck = (ctx, x, y) => {
    ctx.fillStyle = '#FF1493';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  };

  // 캔버스 렌더링
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 풀 그리기
    drawPool(ctx);

    // 퍽 그리기
    drawPuck(ctx, puck.x, puck.y);

    // 선수들 그리기
    blackPlayers.forEach(player => {
      drawPlayer(
        ctx,
        player.x,
        player.y,
        player.rotation,
        '#000000',
        selectedPlayer?.id === player.id
      );
    });

    whitePlayers.forEach(player => {
      drawPlayer(
        ctx,
        player.x,
        player.y,
        player.rotation,
        '#FFFFFF',
        selectedPlayer?.id === player.id
      );
    });

    // 심판 그리기
    referees.forEach(referee => {
      drawReferee(
        ctx,
        referee.x,
        referee.y,
        referee.rotation,
        selectedPlayer?.id === referee.id
      );
    });
  }, [blackPlayers, whitePlayers, referees, puck, selectedPlayer]);

  // 마우스 다운
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 퍽 클릭 체크
    const puckDistance = Math.sqrt((x - puck.x) ** 2 + (y - puck.y) ** 2);
    if (puckDistance < 10) {
      setSelectedPlayer({ id: 'puck', type: 'puck' });
      setIsDragging(true);
      setIsRotating(false);
      return;
    }

    // 심판 클릭 체크
    for (const referee of referees) {
      const distance = Math.sqrt((x - referee.x) ** 2 + (y - referee.y) ** 2);
      if (distance < 20) {
        setSelectedPlayer({ ...referee, type: 'referee' });
        setIsDragging(true);
        setIsRotating(false);
        return;
      }
    }

    // 검은색 선수 클릭 체크
    for (const player of blackPlayers) {
      // 머리 영역 체크 (회전) - 클릭 범위 1.5배
      const cos = Math.cos((player.rotation * Math.PI) / 180);
      const sin = Math.sin((player.rotation * Math.PI) / 180);
      const headX = player.x + (-25 * sin);
      const headY = player.y + (-25 * cos);
      const headDistance = Math.sqrt((x - headX) ** 2 + (y - headY) ** 2);
      
      if (headDistance < 18) {  // 12 * 1.5 = 18
        setSelectedPlayer({ ...player, type: 'black' });
        setIsDragging(false);
        setIsRotating(true);
        return;
      }

      // 몸통 영역 체크 (이동)
      const bodyDistance = Math.sqrt((x - player.x) ** 2 + (y - player.y) ** 2);
      if (bodyDistance < 25) {
        setSelectedPlayer({ ...player, type: 'black' });
        setIsDragging(true);
        setIsRotating(false);
        return;
      }
    }

    // 흰색 선수 클릭 체크
    for (const player of whitePlayers) {
      // 머리 영역 체크 (회전) - 클릭 범위 1.5배
      const cos = Math.cos((player.rotation * Math.PI) / 180);
      const sin = Math.sin((player.rotation * Math.PI) / 180);
      const headX = player.x + (-25 * sin);
      const headY = player.y + (-25 * cos);
      const headDistance = Math.sqrt((x - headX) ** 2 + (y - headY) ** 2);
      
      if (headDistance < 18) {  // 12 * 1.5 = 18
        setSelectedPlayer({ ...player, type: 'white' });
        setIsDragging(false);
        setIsRotating(true);
        return;
      }

      // 몸통 영역 체크 (이동)
      const bodyDistance = Math.sqrt((x - player.x) ** 2 + (y - player.y) ** 2);
      if (bodyDistance < 25) {
        setSelectedPlayer({ ...player, type: 'white' });
        setIsDragging(true);
        setIsRotating(false);
        return;
      }
    }

    setSelectedPlayer(null);
    setIsDragging(false);
    setIsRotating(false);
  };

  // 마우스 이동
  const handleMouseMove = (e) => {
    if (!selectedPlayer) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 회전 모드
    if (isRotating && selectedPlayer.type !== 'puck' && selectedPlayer.type !== 'referee') {
      const dx = x - selectedPlayer.x;
      const dy = y - selectedPlayer.y;
      const angle = Math.atan2(dx, -dy) * (180 / Math.PI);

      if (selectedPlayer.type === 'black') {
        setBlackPlayers(players =>
          players.map(player =>
            player.id === selectedPlayer.id ? { ...player, rotation: angle } : player
          )
        );
      } else if (selectedPlayer.type === 'white') {
        setWhitePlayers(players =>
          players.map(player =>
            player.id === selectedPlayer.id ? { ...player, rotation: angle } : player
          )
        );
      }
      return;
    }

    // 이동 모드
    if (!isDragging) return;

    // 퍽 이동
    if (selectedPlayer.id === 'puck') {
      setPuck({ x, y });
      return;
    }

    // 심판 이동
    if (selectedPlayer.type === 'referee') {
      setReferees(refs =>
        refs.map(ref =>
          ref.id === selectedPlayer.id ? { ...ref, x, y } : ref
        )
      );
      return;
    }

    // 선수 이동
    if (selectedPlayer.type === 'black') {
      setBlackPlayers(players =>
        players.map(player =>
          player.id === selectedPlayer.id ? { ...player, x, y } : player
        )
      );
    } else if (selectedPlayer.type === 'white') {
      setWhitePlayers(players =>
        players.map(player =>
          player.id === selectedPlayer.id ? { ...player, x, y } : player
        )
      );
    }
  };

  // 마우스 업
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsRotating(false);
  };

  // 리셋
  const handleReset = () => {
    setBlackPlayers([
      // 앞줄 3명 (왼쪽 팀, 오른쪽을 향함)
      { id: 'b1', x: 550, y: 150, rotation: 90 },
      { id: 'b2', x: 550, y: 350, rotation: 90 },
      { id: 'b3', x: 550, y: 550, rotation: 90 },
      // 뒷줄 3명
      { id: 'b4', x: 250, y: 150, rotation: 90 },
      { id: 'b5', x: 250, y: 350, rotation: 90 },
      { id: 'b6', x: 250, y: 550, rotation: 90 }
    ]);

    setWhitePlayers([
      // 앞줄 3명 (오른쪽 팀, 왼쪽을 향함)
      { id: 'w1', x: 750, y: 150, rotation: 270 },
      { id: 'w2', x: 750, y: 350, rotation: 270 },
      { id: 'w3', x: 750, y: 550, rotation: 270 },
      // 뒷줄 3명
      { id: 'w4', x: 1050, y: 150, rotation: 270 },
      { id: 'w5', x: 1050, y: 350, rotation: 270 },
      { id: 'w6', x: 1050, y: 550, rotation: 270 }
    ]);

    setReferees([
      { id: 'r1', x: 650, y: 50, rotation: 0 },
      { id: 'r2', x: 650, y: 650, rotation: 0 }
    ]);

    setPuck({ x: 650, y: 350 });
    setSelectedPlayer(null);
  };

  // 포메이션 변경
  const handleFormation = (formation) => {
    switch(formation) {
      case '3-3':
        // 3-3 포메이션 (기본) - 앞 3명, 뒤 3명
        setBlackPlayers([
          // 앞줄 3명 (중앙선에 가까움)
          { id: 'b1', x: 550, y: 150, rotation: 90 },
          { id: 'b2', x: 550, y: 350, rotation: 90 },
          { id: 'b3', x: 550, y: 550, rotation: 90 },
          // 뒷줄 3명 (골대 쪽)
          { id: 'b4', x: 250, y: 150, rotation: 90 },
          { id: 'b5', x: 250, y: 350, rotation: 90 },
          { id: 'b6', x: 250, y: 550, rotation: 90 }
        ]);
        setWhitePlayers([
          // 앞줄 3명 (중앙선에 가까움)
          { id: 'w1', x: 750, y: 150, rotation: 270 },
          { id: 'w2', x: 750, y: 350, rotation: 270 },
          { id: 'w3', x: 750, y: 550, rotation: 270 },
          // 뒷줄 3명 (골대 쪽)
          { id: 'w4', x: 1050, y: 150, rotation: 270 },
          { id: 'w5', x: 1050, y: 350, rotation: 270 },
          { id: 'w6', x: 1050, y: 550, rotation: 270 }
        ]);
        break;

      case '1-2-3':
        // 1-2-3 포메이션 - 앞 1명, 중간 2명, 뒤 3명
        setBlackPlayers([
          // 앞 1명 (중앙선에 가까움)
          { id: 'b1', x: 550, y: 350, rotation: 90 },
          // 중간 2명
          { id: 'b2', x: 400, y: 250, rotation: 90 },
          { id: 'b3', x: 400, y: 450, rotation: 90 },
          // 뒤 3명 (골대 쪽)
          { id: 'b4', x: 250, y: 150, rotation: 90 },
          { id: 'b5', x: 250, y: 350, rotation: 90 },
          { id: 'b6', x: 250, y: 550, rotation: 90 }
        ]);
        setWhitePlayers([
          // 앞 1명 (중앙선에 가까움)
          { id: 'w1', x: 750, y: 350, rotation: 270 },
          // 중간 2명
          { id: 'w2', x: 900, y: 250, rotation: 270 },
          { id: 'w3', x: 900, y: 450, rotation: 270 },
          // 뒤 3명 (골대 쪽)
          { id: 'w4', x: 1050, y: 150, rotation: 270 },
          { id: 'w5', x: 1050, y: 350, rotation: 270 },
          { id: 'w6', x: 1050, y: 550, rotation: 270 }
        ]);
        break;

      case '3-2-1':
        // 3-2-1 포메이션 - 앞 3명, 중간 2명, 뒤 1명
        setBlackPlayers([
          // 앞 3명 (중앙선에 가까움)
          { id: 'b1', x: 550, y: 150, rotation: 90 },
          { id: 'b2', x: 550, y: 350, rotation: 90 },
          { id: 'b3', x: 550, y: 550, rotation: 90 },
          // 중간 2명
          { id: 'b4', x: 400, y: 250, rotation: 90 },
          { id: 'b5', x: 400, y: 450, rotation: 90 },
          // 뒤 1명 (골대 쪽)
          { id: 'b6', x: 250, y: 350, rotation: 90 }
        ]);
        setWhitePlayers([
          // 앞 3명 (중앙선에 가까움)
          { id: 'w1', x: 750, y: 150, rotation: 270 },
          { id: 'w2', x: 750, y: 350, rotation: 270 },
          { id: 'w3', x: 750, y: 550, rotation: 270 },
          // 중간 2명
          { id: 'w4', x: 900, y: 250, rotation: 270 },
          { id: 'w5', x: 900, y: 450, rotation: 270 },
          // 뒤 1명 (골대 쪽)
          { id: 'w6', x: 1050, y: 350, rotation: 270 }
        ]);
        break;

      case '1-3-2':
        // 1-3-2 포메이션 - 앞 1명, 중간 3명, 뒤 2명
        setBlackPlayers([
          // 앞 1명 (중앙선에 가까움)
          { id: 'b1', x: 550, y: 350, rotation: 90 },
          // 중간 3명
          { id: 'b2', x: 400, y: 150, rotation: 90 },
          { id: 'b3', x: 400, y: 350, rotation: 90 },
          { id: 'b4', x: 400, y: 550, rotation: 90 },
          // 뒤 2명 (골대 쪽)
          { id: 'b5', x: 250, y: 250, rotation: 90 },
          { id: 'b6', x: 250, y: 450, rotation: 90 }
        ]);
        setWhitePlayers([
          // 앞 1명 (중앙선에 가까움)
          { id: 'w1', x: 750, y: 350, rotation: 270 },
          // 중간 3명
          { id: 'w2', x: 900, y: 150, rotation: 270 },
          { id: 'w3', x: 900, y: 350, rotation: 270 },
          { id: 'w4', x: 900, y: 550, rotation: 270 },
          // 뒤 2명 (골대 쪽)
          { id: 'w5', x: 1050, y: 250, rotation: 270 },
          { id: 'w6', x: 1050, y: 450, rotation: 270 }
        ]);
        break;
    }
    setSelectedPlayer(null);
  };

  // 다운로드
  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'uwh-strategy.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <RotateCw className="w-4 h-4" />
            인터랙티브 전략보드
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">전략보드</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            마우스로 선수를 움직여 전술을 계획하세요
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="py-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                  <RefreshCw className="w-5 h-5" />
                  리셋
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <Download className="w-5 h-5" />
                  다운로드
                </button>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400">
                {selectedPlayer ? (
                  <span className="font-semibold">
                    {selectedPlayer.id === 'puck' ? '🔴 퍽 선택됨' : 
                     selectedPlayer.type === 'referee' ? '🔴 심판 선택됨' :
                     isRotating ? (selectedPlayer.type === 'black' ? '⚫ 회전 모드 (머리 클릭됨)' : '⚪ 회전 모드 (머리 클릭됨)') :
                     isDragging ? (selectedPlayer.type === 'black' ? '⚫ 이동 모드 (몸통 클릭됨)' : '⚪ 이동 모드 (몸통 클릭됨)') :
                     '선택됨'}
                  </span>
                ) : (
                  '💡 머리 클릭 = 회전 | 몸통 클릭 = 이동'
                )}
              </div>
            </div>

            {/* Formation Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2">
                포메이션:
              </span>
              <button
                onClick={() => handleFormation('3-3')}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
              >
                3-3
              </button>
              <button
                onClick={() => handleFormation('1-2-3')}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
              >
                1-2-3
              </button>
              <button
                onClick={() => handleFormation('3-2-1')}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
              >
                3-2-1
              </button>
              <button
                onClick={() => handleFormation('1-3-2')}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
              >
                1-3-2
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 overflow-x-auto">
            <canvas
              ref={canvasRef}
              width={1300}
              height={700}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="mx-auto border-2 border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
            />
          </div>

          {/* Instructions */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-3">👤</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                엉덩이 클릭 = 회전
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                선수의 머리를 클릭하고 마우스를 움직여 방향을 자유롭게 회전하세요
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-3">🖱️</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                몸통 클릭 = 이동
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                선수의 몸통을 클릭하고 드래그하여 원하는 위치로 이동하세요
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-3">💾</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                저장
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                완성된 전략을 이미지로 다운로드하여 팀과 공유하세요
              </p>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-8 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              범례
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">검은색 팀 (6명)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white border-2 border-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">흰색 팀 (6명)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">심판 (2명)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-pink-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">퍽</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Strategy;
