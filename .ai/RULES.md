# 御搬遷 Premier Relocations - 專案規則

## 專案資訊

- **專案路徑**: `E:\Projects\moving`
- **類型**: React SPA + Cloudflare Pages + Pages Functions + D1 + KV + R2
- **域名**: `https://moving-3vf.pages.dev`
- **GitHub**: `https://github.com/twmeric/moving`
- **套件管理器**: pnpm（強制）

## 技術棧

- React 18 + TypeScript + Vite 7
- Tailwind CSS 3 + Framer Motion
- Cloudflare Pages Functions (Hono)
- Cloudflare D1（CRM / 預約數據）
- Cloudflare KV（CMS 內容）
- Cloudflare R2（圖片靜態資源）

## 架構決策

1. **Pages Functions 作為 API**: 與前端同域名，避免 CORS。
2. **CMS 數據存 KV**: 單一 key `cms_data` 存整份 JSON，便於 Admin 編輯。
3. **CRM 與預約存 D1**: 結構化數據，支援查詢與統計。
4. **圖片存 R2**: 所有圖片必須從 youware 遷移到 R2，使用 `pub-*.r2.dev` 公共網址。
5. **認證**: JWT + Wrangler Secret `JWT_SECRET`，帳號 `twmeric` / 密碼 `admin360`。
6. **預約提交**: 儲存到 D1 後，返回 `wa.me` 預填訊息連結。
7. **SPA 路由**: 使用 `functions/[[path]].ts` + `public/_routes.json` 處理前端路由 fallback。
8. **後台隱藏**: `/admin` 與 `/crm` 不出現在公開 Navbar / Footer / Sitemap。
9. **後台合併**: CMS 與 CRM 統一在 `src/admin/AdminDashboard.tsx`，頂層 tab 切換。
10. **自動部署**: GitHub Actions push 到 `main` 時自動部署。

## 開發守則

- 遵從母機守則 Rule 06: 先查 `SOULS/tokens/` 再問用戶要 token。
- 遵從母機守則 Rule 12: CMS 新欄位 **Admin Form First**。
- 遵從母機守則 Rule 18: 使用 pnpm，禁止 npm。
- 遵從母機守則 Rule 19: KV namespace 獨立，不可與其他專案混用。
- 遵從母機守則 Rule 25: 行動前先規劃，評估 Multi-Agent 並行。
- 遵從母機守則 Rule 34: Shell 自動化測試優先，部署後必須 curl 驗證。
- 遵從母機守則 Rule 40: Cloudflare Pages SPA + Functions 反模式。
- 遵從母機守則 Rule 41: Youware source code 部署 SOP。
- 遵從母機守則 Rule 42: 管理後台不得出現在公開導航。
- 所有文本文件使用 UTF-8 無 BOM。
- 所有路徑使用絕對路徑或相對於專案根目錄。
- 完成任務後必須整理本地 folder，移除模板殘留與未使用依賴。

## 部署配置

- **Build command**: `pnpm install --ignore-workspace --frozen-lockfile && pnpm build`
- **Build output**: `dist`
- **Branch**: main
- **D1 binding**: `DB`
- **KV binding**: `CMS_KV`
- **Secret**: `JWT_SECRET`
- **GitHub Secrets**: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
