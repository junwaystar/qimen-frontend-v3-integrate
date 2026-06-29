"use client";

import React from "react";

interface CalendarInputs {
  zodiac: string;
  startDate: string;
  endDate: string;
  purpose: string;
  needLuckyHour: string; // "yes" 或 "no"
  excludedDates: string;
}

interface CalendarRoomProps {
  calendarInputs: CalendarInputs;
  setCalendarInputs: React.Dispatch<React.SetStateAction<CalendarInputs>>;
  handleCalendarSubmit: () => void;
  calendarResult: any;
  loading: boolean;
}

export default function CalendarRoom({
  calendarInputs, setCalendarInputs, handleCalendarSubmit, calendarResult, loading
}: CalendarRoomProps) {
  return (
    <div className="space-y-4">
      {/* 擇日輸入表單卡片 */}
      <div className="bg-[#0B1528] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-[#D4AF37] text-sm font-semibold tracking-widest border-b border-gray-800 pb-2">農民曆天時擇日設定</h2>
        
        <div className="grid grid-cols-2 gap-3">
          {/* 1. 生肖 */}
          <div>
            <label className="text-xs text-gray-400 tracking-wider block mb-2 font-medium">主事生肖</label>
            <select
              value={calendarInputs.zodiac}
              onChange={(e) => setCalendarInputs({ ...calendarInputs, zodiac: e.target.value })}
              className="w-full bg-[#050B14] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-all"
            >
              {["鼠", "牛", "虎", "兔", "龍", "蛇", "馬", "羊", "猴", "雞", "狗", "豬"].map((z) => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>
          </div>

          {/* 3. 擇日用途 */}
          <div>
            <label className="text-xs text-gray-400 tracking-wider block mb-2 font-medium">擇日用途</label>
            <select
              value={calendarInputs.purpose}
              onChange={(e) => setCalendarInputs({ ...calendarInputs, purpose: e.target.value })}
              className="w-full bg-[#050B14] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-all"
            >
              {["開工", "開市", "入宅", "動土", "修造", "嫁娶", "求醫", "安香", "其他事宜"].map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 2. 日期期間 */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-400 tracking-wider block mb-2 font-medium">開始日期</label>
            <input
              type="date"
              value={calendarInputs.startDate}
              onChange={(e) => setCalendarInputs({ ...calendarInputs, startDate: e.target.value })}
              className="w-full bg-[#050B14] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-all"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 tracking-wider block mb-2 font-medium">結束日期</label>
            <input
              type="date"
              value={calendarInputs.endDate}
              onChange={(e) => setCalendarInputs({ ...calendarInputs, endDate: e.target.value })}
              className="w-full bg-[#050B14] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-all"
            />
          </div>
        </div>

        {/* 4. 是否需要吉時 (預設需要) */}
        <div>
          <label className="text-xs text-gray-400 tracking-wider block mb-2 font-medium">是否需要精確吉時剖析</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setCalendarInputs({ ...calendarInputs, needLuckyHour: "yes" })}
              className={`py-2 text-sm rounded-xl border transition-all ${calendarInputs.needLuckyHour === "yes" ? "bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37] font-semibold" : "bg-[#050B14] border-gray-700 text-gray-400"}`}
            >
              需要 (預設推薦)
            </button>
            <button
              type="button"
              onClick={() => setCalendarInputs({ ...calendarInputs, needLuckyHour: "no" })}
              className={`py-2 text-sm rounded-xl border transition-all ${calendarInputs.needLuckyHour === "no" ? "bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37] font-semibold" : "bg-[#050B14] border-gray-700 text-gray-400"}`}
            >
              不需要
            </button>
          </div>
        </div>

        {/* 5. 不可用日期或時間 */}
        <div>
          <label className="text-xs text-gray-400 tracking-wider block mb-2 font-medium">需避開的日期或特定時間 (選填)</label>
          <input
            type="text"
            placeholder="例如：6月20日、或週休二日不施工"
            value={calendarInputs.excludedDates}
            onChange={(e) => setCalendarInputs({ ...calendarInputs, excludedDates: e.target.value })}
            className="w-full bg-[#050B14] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] transition-all"
          />
        </div>

        <button
          onClick={handleCalendarSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-[#050B14] font-bold py-2.5 rounded-xl text-sm transition-all tracking-widest mt-2 shadow-[0_4px_15px_rgba(212,175,55,0.15)]"
        >
          {loading ? "天時神煞推算中..." : "依農民曆擇吉日"}
        </button>
      </div>

      {/* 擇日解析結果區 */}
      {calendarResult && (
        <div className="bg-[#0B1528] border border-[#D4AF37]/40 rounded-2xl p-6 shadow-xl space-y-4 animate-fadeIn text-sm leading-relaxed">
          <div className="border-b border-gray-800 pb-3 flex justify-between items-center">
            <h3 className="text-white font-bold">農民曆擇吉結果</h3>
            <span className="text-xs bg-[#D4AF37]/10 text-[#D4AF37] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
              用途：{calendarResult.purpose}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-gray-400 text-xs block">主事生肖與設定限制</span>
              <p className="text-gray-300">屬 {calendarResult.zodiac}，避開限制：{calendarResult.excludedDates || "無"}</p>
            </div>

            <div className="p-4 bg-[#050B14] rounded-xl border border-gray-800 space-y-2">
              <span className="text-xs text-[#D4AF37] font-semibold block">🎯 首選吉日良時</span>
              <p className="text-white font-bold text-base">{calendarResult.bestDate}</p>
              {calendarResult.needLuckyHour === "yes" && (
                <p className="text-xs text-[#FF7F50]">⏰ 推薦吉時：{calendarResult.bestHour}</p>
              )}
            </div>

            <div>
              <span className="text-gray-400 text-xs block">宜忌神煞與沖煞提醒</span>
              <p className="text-gray-300 bg-[#050B14] p-3 rounded-xl border border-gray-800 mt-1">
                {calendarResult.details}
              </p>
            </div>

            <div>
              <span className="text-gray-400 text-xs block">備用吉日參考</span>
              <p className="text-gray-300 mt-1">{calendarResult.backupDates}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
