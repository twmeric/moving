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
- 域名：`moving.pages.dev`
- 使用 GitHub + Cloudflare Pages 自動部署
- 保留原有愛馬仕設計風格

### 風險與規避
1. youware 外部圖片可能失效 → CMS 化後可替換，並保留本地 fallback。
2. BrowserRouter SPA refresh 404 → 使用 `_routes.json` 處理。
3. 跨專案 KV 污染 → 新建獨立 KV namespace。
4. 未認證用戶訪問 CRM → JWT middleware 保護。
