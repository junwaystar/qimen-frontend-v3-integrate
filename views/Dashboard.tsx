'use client';

import React from 'react';
import { useStore } from '../store/store';

// 奇門專用東方科技圖標
const SvgQimenCardIcon = () => (
  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
  </svg>
);

const SvgLockCardIcon = () => (
  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export default function Dashboard() {
  const { user, navigateTo } = useStore();

  const activeModule = (viewName: string) => {
    navigateTo(viewName);
  };

  return (
    <div className="w-full max-w-4xl animate-fade-in mx-auto px-4 py-6">
      {/* 歡迎中樞頂部列 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-yellow-600/20 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-glow-gold tracking-wider mb-1">神機妙算中樞</h2>
          <p className="text-xs sm:text-sm text-yellow-200/60">選取您期望指引迷津的玄學模組進行測算</p>
        </div>
      </div>

      {/* 模組卡片矩陣大平原 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        
        {/* 🟢 核心重做區：奇門數字占卜 */}
        <div 
          onClick={() => activeModule('qimen')}
          className="neon-border p-5 sm:p-6 rounded-xl cursor-pointer group hover:bg-slate-800/40 transition-all flex flex-col justify-between min-h-[140px] relative overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl group-hover:bg-yellow-500/10 transition-colors"></div>
          <div>
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 bg-slate-900 rounded-lg border border-yellow-600/30 text-yellow-400">
                <SvgQimenCardIcon />
              </div>
              <span className="text-[10px] sm:text-xs font-bold px-2.5 py-1 bg-red-950/60 text-red-400 border border-red-500/30 rounded-full flex items-center gap-1">⚡ 消耗 3 點</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-glow-gold transition-colors">奇門數字占卜</h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1.5 leading-relaxed">輸入感應六位數，生成專屬籤詩與吉凶方位判讀</p>
          </div>
        </div>

        {/* 🔒 封印開發區：其餘舊模組 (防止點擊引發路徑 404 白屏，提供溫和防護) */}
        {['八字命盤解析', '農民曆擇日良辰', '每日穿衣五行旺運'].map((title, idx) => (
          <div 
            key={idx}
            onClick={() => alert('此玄學房間正在進行全棧一體化重構，大師請稍候開放')}
            className="border border-slate-800 bg-slate-950/40 p-5 sm:p-6 rounded-xl opacity-40 cursor-not-allowed flex flex-col justify-between min-h-[140px]"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="p-2 bg-slate-900 rounded-lg text-gray-600">
                  <SvgLockCardIcon />
                </div>
                <span className="text-[10px] sm:text-xs font-bold px-2.5 py-1 bg-slate-900 text-gray-500 rounded-full">重構中</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-500">{title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed">一體化新引擎升級中，敬請期待天機開放</p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
