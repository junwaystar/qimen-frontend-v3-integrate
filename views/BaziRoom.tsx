"use client";

import React from "react";

interface BaziInputs {
  datetime: string;
  birthplace: string;
  gender: string;
}

interface BaziRoomProps {
  baziInputs: BaziInputs;
  setBaziInputs: React.Dispatch<React.SetStateAction<BaziInputs>>;
  handleBaziSubmit: () => void;
  baziResult: any;
  loading: boolean;
}

export default function BaziRoom({
  baziInputs, setBaziInputs, handleBaziSubmit, baziResult, loading
}: BaziRoomProps) {
  return (
    <div className="space-y-4">
      {/* 輸入區卡片 */}
      <div className="bg-[#0B1528] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div>
          <label className="text-xs text-[#D4AF37] tracking-widest block mb-2 font-semibold">西元出生年月日時</label>
          <input
            type="datetime-local"
            value={baziInputs.datetime}
            onChange={(e) => setBaziInputs({ ...baziInputs, datetime: e.target.value })}
            className="w-full bg-[#050B14] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-all"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-[#D4AF37] tracking-widest block mb-2 font-semibold">出生地</label>
            <input
              type="text"
              placeholder="例如：台北市"
              value={baziInputs.birthplace}
              onChange={(e) => setBaziInputs({ ...baziInputs, birthplace: e.target.value })}
              className="w-full bg-[#050B14] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-all"
            />
          </div>
          <div>
            <label className="text-xs text-[#D4AF37] tracking-widest block mb-2 font-semibold">性別</label>
            <select
              value={baziInputs.gender}
              onChange={(e) => setBaziInputs({ ...baziInputs, gender: e.target.value })}
              className="w-full bg-[#050B14] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-all"
            >
              <option value="乾造 (男)">乾造 (男)</option>
              <option value="坤造 (女)">坤造 (女)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleBaziSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-[#050B14] font-bold py-2.5 rounded-xl text-sm transition-all tracking-widest mt-2"
        >
          {loading ? "八字命盤編織中..." : "剖析八字天命"}
        </button>
      </div>

      {/* 報告結果區 */}
      {baziResult && (
        <div className="bg-[#0B1528] border border-[#D4AF37]/40 rounded-2xl p-6 shadow-xl space-y-6 animate-fadeIn text-sm leading-relaxed">
          <div className="text-center border-b border-gray-800 pb-4">
            <h2 className="text-xl font-bold text-white tracking-widest bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] bg-clip-text text-transparent">八字開運決策報告</h2>
          </div>

          <div className="space-y-4">
            {/* 1. 出生資料確認 */}
            <section>
              <h3 className="text-[#D4AF37] font-semibold tracking-wider mb-1">1. 出生資料確認</h3>
              <p className="text-gray-300 bg-[#050B14] p-3 rounded-xl border border-gray-800">{baziResult.section1}</p>
            </section>

            {/* 2. 八字四柱命盤表 */}
            <section>
              <h3 className="text-[#D4AF37] font-semibold tracking-wider mb-1">2. 八字四柱命盤表</h3>
              <p className="text-gray-300 bg-[#050B14] p-3 rounded-xl border border-gray-800 whitespace-pre-wrap">{baziResult.section2}</p>
            </section>

            {/* 3. 五行分布 */}
            <section>
              <h3 className="text-[#D4AF37] font-semibold tracking-wider mb-1">3. 五行分布</h3>
              <p className="text-gray-300 bg-[#050B14] p-3 rounded-xl border border-gray-800">{baziResult.section3}</p>
            </section>

            {/* 4. 十神表 */}
            <section>
              <h3 className="text-[#D4AF37] font-semibold tracking-wider mb-1">4. 十神表</h3>
              <p className="text-gray-300 bg-[#050B14] p-3 rounded-xl border border-gray-800">{baziResult.section4}</p>
            </section>

            {/* 5. 十神解析 */}
            <section>
              <h3 className="text-[#D4AF37] font-semibold tracking-wider mb-1">5. 十神解析</h3>
              <p className="text-gray-300 bg-[#050B14] p-3 rounded-xl border border-gray-800">{baziResult.section5}</p>
            </section>

            {/* 6. 年干看前世 */}
            <section>
              <h3 className="text-[#D4AF37] font-semibold tracking-wider mb-1">6. 年干看前世</h3>
              <p className="text-gray-300 bg-[#050B14] p-3 rounded-xl border border-gray-800">{baziResult.section6}</p>
            </section>

            {/* 7. 日主強弱與喜忌用神 */}
            <section>
              <h3 className="text-[#D4AF37] font-semibold tracking-wider mb-1">7. 日主強弱與喜忌用神</h3>
              <p className="text-gray-300 bg-[#050B14] p-3 rounded-xl border border-gray-800">{baziResult.section7}</p>
            </section>

            {/* 8. 性格與人生模式 */}
            <section>
              <h3 className="text-[#D4AF37] font-semibold tracking-wider mb-1">8. 性格與人生模式</h3>
              <p className="text-gray-300 bg-[#050B14] p-3 rounded-xl border border-gray-800">{baziResult.section8}</p>
            </section>

            {/* 9. 財運與工作發展 */}
            <section>
              <h3 className="text-[#D4AF37] font-semibold tracking-wider mb-1">9. 財運與工作發展</h3>
              <p className="text-gray-300 bg-[#050B14] p-3 rounded-xl border border-gray-800">{baziResult.section9}</p>
            </section>

            {/* 10. 感情與人際關係 */}
            <section>
              <h3 className="text-[#D4AF37] font-semibold tracking-wider mb-1">10. 感情與人際關係</h3>
              <p className="text-gray-300 bg-[#050B14] p-3 rounded-xl border border-gray-800">{baziResult.section10}</p>
            </section>

            {/* 11. 流年運勢重點 */}
            <section>
              <h3 className="text-[#D4AF37] font-semibold tracking-wider mb-1">11. 流年運勢重點</h3>
              <p className="text-gray-300 bg-[#050B14] p-3 rounded-xl border border-gray-800">{baziResult.section11}</p>
            </section>

            {/* 12. 開運行動建議 */}
            <section>
              <h3 className="text-[#D4AF37] font-semibold tracking-wider mb-1">12. 開運行動建議</h3>
              <p className="text-gray-300 bg-[#050B14] p-3 rounded-xl border border-gray-800">{baziResult.section12}</p>
            </section>

            {/* 13. 總結提醒 */}
            <section>
              <h3 className="text-[#D4AF37] font-semibold tracking-wider mb-1">13. 總結提醒</h3>
              <p className="text-gray-300 bg-[#050B14] p-4 rounded-xl border border-[#D4AF37]/30 shadow-inner">{baziResult.section13}</p>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
