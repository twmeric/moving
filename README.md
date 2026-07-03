# 御搬遷 Premier Relocations

Cloudflare Pages 企業搬遷官網 + 可編輯 CMS + CRM 後台。

**線上網址**: https://moving-3vf.pages.dev

## 功能

- 🏠 企業官網（首頁、專業範疇、預約評估）
- 📝 CMS 內容管理（`/admin`）
- 📊 CRM 客戶與訂單管理（`/crm`）
- 💬 預約表單自動導向 WhatsApp
- 🔐 JWT 登入認證

## 技術棧

- React 18 + TypeScript + Vite
- Tailwind CSS + Framer Motion
- Cloudflare Pages + Pages Functions (Hono)
- Cloudflare D1（CRM / 預約數據）
- Cloudflare KV（CMS 內容）
- Cloudflare R2（圖片靜態資源）

## 開發指令

```bash
pnpm install --ignore-workspace
pnpm dev              # 前端開發
pnpm pages:dev        # Pages Functions 本地開發
pnpm build            # 生產構建
pnpm db:migrate:local # 本地 D1 遷移
```

## 部署

GitHub Actions 會在推送到 `main` 分支時自動部署到 Cloudflare Pages。

手動部署：

```bash
pnpm pages:deploy
```

## 初始帳號

- 帳號：`twmeric`
- 密碼：`admin360`

## 後台入口

- CMS: `/admin`
- CRM: `/crm`
- 後台連結**不會**顯示在公開導航，需直接輸入網址。

## 專案文件

- `AGENTS.md` — Agent 操作指南
- `.ai/RULES.md` — 專案特定規則
- `.ai/MEMORY.md` — 歷史會話記憶
- `docs/YOUWARE_SOURCE.md` — 原始 Youware 模板參考

## 母機守則

- Rule 06: API Token 管理（先查母機 token）
- Rule 18: 使用 pnpm
- Rule 19: KV Namespace 獨立
- Rule 25: SOP（規劃 + Multi-Agent）
- Rule 34: Shell 自動化測試優先
- Rule 40: Cloudflare Pages SPA + Functions 反模式
- Rule 41: Youware source code 部署 SOP
- Rule 42: 管理後台不得出現在公開導航
