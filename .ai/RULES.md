# 御搬遷 Premier Relocations - 專案規則

## 專案資訊

- **專案路徑**: `E:\Projects\moving`
- **類型**: React SPA + Cloudflare Pages + Pages Functions + D1 + KV
- **域名**: `moving.pages.dev`
- **套件管理器**: pnpm（強制）

## 技術棧

- React 18 + TypeScript + Vite
- Tailwind CSS 3
- Framer Motion
- Cloudflare Pages Functions (Hono)
- Cloudflare D1 (CRM / 預約數據)
- Cloudflare KV (CMS 內容)

## 架構決策

1. **Pages Functions 作為 API**: 與前端同域名，避免 CORS。
2. **CMS 數據存 KV**: 單一 key `cms:data` 存整份 JSON，便於 Admin 編輯。
3. **CRM 與預約存 D1**: 結構化數據，支援查詢與統計。
4. **認證**: JWT + Wrangler Secret `JWT_SECRET`，帳號 `twmeric` / 密碼 `admin360`。
5. **預約提交**: 儲存到 D1 後，返回 `wa.me` 預填訊息連結。
6. **SPA 路由**: 使用 `_routes.json` + `functions/_middleware.ts` 處理前端路由。

## 開發守則

- 遵從母機守則 Rule 12: CMS 新欄位 **Admin Form First**。
- 遵從母機守則 Rule 18: 使用 pnpm，禁止 npm。
- 遵從母機守則 Rule 19: KV namespace 獨立，不可與其他專案混用。
- 遵從母機守則 Rule 34: Shell 自動化測試優先，部署後必須 curl 驗證。
- 所有文本文件使用 UTF-8 無 BOM。
- 所有路徑使用絕對路徑或相對於專案根目錄。

## 部署配置

- **Build command**: `pnpm install --frozen-lockfile && pnpm build`
- **Build output**: `dist`
- **Branch**: main
- **D1 binding**: `DB`
- **KV binding**: `CMS_KV`
- **Secret**: `JWT_SECRET`
