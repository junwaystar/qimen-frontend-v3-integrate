# 堂筠命理系統 — 前端 v3 整合版

Next.js 14 (App Router),部署到 Cloudflare Pages。

## 🎯 整合特色

- **API_BASE 已切換**:從舊的 `frosty-glade` 改為正式 `qimen-api.winggloryone.workers.dev/api`
- **八字房間已實作**:handleBaziSubmit 從 alert 殼升級為 fetch POST /api/bazi,接收 sections 並顯示 13 段報告
- **扣點後端權威**:前端只 set 從後端回的 remainingCredits,不主動扣
- **三房保留 alert 殼**:Calendar / Phone / Qimen 尚未接入,留 UI 不變

## 📁 結構

```
app/
├── page.tsx              # 🎯 已整合 /api/bazi fetch
├── layout.tsx            # 全域 layout
├── globals.css           # 樣式
└── api/
    └── divine/route.ts   # 舊版奇門 Route (本版未動)
views/
├── BaziRoom.tsx          # 透過 props 接 baziResult (不變)
├── CalendarRoom.tsx
├── FortuneRoom.tsx
└── QimenRoom.tsx
```

## 🔧 環境變數(若需)

- 本版**已將 API_BASE 寫死**於 `app/page.tsx` 第 25 行
- 若需動態切換,可改成 `process.env.NEXT_PUBLIC_API_BASE`

## 🛡 安全規範

- 登入密碼**不存 localStorage**(僅 useState session)
- 點數從後端回應設定,**前端不主動扣減**
- fetch 統一帶 `Content-Type: application/json`

## 📡 呼叫的後端

| 端點 | 用途 |
|------|------|
| POST /api/verify | 登入 |
| POST /api/bazi | 八字命盤(已實作) |
| _(其他三房待整合)_ | |
