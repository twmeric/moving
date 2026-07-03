# 當前任務：御搬遷 Cloudflare Pages 全功能上線

> **狀態**: ✅ 已完成
> **完成時間**: 2026-07-03

## Phase 1: 啟動與規劃 ✅
- [x] 讀取母機守則 06, 07, 12, 18, 19, 25, 34, 40, 41, 42
- [x] 將藍本複製到 `E:\Projects\moving`
- [x] 初始化 Git 倉庫
- [x] 創建 `.ai/RULES.md`, `.ai/MEMORY.md`, `.ai/TASKS/current.md`

## Phase 2: 開發執行 ✅
- [x] 2.1 切換到 pnpm，更新 package.json，移除未使用依賴
- [x] 2.2 創建 Cloudflare Pages Functions 後端（Hono + D1 + KV）
- [x] 2.3 設計 D1 數據庫 schema（clients, branches, orders, bookings）
- [x] 2.4 實作 CMS API（GET/PUT cms_data）
- [x] 2.5 實作 Auth API（login + JWT middleware）
- [x] 2.6 實作 CRM API（clients/orders CRUD）
- [x] 2.7 實作 Booking API（save + WhatsApp link）
- [x] 2.8 重構 HomePage 使用 CMS 數據
- [x] 2.9 重構 ServicesPage 使用 CMS 數據
- [x] 2.10 重構 Footer/Navbar 使用 CMS 數據
- [x] 2.11 創建 Admin 後台頁面（CMS 編輯 + 登入）
- [x] 2.12 重構 CRM Dashboard 接真實 API
- [x] 2.13 重構 BookingPage 接 WhatsApp
- [x] 2.14 配置 SPA routing（_routes.json + catch-all function）
- [x] 2.15 配置 wrangler.toml 與 GitHub Actions

## Phase 3: 驗證與審查 ✅
- [x] 3.1 `pnpm build` 本地構建成功
- [x] 3.2 `wrangler pages dev` 本地預覽 API
- [x] 3.3 curl 驗證 CMS / Auth / CRM / Booking API（線上）
- [x] 3.4 瀏覽器自動化驗證 CMS 編輯
- [x] 3.5 記錄反模式到母機守則 Rule 40 / 41 / 42

## Phase 4: 交付與部署 ✅
- [x] 4.1 Git commit + push 到 https://github.com/twmeric/moving
- [x] 4.2 部署到 Cloudflare Pages：https://moving-3vf.pages.dev
- [x] 4.3 驗證線上 API 與頁面
- [x] 4.4 設置 GitHub Actions 自動部署（使用母機 token）
- [x] 4.5 Admin / CRM 合併為單一後台
- [x] 4.6 後台連結從公開導航移除
- [x] 4.7 本地 folder 整理與可維護性優化

## 後續待辦（用戶決定）
- [ ] 是否綁定自定義域名（如 `moving.pages.dev` 或自有網域）
- [ ] 是否進一步優化後台 UI（目前為功能完整版）
