'use client';

import React from 'react';
import { useStore } from '../store/store';

// 100% 純淨向量圖標 (與主頁風格完美對齊)
const SvgMiniCompass = () => (
  <svg className="w-6 h-6 text-yellow-400 spin-bagua filter drop-shadow-[0_0_6px_rgba(242,201,76,0.5)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6">
    <circle cx="50" cy="50" r="45" strokeDasharray="12 6" />
    <circle cx="50" cy="50" r="22" strokeDasharray="6 4" />
    <path d="M 50,5 L 50,95 M 5,50 L 95,50 M 18,18 L 82,82 M 18,82 L 82,18" />
  </svg>
);

const SvgZap = () => (
  <svg className="w-4 h-4 text-yellow-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.5 21l-1.5-8.5H4l10-12.5 1.5 8.5H20z" />
  </svg>
);

const SvgLogOut = () => (
  <svg className="w-4 h-4 text-gray-400 hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
  </svg>
);

export default function Navbar() {
  const { user, currentView, setUser, navigateTo } = useStore();

  // 登入頁面不顯示 Navbar
  if (currentView === 'login') return null;

  const handleLogout = () => {
    setUser(null);
    navigateTo('login');
  };

  return (
    <nav className="w-full flex justify-between items-center p-4 neon-border border-t-0 border-l-0 border-r-0 rounded-none sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md">
      {/* 左側 LOGO & 返回主頁 */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('dashboard')}>
        <SvgMiniCompass />
        <span className="text-base sm:text-lg font-bold text-glow-gold tracking-widest ml-1">堂筠命理</span>
      </div>
      
      {/* 右側大師狀態面板 */}
      {user && (
        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
          {/* 使用者名稱 */}
          <div className="text-yellow-200/80 font-medium">
            大師：<span className="text-white font-bold">{user.name}</span>
          </div>
          
          {/* 玄學點數 */}
          <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-0.5 rounded-full border border-yellow-600/30">
            <SvgZap />
            <span>點數: <span className="text-glow-orange font-bold ml-0.5">{user.points}</span></span>
          </div>
          
          {/* 安全登出 */}
          <button onClick={handleLogout} className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors" title="退回大門">
            <SvgLogOut />
          </button>
        </div>
      )}
    </nav>
  );
}
