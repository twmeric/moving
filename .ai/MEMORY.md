# 御搬遷 Premier Relocations - 會話記憶

## 2026-07-03 當前會話

### 目標
將 youware 藍本改造為 Cloudflare Pages 部署的企業搬遷官網 + 可編輯 CMS + 真實 CRM 後台。

### 已確認需求
- 全功能一起上線
- CMS 可編輯：首頁文案、服務項目、圖片、聯絡電話、統計數字、Footer 資訊
- CRM 真實上線使用
- 預約表單提交後導向 WhatsApp
- 登入帳號：`twmeric` / 密碼：`admin360`
- 客戶資料無需加密/合規
- 域名：`moving.pages.dev`（實際上 Cloudflare 自動分配為 `moving-3vf.pages.dev`，因 `moving` 已被佔用）
- 使用 GitHub + Cloudflare Pages 自動部署
- 保留原有愛馬仕設計風格

### 架構
- **前端**: React 18 + TypeScript + Vite + Tailwind CSS
- **後端**: Cloudflare Pages Functions (Hono)
- **數據庫**: Cloudflare D1 (`moving-db`) 存 CRM 與預約
- **KV**: `moving-cms` 存 CMS 內容
- **部署**: GitHub repo `twmeric/moving` + GitHub Actions workflow

### 關鍵教訓
1. Cloudflare Pages 的 `wrangler.toml` **不可**包含 `[build]` section。
2. SPA fallback 不能直接 `fetch('/index.html')`，會觸發 308 重定向循環；應先 `fetch(request)`，404 再回退。
3. `_routes.json` 不能排除 `/api/*`，否則 API 會返回 HTML。
4. `functions/_middleware.ts` 必須用 `PagesFunction` 簽名，不能用 Hono `MiddlewareHandler`；CORS 建議在 Hono app 內處理。
5. PowerShell `curl` 是 Invoke-WebRequest 別名，測試 JSON API 應使用 `curl.exe` 並將 JSON 寫入文件用 `@file.json`。
6. 已新增母機守則 Rule 40 記錄以上反模式。

### 待處理
- GitHub Actions 需要 `CLOUDFLARE_API_TOKEN` secret 才能自動部署。
- 如需 `moving.pages.dev`，需在 Cloudflare Dashboard 綁定自定義域名。
