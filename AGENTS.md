# Premier Relocations / 御搬遷 — Agent Guide

## 專案概覽

- **名稱**: Premier Relocations（御搬遷）
- **路徑**: `E:\Projects\moving`
- **技術棧**: React 18 + TypeScript + Vite 7 + Tailwind CSS 3 + pnpm
- **部署**: Cloudflare Pages (`https://moving-3vf.pages.dev`)
- **後端**: Cloudflare Pages Functions (Hono) + D1 + KV + R2

## 核心約定

### 1. 後台入口隱藏

- `/admin`（CMS）與 `/crm`（客戶管理）**不得**出現在公開 Navbar、Footer 或 Sitemap
- 內部人員直接輸入網址進入
- 已統一合併到 `src/admin/AdminDashboard.tsx`，用頂層 tab 切換 CMS / CRM

### 2. 資產管理

- 所有圖片必須放在 Cloudflare R2 (`moving-assets` bucket)
- 公開 URL 格式: `https://pub-179cbd5da016416596e397bcd3acbd37.r2.dev/images/{file}.jpg`
- 禁止在生產環境保留 `public.youware.com` 網址

### 3. 自動部署

- GitHub Actions 在 push 到 `main` 時自動部署
- 所需 Secrets: `CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`
- Token 來源: `E:\Projects\motherbase\SOULS\tokens\cloudflare_credentials.md`

### 4. 本地開發

```powershell
cd E:\Projects\moving
pnpm install --ignore-workspace
pnpm build
pnpm pages:dev    # wrangler pages dev
```

### 5. 母機守則關聯

執行本專案前必須載入：

- Rule 25: SOP（規劃 + Multi-Agent）
- Rule 40: Cloudflare Pages SPA + Functions 反模式
- Rule 41: Youware source code 部署 SOP
- Rule 42: 管理後台不得出現在公開導航

## 常見坑

- `pnpm install --frozen-lockfile` 會因上層 workspace 失敗，必須加 `--ignore-workspace`
- `wrangler.toml` **不要** 放 `[build]` section
- PowerShell 中發送中文到 D1/KV 前必須 `chcp 65001`
