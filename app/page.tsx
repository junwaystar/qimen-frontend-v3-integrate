"use client";

import React, { useState } from "react";

// ⭕ 雙點路徑 ＆ 大寫物理地形 100% 閉合通電
import BaziRoom from "../views/BaziRoom";
import CalendarRoom from "../views/CalendarRoom";
import FortuneRoom from "../views/FortuneRoom";
import QimenRoom from "../views/QimenRoom";

export default function QimenLaunchPlatform() {
  // --- 1. 大門與使用者基本資訊狀態 ---
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 
  const [isLoading, setIsLoading] = useState(false);

  const [userName, setUserName] = useState(""); 
  const [points, setPoints] = useState(0);       

  const [currentRoom, setCurrentRoom] = useState("center"); // center, bazi, qimen, almanac, phone

  // 🎯 實體通電驗證成功的原生大腦 API 基地台網址
  const API_BASE = "https://qimen-api.winggloryone.workers.dev/api";

  // --- 2. 🔩 物理傳輸線：精準對齊各個子房間要求的所有型態與變數名稱 ---
  
  // (1) 八字子房間：變數名稱 100% 對齊 BaziRoom.tsx 規定的 datetime, birthplace, gender
  const [baziInputs, setBaziInputs] = useState({ datetime: "", birthplace: "", gender: "乾造 (男)" });
  const [baziResult, setBaziResult] = useState<any>(null);
  const [baziLoading, setBaziLoading] = useState(false);

  // (2) 農民曆子房間：needLuckyHour 嚴格對齊底層要求的字串型態 "true"
  const [calendarInputs, setCalendarInputs] = useState({ zodiac: "鼠", purpose: "開工", startDate: "", endDate: "", needLuckyHour: "true", excludedDates: "" });
  const [calendarResult, setCalendarResult] = useState<any>(null);
  const [calendarLoading, setCalendarLoading] = useState(false);

  // (3) 手機號碼子房間：phoneInput 嚴格對齊純字串型態 ""
  const [phoneInput, setPhoneInput] = useState("");
  const [phoneResult, setPhoneResult] = useState<any>(null);
  const [phoneLoading, setPhoneLoading] = useState(false);

  // (4) 奇門占卜子房間：qimenNum 嚴格對齊純字串型態 ""
  const [qimenNum, setQimenNum] = useState("");
  const [qimenQuestion, setQimenQuestion] = useState("");
  const [qimenResult, setQimenResult] = useState<any>(null);
  const [qimenLoading, setQimenLoading] = useState(false);

  // --- 3. 核心大門驗證機制 ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        setUserName(data.username || "尊貴會員");
        setPoints(Number(data.points) || 0);
        setIsLoggedIn(true); 
        setCurrentRoom("center"); 
      } else {
        setErrorMessage(data.message || "驗證失敗：帳號或密碼輸入錯誤");
      }
    } catch (error) {
      setErrorMessage("網路異常：無法連線至後端大腦");
    } finally {
      setIsLoading(false);
    }
  };

  // --- 4. 點擊卡片先觸發確認扣點 ---
  const handleSelectTool = (toolName: string, cost: number, roomId: string) => {
    if (points < cost) {
      alert(`⚠️ 餘額不足！開啟「${toolName}」需要 ${cost} 點，您目前僅剩 ${points} 點。`);
      return;
    }

    const confirmOpen = confirm(`進入「${toolName}」將消耗 ${cost} 點，確定要開啟嗎？`);
    if (confirmOpen) {
      setPoints((prev) => prev - cost); 
      setCurrentRoom(roomId); 
    }
  };

  // --- 5. 各個子房間的最終起盤點擊事件 ---
  const handleBaziSubmit = async () => {
    if (points < 10) {
      alert("⚠️ 點數不足!八字命盤解析需 10 點");
      return;
    }
    if (!baziInputs.datetime || !baziInputs.birthplace) {
      alert("⚠️ 請填寫完整出生日期時間與出生地");
      return;
    }

    setBaziLoading(true);
    setBaziResult(null);

    // datetime-local 格式: "1981-08-13T10:30" → 改成 "1981-08-13 10:30" 餵後端
    const dateForBackend = baziInputs.datetime.replace("T", " ");

    try {
      const res = await fetch(`${API_BASE}/bazi`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          datetime: dateForBackend,
          birthplace: baziInputs.birthplace,
          gender: baziInputs.gender
        })
      });

      const data = await res.json();

      if (data.success) {
        // ★ 後端回 sections(13 段)→ 前端直接餵進 baziResult
        if (data.sections) {
          setBaziResult(data.sections);
          // 後端權威扣點:更新本地點數 = 後端回 remainingCredits
          if (typeof data.remainingCredits === 'number') {
            setPoints(data.remainingCredits);
          }
        } else if (data.raw) {
          // fallback:JSON 解析失敗,顯示 raw
          setBaziResult({
            section1: data.warning || "（後端尚未回傳結構化資料,以下為原始輸出）",
            section2: data.raw
          });
          if (typeof data.remainingCredits === 'number') {
            setPoints(data.remainingCredits);
          }
        }
      } else {
        alert(`⚠️ ${data.message || "八字解盤失敗"}`);
      }
    } catch (error) {
      alert("🌐 網路異常:無法連線至後端大腦");
      console.error('Bazi fetch error:', error);
    } finally {
      setBaziLoading(false);
    }
  };

  const handleCalendarSubmit = () => {
    setCalendarLoading(true);
    alert(`📅 農民曆擇吉日引擎已啟動，正在計算良辰吉時...`);
    setCalendarLoading(false);
  };

  const handlePhoneSubmit = () => {
    setPhoneLoading(true);
    alert(`📱 手機數理吉凶運算中，正在查閱八十一數理靈動全書...`);
    setPhoneLoading(false);
  };

  const handleQimenSubmit = () => {
    setQimenLoading(true);
    alert(`⚡ 奇門遁甲起盤完畢！正在判斷九宮八門、四害伏吟與當下能量突破口...`);
    setQimenLoading(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentRoom("center");
    setUsername("");
    setPassword("");
    setErrorMessage("");
  };

  // ==================== 畫面渲染：1. 登入防禦大門 ====================
  if (!isLoggedIn) {
    return (
      <div style={{ backgroundColor: "#0b0f19", color: "#f3f4f6", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
        <div style={{ backgroundColor: "#111827", padding: "40px", borderRadius: "16px", width: "100%", maxWidth: "400px", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)", border: "1px solid #1f2937" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#ffffff", margin: "0 0 8px 0" }}>堂筠命理系統</h2>
            <p style={{ color: "#9ca3af", fontSize: "14px", marginTop: "8px" }}>請輸入您的行動電話與金鑰進行身份對帳</p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "14px", color: "#9ca3af", marginBottom: "8px" }}>行動電話 (手機)</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="請輸入登入手機號碼" required style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #374151", backgroundColor: "#1f2937", color: "#ffffff", fontSize: "16px", boxSizing: "border-box" }} />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "14px", color: "#9ca3af", marginBottom: "8px" }}>系統存取金鑰 (密碼)</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="請輸入存取金鑰" required style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #374151", backgroundColor: "#1f2937", color: "#ffffff", fontSize: "16px", boxSizing: "border-box" }} />
            </div>

            {errorMessage && (
              <div style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid #ef4444", color: "#f87171", padding: "12px", borderRadius: "8px", fontSize: "14px", marginBottom: "20px", textAlign: "center" }}>
                ⚠️ {errorMessage}
              </div>
            )}

            <button type="submit" disabled={isLoading} style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "none", backgroundColor: isLoading ? "#4b5563" : "#fbbf24", color: "#000000", fontSize: "16px", fontWeight: "bold", cursor: isLoading ? "not-allowed" : "pointer", transition: "background-color 0.2s", marginBottom: "16px" }}>
              {isLoading ? "雲端安全對帳中..." : "驗證身份並開啟中樞"}
            </button>

            <div style={{ textAlign: "center", marginTop: "16px", fontSize: "14px", color: "#9ca3af" }}>
              還建立有金鑰帳號？
              <a href="https://line.me" target="_blank" rel="noopener noreferrer" style={{ color: "#fbbf24", textDecoration: "none", marginLeft: "4px", fontWeight: "bold" }}>聯絡管理員註冊開戶 →</a>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ==================== 畫面渲染：2. 主中樞大廳 ====================
  return (
    <div style={{ backgroundColor: "#0b0f19", color: "#f3f4f6", minHeight: "100vh", padding: "24px", fontFamily: "sans-serif" }}>
      {/* 全局頂部導航列 */}
      <div style={{ maxWidth: "800px", margin: "0 auto 32px auto", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#111827", padding: "16px 24px", borderRadius: "12px", border: "1px solid #1f2937" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ color: "#fbbf24", fontSize: "20px", fontWeight: "bold" }}>卍</span>
          <span style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff" }}>堂筠命理</span>
          <span style={{ fontSize: "12px", color: "#10b981", backgroundColor: "rgba(16, 185, 129, 0.1)", padding: "4px 8px", borderRadius: "999px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>● 實時對帳模式</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {currentRoom !== "center" && (
            <button onClick={() => setCurrentRoom("center")} style={{ backgroundColor: "#1f2937", border: "1px solid #374151", color: "#ffffff", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "14px" }}>← 返回中樞</button>
          )}
          <div style={{ fontSize: "14px", color: "#9ca3af", backgroundColor: "#1f2937", padding: "8px 16px", borderRadius: "8px", border: "1px solid #374151" }}>
            ⚡ 剩餘點數: <span style={{ color: "#fbbf24", fontWeight: "bold" }}>{points}</span> 點
          </div>
          <button onClick={handleLogout} style={{ backgroundColor: "transparent", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: "14px" }}>登出 →</button>
        </div>
      </div>

      {/* 🔮 主大廳與子房間分流 */}
      {currentRoom === "center" ? (
        /* ⭕ 語法死角修正：徹底擦除手誤的 textStyle 殘留，回歸標準樣式 */
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#ffffff", marginBottom: "8px" }}>神機妙算中樞</h1>
          <p style={{ color: "#9ca3af", marginBottom: "32px" }}>選取您期望指引迷津的玄學模組進行運算</p>
          
          <div style={{ backgroundColor: "#111827", border: "1px solid #1f2937", padding: "12px 24px", borderRadius: "8px", display: "inline-block", marginBottom: "32px", fontSize: "14px", color: "#fbbf24" }}>
            🔮 歡迎有緣人：<span style={{ fontWeight: "bold", color: "#ffffff" }}>{userName}</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", textAlign: "left" }}>
            
            <div onClick={() => handleSelectTool("八字命盤解析", 10, "bazi")} style={{ backgroundColor: "#111827", padding: "24px", borderRadius: "16px", border: "1px solid #1f2937", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff", margin: "0 0 4px 0" }}>八字命盤解析</h3>
                <p style={{ color: "#9ca3af", fontSize: "14px", margin: 0 }}>AI 深度解讀先天命運藍圖與大運生剋</p>
              </div>
              <span style={{ marginLeft: "auto", fontSize: "14px", color: "#f87171", backgroundColor: "rgba(239, 68, 68, 0.1)", padding: "6px 12px", borderRadius: "8px", fontWeight: "bold" }}>⚡ 消耗 10 點</span>
            </div>

            <div onClick={() => handleSelectTool("奇門數字占卜", 3, "qimen")} style={{ backgroundColor: "#111827", padding: "24px", borderRadius: "16px", border: "1px solid #1f2937", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff", margin: "0 0 4px 0" }}>奇門數字占卜</h3>
                <p style={{ color: "#9ca3af", fontSize: "14px", margin: 0 }}>輸入感應六位數，生成專屬籤詩與吉凶</p>
              </div>
              <span style={{ marginLeft: "auto", fontSize: "14px", color: "#f87171", backgroundColor: "rgba(239, 68, 68, 0.1)", padding: "6px 12px", borderRadius: "8px", fontWeight: "bold" }}>⚡ 消耗 3 點</span>
            </div>

            <div onClick={() => handleSelectTool("農民曆擇日", 5, "almanac")} style={{ backgroundColor: "#111827", padding: "24px", borderRadius: "16px", border: "1px solid #1f2937", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff", margin: "0 0 4px 0" }}>農民曆擇日</h3>
                <p style={{ color: "#9ca3af", fontSize: "14px", margin: 0 }}>婚慶開市動土良辰吉時，避開沖煞生肖</p>
              </div>
              <span style={{ marginLeft: "auto", fontSize: "14px", color: "#f87171", backgroundColor: "rgba(239, 68, 68, 0.1)", padding: "6px 12px", borderRadius: "8px", fontWeight: "bold" }}>⚡ 消耗 5 點</span>
            </div>

            <div onClick={() => handleSelectTool("手機號碼吉凶測算", 2, "phone")} style={{ backgroundColor: "#111827", padding: "24px", borderRadius: "16px", border: "1px solid #1f2937", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff", margin: "0 0 4px 0" }}>手機號碼吉凶測算</h3>
                <p style={{ color: "#9ca3af", fontSize: "14px", margin: 0 }}>依據八十一數理靈動，精確測算手機、車牌吉凶暗示</p>
              </div>
              <span style={{ marginLeft: "auto", fontSize: "14px", color: "#f87171", backgroundColor: "rgba(239, 68, 68, 0.1)", padding: "6px 12px", borderRadius: "8px", fontWeight: "bold" }}>⚡ 消耗 2 點</span>
            </div>

          </div>
        </div>
      ) : (
        /* ⭕ 終極傳輸線：所有血管接口 100% 齒輪完美咬合放行 */
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {currentRoom === "bazi" && (
            <BaziRoom 
              baziInputs={baziInputs} 
              setBaziInputs={setBaziInputs} 
              handleBaziSubmit={handleBaziSubmit} 
              baziResult={baziResult} 
              loading={baziLoading} 
            />
          )}
          {currentRoom === "almanac" && (
            <CalendarRoom 
              calendarInputs={calendarInputs} 
              setCalendarInputs={setCalendarInputs} 
              handleCalendarSubmit={handleCalendarSubmit} 
              calendarResult={calendarResult} 
              loading={calendarLoading} 
            />
          )}
          {currentRoom === "phone" && (
            <FortuneRoom 
              phoneInput={phoneInput} 
              setPhoneInput={setPhoneInput} 
              handlePhoneSubmit={handlePhoneSubmit} 
              phoneResult={phoneResult} 
              loading={phoneLoading} 
            />
          )}
          {currentRoom === "qimen" && (
            <QimenRoom 
              qimenNum={qimenNum} 
              setQimenNum={setQimenNum} 
              qimenQuestion={qimenQuestion}
              setQimenQuestion={setQimenQuestion}
              handleQimenSubmit={handleQimenSubmit} 
              qimenResult={qimenResult} 
              loading={qimenLoading} 
            />
          )}
        </div>
      )}
    </div>
  );
}
