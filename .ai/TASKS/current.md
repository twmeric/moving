# 當前任務：御搬遷 Cloudflare Pages 全功能上線

## Phase 1: 啟動與規劃 ✅
- [x] 讀取母機守則 07, 12, 18, 19, 25, 34
- [x] 將藍本複製到 `E:\Projects\moving`
- [x] 初始化 Git 倉庫
- [x] 創建 `.ai/RULES.md`, `.ai/MEMORY.md`, `.ai/TASKS/current.md`

## Phase 2: 開發執行
- [ ] 2.1 切換到 pnpm，更新 package.json
- [ ] 2.2 創建 Cloudflare Pages Functions 後端（Hono + D1 + KV）
- [ ] 2.3 設計 D1 數據庫 schema（clients, branches, orders, bookings）
- [ ] 2.4 實作 CMS API（GET/PUT cms:data）
- [ ] 2.5 實作 Auth API（login + JWT middleware）
- [ ] 2.6 實作 CRM API（clients/orders CRUD）
- [ ] 2.7 實作 Booking API（save + WhatsApp link）
- [ ] 2.8 重構 HomePage 使用 CMS 數據
- [ ] 2.9 重構 ServicesPage 使用 CMS 數據
- [ ] 2.10 重構 Footer/Navbar 使用 CMS 數據
- [ ] 2.11 創建 Admin 後台頁面（CMS 編輯 + 登入）
- [ ] 2.12 重構 CRM Dashboard 接真實 API
- [ ] 2.13 重構 BookingPage 接 WhatsApp
- [ ] 2.14 配置 SPA routing（_routes.json）
- [ ] 2.15 配置 wrangler.toml 與 GitHub Actions

## Phase 3: 驗證與審查
- [ ] 3.1 `pnpm build` 本地構建成功
- [ ] 3.2 `wrangler pages dev` 本地預覽 API
- [ ] 3.3 curl 驗證 CMS / Auth / CRM / Booking API
- [ ] 3.4 Code Review

## Phase 4: 交付與部署
- [ ] 4.1 Git commit
- [ ] 4.2 部署到 Cloudflare Pages
- [ ] 4.3 驗證線上 `moving.pages.dev`
- [ ] 4.4 任務歸檔
