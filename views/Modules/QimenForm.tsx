'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../store/store';

export default function QimenForm() {
  const { user, setUser, navigateTo } = useStore();
  const [numbers, setNumbers] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  // 物理聚焦：防止 iOS 鍵盤彈出跑版
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (numbers.length !== 6 || isSubmitting) return;
    setIsSubmitting(true);

    navigateTo('loading');

    try {
      // 點數扣除降維安全氣囊
      if (user) {
        setUser({
          ...user,
          points: Math.max(0, user.points - 3)
        });
      }

      setTimeout(() => {
        navigateTo('result');
        setIsSubmitting(false);
      }, 1500);

    } catch (err) {
      console.error('占卜管線異常:', err);
      navigateTo('dashboard');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl px-4 mx-auto animate-fade-in py-6">
      <button 
        onClick={() => navigateTo('dashboard')} 
        className="mb-6 text-gray-400 hover:text-yellow-400 font-semibold transition-colors text-sm flex items-center gap-1"
      >
        ← 返回儀表板
      </button>

      <div className="neon-border p-6 sm:p-8 rounded-2xl relative overflow-hidden backdrop-blur-md">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-glow-gold mb-6 text-center tracking-widest">奇門數字占卜</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-xs sm:text-sm text-yellow-200/80 mb-4 text-center font-medium tracking-wide">
              憑第一直覺輸入 <span className="text-glow-gold font-bold">一組 6 位數感應數字</span>
            </label>
            
            {/* 隱藏實體框 */}
            <input 
              ref={inputRef}
              type="text" 
              pattern="[0-9]*" 
              inputMode="numeric" 
              maxLength={6} 
              value={numbers} 
              onChange={(e) => setNumbers(e.target.value.replace(/\D/g, '').slice(0, 6))} 
              className="opacity-0 absolute -z-50 pointer-events-none" 
            />
            
            {/* 虛擬霓虹方格 */}
            <div 
              className="flex justify-center gap-2 sm:gap-3 cursor-pointer" 
              onClick={() => inputRef.current?.focus()}
            >
              {[0, 1, 2, 3, 4, 5].map((idx) => {
                const char = numbers[idx];
                const isCurrent = numbers.length === idx;
                const isFilled = numbers.length > idx;
                
                return (
                  <div 
                    key={idx} 
                    className={`w-11 h-14 sm:w-14 sm:h-16 rounded-xl flex items-center justify-center font-extrabold text-xl sm:text-2xl border transition-all duration-200 ${
                      isCurrent 
                        ? 'border-yellow-400 bg-yellow-500/10 text-glow-gold shadow-[0_0_12px_rgba(242,201,76,0.3)] animate-pulse' 
                        : isFilled 
                          ? 'border-yellow-600/60 bg-slate-900/80 text-yellow-200' 
                          : 'border-yellow-600/20 bg-slate-950/40 text-gray-700'
                    }`}
                  >
                    {char || '•'}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-2">
            <label className="block text-xs sm:text-sm text-yellow-200/80 mb-2 font-medium tracking-wide">
              您心之所求為何事？(選填)
            </label>
            <input 
              type="text" 
              value={question} 
              onChange={(e) => setQuestion(e.target.value)} 
              placeholder="例如：今年轉職、感情復合、這筆簽約合夥吉凶..." 
              className="neon-input w-full p-3.5 rounded-xl text-base placeholder:text-yellow-700/30" 
            />
          </div>

          <button 
            type="submit" 
            disabled={numbers.length !== 6 || isSubmitting} 
            className="neon-btn w-full p-4 rounded-xl mt-4 font-bold tracking-widest text-base sm:text-lg shadow-xl"
          >
            🔮 {numbers.length === 6 ? '扣除 3 點並生成天機籤詩' : '請輸入完整 6 位數字'}
          </button>
        </form>
      </div>
    </div>
  );
}
