# 御搬遷 Premier Relocations - B2B 企業搬遷官網

## 項目概述

香港30年企業精密搬遷專家官方網站，專注醫療診所、美容中心及教育機構。採用愛馬仕設計美學，深藍搭配香檳金配色方案。

## 項目狀態

- **項目類型**: React + TypeScript 單頁應用（SPA）
- **構建工具**: Vite 7.0
- **樣式系統**: Tailwind CSS 3.4（自定義設計系統）
- **路由**: React Router DOM v6
- **動效**: Framer Motion
- **圖標**: Lucide React
- **套件管理器**: npm（package-lock.json）

## 核心頁面

1. **首頁** (`/`) - Hero + 信任指標 + 服務預覽 + 流程展示 + CTA
2. **專業範疇** (`/services`) - 醫療、美容、教育三大專業搬遷服務詳情
3. **預約評估** (`/booking`) - 智能排程預約表單（公司名、聯絡人、搬遷類型、日期時段）
4. **CRM 後台** (`/crm`) - 客戶檔案管理、特殊要求備忘、報價訂單追蹤

## 設計系統

- **色彩**: 深藍（navy-900: #0A1628）+ 香檳金（gold-400: #D4AF37）+ 奶白色背景（cream-50）
- **字體**: Playfair Display（標題）+ Inter（正文）
- **風格**: 愛馬仕風格 - 方正邊框、留白空間、金色線條分隔、無圓角按鈕

## 架構決策

- 使用 React Router 的 SPA 架構（未來可按需改為 SSR）
- CRM 目前使用 Mock Data，可接入 Supabase 後端
- 預約表單提交模擬完成，可接入 Webhook / Email 通知
- 所有動畫使用 Framer Motion viewport 觸發

## 構建命令

```bash
npm install
npm run build
npm run dev      # 本地開發
```
