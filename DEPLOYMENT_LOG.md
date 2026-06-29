# 堂筠 (Tang Yun) 部署經驗紀錄文件

## 1. 部署目標與環境
- **框架**: Next.js 14.2.22 (App Router)
- **部署平台**: Cloudflare Pages
- **運行環境**: Cloudflare Edge Runtime
- **分支**: `tang-yun-v2-flattened`

## 2. 關鍵避坑指南 (Pitfalls & Solutions)

### A. 目錄結構平整化 (Flattening)
- **問題**: Cloudflare Pages 預設建構環境期望 `app/` 位於根目錄，若放在 `src/app/` 可能導致建構路徑識別異常。
- **解法**: 將 `src/` 內的 `app`, `components`, `store`, `views` 全部平移至根目錄。

### B. 輸出路徑與 _worker.js 陷阱
- **問題**: `@cloudflare/next-on-pages` 產出的 `_worker.js` 有時會被生成為「資料夾」而非「檔案」，導致 Cloudflare 找不到進入點而回報 404。
- **解法**: 
  - **建構輸出目錄 (Build output directory)** 設定為: `.vercel/output/static`
  - **建構指令 (Build command)** 必須包含強制轉換邏輯：
    `npm run build && npx @cloudflare/next-on-pages && mv .vercel/output/static/_worker.js/index.js .vercel/output/static/_worker.js.tmp && rm -rf .vercel/output/static/_worker.js && mv .vercel/output/static/_worker.js.tmp .vercel/output/static/_worker.js`

### C. Node.js 兼容性標記 (Compatibility Flag)
- **問題**: 出現 `Node.JS Compatibility Error`，提示缺少 `nodejs_compat`。
- **解法**: 在 Cloudflare Pages $
ightarrow$ Settings $
ightarrow$ Functions $
ightarrow$ Compatibility flags 中，為 Production 和 Preview 環境添加標記：`nodejs_compat` (注意拼寫，必須是 **at**)。

## 3. 關鍵設定彙整

### Cloudflare Pages 設定
- **Build command**: `npm run build && npx @cloudflare/next-on-pages && mv .vercel/output/static/_worker.js/index.js .vercel/output/static/_worker.js.tmp && rm -rf .vercel/output/static/_worker.js && mv .vercel/output/static/_worker.js.tmp .vercel/output/static/_worker.js`
- **Build output directory**: `.vercel/output/static`
- **Compatibility Flag**: `nodejs_compat`

---

## 4. 認證與 API 資訊 (敏感資訊)
*注意：請妥善保管，不要將此檔案公開上傳至公共 Repo*

### Cloudflare 帳戶資訊
- **Account ID**: 8fb176de5723fd6ebc57782b56f1803b
- **Email**: winggloryone@gmail.com

### 部署與管理 Token
- **API Token**: [已由 Hermes 內部管理，請參考環境變數或秘密管理系統]
- **權限範圍**: Workers Scripts: Edit, Pages: Edit

## 5. 驗證流程
1. 訪問 `https://qimen-v3.pages.dev/api/divine` $
ightarrow$ 確認回傳 JSON (後端 OK)。
2. 查看 Pages $
ightarrow$ Deployments $
ightarrow$ Functions $
ightarrow$ Real-time Logs $
ightarrow$ 確認請求被呼叫。
