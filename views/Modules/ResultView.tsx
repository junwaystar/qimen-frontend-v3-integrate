'use client';

import React from 'react';
import { useStore } from '../../store/store';

export default function ResultView() {
  const { navigateTo } = useStore();

  // 100% 純淨無毒的靜態東方科技籤詩，與全新極簡 store 完美咬合
  const mockResult = {
    title: '奇門數字占卜神籤',
    number: '888888',
    grade: '上上籤 (大吉)',
    poem: '金戈鐵馬出天關，\n撥雲見日照千山。\n謀求財利今朝至，\n此去乾坤任爾攀。',
    analysis: '此時天顯大吉之兆，對應天輔吉星相助。\n您心之所求，此時最適宜果斷採取行動。阻礙將化為貴人助力，順水推舟，功成名就。'
  };

  return (
    <div className="w-full max-w-4xl px-4 mx-auto animate-fade-in py-6 pb-12">
      {/* 返回中樞 */}
      <button 
        onClick={() => navigateTo('dashboard')} 
        className="mb-6 text-gray-400 hover:text-yellow-400 font-semibold transition-colors text-sm flex items-center gap-1"
      >
        ← 返回儀表板
      </button>

      {/* 雙欄玄學戰術排版 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* 左側：核心神籤 */}
        <div className="md:col-span-5 flex flex-col justify-between border border-orange-500/40 bg-slate-950/60 p-6 rounded-2xl relative min-h-[360px] text-center backdrop-blur-md">
          <div className="border border-yellow-600/20 bg-slate-900/60 p-4 rounded-xl">
            <span className="text-[10px] text-yellow-600 font-bold tracking-widest block mb-1">感應干支密碼</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-glow-gold my-2 tracking-widest uppercase font-mono">
              {mockResult.number}
            </div>
            <span className="px-3 py-1 bg-red-950 text-red-400 border border-red-500/30 rounded-full font-bold text-xs inline-block mt-1">
              {mockResult.grade}
            </span>
          </div>

          {/* 古風籤詩區 */}
          <div className="my-6 bg-slate-950/80 p-5 rounded-xl border-l-2 border-orange-500 text-center shadow-inner">
            <p className="text-yellow-100 italic leading-loose text-base sm:text-lg tracking-widest font-serif whitespace-pre-line">
              {mockResult.poem}
            </p>
          </div>
        </div>

        {/* 右側：大師天機詳細剖析 */}
        <div className="md:col-span-7 border border-yellow-500/30 bg-slate-950/40 p-6 rounded-2xl flex flex-col justify-between backdrop-blur-md">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-glow-gold mb-4 border-b border-yellow-600/20 pb-3 tracking-wider">
              {mockResult.title} 斷盤詳解
            </h3>
            <div className="text-sm leading-relaxed text-yellow-100/90 bg-slate-900/40 p-4 rounded-xl border-l-2 border-yellow-500 whitespace-pre-line font-medium">
              {mockResult.analysis}
            </div>
          </div>

          {/* 再次測算物理按鈕 */}
          <button 
            onClick={() => navigateTo('qimen')} 
            className="w-full mt-6 bg-yellow-500/10 border border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/20 active:scale-95 transition-all p-3.5 rounded-xl text-sm font-bold tracking-widest shadow-md"
          >
            重回奇門法陣 重新測算
          </button>
        </div>

      </div>
    </div>
  );
}
