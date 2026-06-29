"use client";

import React from "react";

interface QimenRoomProps {
  qimenQuestion: string;
  setQimenQuestion: (val: string) => void;
  qimenNum: string;
  setQimenNum: (val: string) => void;
  handleQimenSubmit: () => void;
  qimenResult: any;
  loading: boolean;
}

export default function QimenRoom({
  qimenQuestion, setQimenQuestion,
  qimenNum, setQimenNum,
  handleQimenSubmit, qimenResult, loading
}: QimenRoomProps) {
  return (
    <div className="space-y-4">
      <div className="bg-[#0B1528] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div>
          <label className="text-xs text-[#D4AF37] tracking-widest block mb-2 font-semibold">想問的問題 / QUESTION</label>
          <input
            type="text"
            value={qimenQuestion}
            onChange={(e) => setQimenQuestion(e.target.value)}
            placeholder="例如：本次與某某品牌簽約合作吉凶？"
            className="w-full bg-[#050B14] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-all"
          />
        </div>
        <div>
          <label className="text-xs text-[#D4AF37] tracking-widest block mb-2 font-semibold">直覺 6 位數字 / 6-DIGIT NUMBER</label>
          <input
            type="text"
            value={qimenNum}
            onChange={(e) => setQimenNum(e.target.value)}
            placeholder="請輸入 6 位直覺隨機號碼..."
            className="w-full bg-[#050B14] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-all text-center tracking-widest"
          />
        </div>
        <button
          onClick={handleQimenSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-[#050B14] font-bold py-2.5 rounded-xl text-sm transition-all tracking-widest"
        >
          {loading ? "天機盤象計算中..." : "起盤預見未來"}
        </button>
      </div>

      {qimenResult && (
        <div className="bg-[#0B1528] border border-[#D4AF37]/40 rounded-2xl p-6 shadow-xl space-y-4 animate-fadeIn">
          <div className="border-b border-gray-800 pb-3">
            <span className="text-xs bg-[#9370DB]/20 text-[#E6E6FA] px-2 py-0.5 rounded border border-[#9370DB]/30">
              {qimenResult.method || "數字奇門盤象"}
            </span>
            <h3 className="text-white font-bold mt-2">解析主旨：{qimenResult.question}</h3>
          </div>

          {qimenResult.structure && (
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-[#050B14] p-2 rounded border border-gray-800"><div className="text-gray-500">九宮</div><div className="text-[#D4AF37] font-bold">{qimenResult.structure.palace}</div></div>
              <div className="bg-[#050B14] p-2 rounded border border-gray-800"><div className="text-gray-500">八神</div><div className="text-[#D4AF37] font-bold">{qimenResult.structure.god}</div></div>
              <div className="bg-[#050B14] p-2 rounded border border-gray-800"><div className="text-gray-500">九星</div><div className="text-[#D4AF37] font-bold">{qimenResult.structure.star}</div></div>
              <div className="bg-[#050B14] p-2 rounded border border-gray-800"><div className="text-gray-500">八門</div><div className="text-[#D4AF37] font-bold">{qimenResult.structure.door}</div></div>
              <div className="bg-[#050B14] p-2 rounded border border-gray-800"><div className="text-gray-500">天盤</div><div className="text-[#D4AF37] font-bold">{qimenResult.structure.sky}</div></div>
              <div className="bg-[#050B14] p-2 rounded border border-gray-800"><div className="text-gray-500">地盤</div><div className="text-[#D4AF37] font-bold">{qimenResult.structure.earth}</div></div>
            </div>
          )}

          {qimenResult.warnings && qimenResult.warnings.length > 0 && (
            <div className="bg-red-950/30 border border-red-900/50 p-3 rounded-xl text-xs text-red-400">
              ⚠️ 偵測到盤象四害：{qimenResult.warnings.join("、")}
            </div>
          )}

          <div className="space-y-3 text-sm leading-relaxed">
            <div><span className="text-[#D4AF37] font-semibold">【整體判斷】</span><p className="text-gray-300 mt-1">{qimenResult.judgment}</p></div>
            <div><span className="text-[#D4AF37] font-semibold">【重點解析】</span><p className="text-gray-300 mt-1">{qimenResult.analysis}</p></div>
            <div className="p-3 bg-[#050B14] rounded-xl border border-gray-800">
              <span className="text-xs text-gray-500 block">吉凶結論</span>
              <span className="text-lg font-bold text-white">{qimenResult.conclusion}</span>
            </div>
            <div><span className="text-[#D4AF37] font-semibold">【行動策略】</span><p className="text-gray-300 mt-1">{qimenResult.strategy}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
