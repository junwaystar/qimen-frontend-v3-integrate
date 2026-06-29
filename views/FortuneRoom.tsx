"use client";

import React from "react";

interface FortuneRoomProps {
  phoneInput: string;
  setPhoneInput: (val: string) => void;
  handlePhoneSubmit: () => void;
  phoneResult: any;
  loading: boolean;
}

export default function FortuneRoom({
  phoneInput, setPhoneInput,
  handlePhoneSubmit, phoneResult, loading
}: FortuneRoomProps) {
  return (
    <div className="space-y-4">
      <div className="bg-[#0B1528] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div>
          <label className="text-xs text-[#D4AF37] tracking-widest block mb-2 font-semibold">輸入手機號碼 / PHONE NUMBER</label>
          <input
            type="text"
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
            placeholder="請輸入欲測算的手機號碼..."
            className="w-full bg-[#050B14] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-all text-center tracking-widest"
          />
        </div>
        <button
          onClick={handlePhoneSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-[#050B14] font-bold py-2.5 rounded-xl text-sm transition-all tracking-widest"
        >
          {loading ? "數理靈動剖析中..." : "剖析數理吉凶"}
        </button>
      </div>

      {phoneResult && (
        <div className="bg-[#0B1528] border border-[#D4AF37]/40 rounded-2xl p-6 shadow-xl space-y-6 animate-fadeIn">
          {phoneResult.tail && (
            <div className="border-b border-gray-800/80 pb-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">尾號（主命數字）：<strong className="text-white text-sm">{phoneResult.tail.raw}</strong></span>
                <span className={`text-xs px-2 py-0.5 rounded font-bold ${phoneResult.tail.luck === "吉" ? "bg-green-950 text-green-400" : phoneResult.tail.luck === "兇" ? "bg-red-950 text-red-400" : "bg-orange-950 text-orange-400"}`}>
                  {phoneResult.tail.luck}
                </span>
              </div>
              <div className="text-sm"><span className="text-gray-500">81 數理 → </span><span className="text-[#D4AF37] font-bold">{phoneResult.tail.code} 數 : {phoneResult.tail.meaning}</span></div>
              <p className="text-xs text-gray-400 bg-[#050B14] p-3 rounded-xl leading-relaxed border border-gray-800">{phoneResult.tail.detail}</p>
            </div>
          )}

          {phoneResult.mid && (
            <div className="border-b border-gray-800/80 pb-4 space-y-1">
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>中間號（輔數）：<strong className="text-white">{phoneResult.mid.raw}</strong></span>
                <span className="font-semibold text-gray-300">{phoneResult.mid.luck}</span>
              </div>
              <div className="text-xs"><span className="text-gray-500">81 數理 → </span><span className="text-gray-300 font-medium">{phoneResult.mid.code} 數 : {phoneResult.mid.meaning}</span></div>
            </div>
          )}

          {phoneResult.carrier && (
            <div className="border-b border-gray-800/80 pb-4 space-y-1">
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>運營商（參考）：<strong className="text-white">{phoneResult.carrier.raw}</strong></span>
                <span className="font-semibold text-gray-300">{phoneResult.carrier.luck}</span>
              </div>
              <div className="text-xs"><span className="text-gray-500">81 數理 → </span><span className="text-gray-300 font-medium">{phoneResult.carrier.code} 數 : {phoneResult.carrier.meaning}</span></div>
            </div>
          )}

          {phoneResult.summary && (
            <div className="space-y-2">
              <span className="text-xs text-[#D4AF37] font-semibold tracking-widest block">🔮 綜合白話命理大總結</span>
              <p className="text-sm text-gray-300 leading-relaxed bg-[#050B14] p-4 rounded-xl border border-gray-800 shadow-inner">
                {phoneResult.summary}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
