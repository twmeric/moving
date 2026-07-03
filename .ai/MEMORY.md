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
- 域名：`https://moving-3vf.pages.dev`（`moving.pages.dev` 已被佔用）
- 使用 GitHub + Cloudflare Pages 自動部署
- 保留原有愛馬仕設計風格
- 後台入口不對外公開
- 本地 folder 整理與可維護性

### 架構
- **前端**: React 18 + TypeScript + Vite + Tailwind CSS
- **後端**: Cloudflare Pages Functions (Hono)
- **數據庫**: Cloudflare D1 (`moving-db`) 存 CRM 與預約
- **KV**: `moving-cms` 存 CMS 內容
- **R2**: `moving-assets` 存圖片
- **部署**: GitHub repo `twmeric/moving` + GitHub Actions workflow（已驗證成功）

### 關鍵教訓
1. Cloudflare Pages 的 `wrangler.toml` **不可**包含 `[build]` section。
2. SPA fallback 不能直接 `fetch('/index.html')`，會觸發 308 重定向循環；應先 `fetch(request)`，404 再回退。
3. `_routes.json` 不能排除 `/api/*`，否則 API 會返回 HTML。
4. PowerShell `curl` 是 Invoke-WebRequest 別名，測試 JSON API 應使用 `curl.exe` 並將 JSON 寫入文件用 `@file.json`。
5. 發送中文到 D1/KV/Workers 前必須 `chcp 65001`。
6. 公開 Navbar **不可**顯示「管理後台」連結，後台需直接輸入網址進入。
7. 圖片必須從 youware 遷移到 R2，避免依賴第三方 CDN。
8. 詢問用戶要 token 之前，必須先檢查 `E:\Projects\motherbase\SOULS\tokens\`。
9. 行動前必須先規劃，評估 Multi-Agent 並行可能性。
10. 完成後必須整理本地 folder：移除模板殘留、未使用依賴、更新文檔。

### 已完成
- [x] Cloudflare Pages 部署
- [x] D1 + KV + R2 建立與綁定
- [x] Hono API（auth, cms, crm, booking, health）
- [x] CMS 後台 /admin
- [x] CRM 後台 /crm
- [x] Admin / CRM 合併為單一後台頁面，tab 切換
- [x] 圖片遷移到 R2
- [x] GitHub Actions 自動部署驗證成功
- [x] 後台連結從公開導航移除
- [x] 本地 folder 整理（移除未使用依賴、模板文件）
- [x] 母機守則 Rule 40 / 41 / 42 更新
