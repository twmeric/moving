import type { CMSData } from '../types';

export const defaultCMSData: CMSData = {
  site: {
    name: '御搬遷',
    tagline: 'Premier Relocations',
    phone: '+852 1234 5678',
    whatsappNumber: '85212345678',
    email: 'info@premier-relocations.hk',
    address: '九龍灣宏照道18號\n企業廣場5期 12樓',
    licenseNumber: '牌照編號：XXXX-XXXX',
    copyright: '© 2026 御搬遷 Premier Relocations. All rights reserved.',
  },
  hero: {
    eyebrow: 'Since 1996 · 香港企業搬遷領導品牌',
    title: ['精密搬遷', '守護企業資產'],
    highlight: '守護企業資產',
    description:
      '三十年專注醫療、美容及教育機構精密設備搬遷，配備防震防靜電專業包裝，百萬級物流保險全程承保，讓您安心交付每一件珍貴儀器。',
    primaryCta: '立即預約免費上門評估',
    secondaryCta: '瀏覽專業範疇',
    backgroundImage:
      'https://public.youware.com/users-website-assets/prod/f723e7d2-dbd0-4b58-bb0d-ff8d15522d3f/0b7c8f25f86548c58d70f853128c255d',
  },
  stats: [
    { value: '30+', label: '年行業經驗' },
    { value: '5,000+', label: '企業客戶' },
    { value: '100%', label: '零損率承諾' },
    { value: '$500萬', label: '物流保險' },
  ],
  trust: {
    eyebrow: 'Why Choose Us',
    title: '企業信賴的搬遷夥伴',
    description:
      '從精密醫療設備到珍貴美容儀器，我們以極致專業守護您的核心資產',
    image:
      'https://public.youware.com/users-website-assets/prod/f723e7d2-dbd0-4b58-bb0d-ff8d15522d3f/ead74e14218b49828200ea9200aa32e4',
    badge: '安全第一',
    features: [
      {
        icon: 'Shield',
        title: '百萬級保險',
        desc: '每次搬遷均承保高達$500萬物流保險，全程無憂',
        color: 'from-blue-500 to-cyan-500',
      },
      {
        icon: 'Award',
        title: '防震防靜電',
        desc: '專利包裝技術，符合醫療級別精密設備運輸標準',
        color: 'from-violet-500 to-purple-500',
      },
      {
        icon: 'Clock',
        title: '準時零延誤',
        desc: '精確到分鐘的時間管理，絕不影響您的營業時間',
        color: 'from-emerald-500 to-teal-500',
      },
      {
        icon: 'TrendingUp',
        title: '30年零事故',
        desc: '三十年來保持零損壞紀錄，業界最高安全標準',
        color: 'from-amber-500 to-orange-500',
      },
    ],
  },
  services: {
    eyebrow: 'Specialized Services',
    title: 'B2B 專業搬遷範疇',
    items: [
      {
        id: 'medical',
        icon: 'Stethoscope',
        title: '醫療診所搬遷',
        subtitle: 'Medical & Clinical Relocation',
        image:
          'https://public.youware.com/users-website-assets/prod/f723e7d2-dbd0-4b58-bb0d-ff8d15522d3f/537df38e9bf9438aab4dec654a64aa14',
        description:
          '專為醫療機構度身設計的搬遷方案，嚴格遵循衛生署規定及設備製造商標準，確保精密醫療儀器安全無損轉移。',
        features: [
          { title: '牙科椅搬遷', desc: '專業拆裝團隊，符合水路氣路技術標準' },
          { title: 'X光機 / CT / MRI', desc: '鉛板防護運輸，專業校準服務' },
          { title: '手術室設備', desc: '無塵包裝技術，確保醫療級潔淨度' },
          { title: '藥品冷鏈運輸', desc: '溫控物流車隊，全程溫度監控記錄' },
        ],
        specs: [
          '符合 ISO 13485 醫療器材運輸標準',
          '持有危險品運輸牌照',
          '提供搬後設備校準服務',
        ],
        badge: '醫療級標準',
      },
      {
        id: 'beauty',
        icon: 'Sparkles',
        title: '美容中心物流',
        subtitle: 'Beauty & Wellness Logistics',
        image:
          'https://public.youware.com/users-website-assets/prod/f723e7d2-dbd0-4b58-bb0d-ff8d15522d3f/c7db5e35a9164419b78ba61ace04a130',
        description:
          '針對美容集團連鎖營運模式，提供跨分店物資調配、新店開業物流及大型醫美儀器安全運輸。',
        features: [
          { title: '跨分店物資調配', desc: '統一排程系統，高效調配產品及設備' },
          { title: 'HIFU / 激光設備', desc: '防震氣墊包裝，光學元件專用固定' },
          { title: '新店開業物流', desc: '一站式傢俬設備安裝及廢料清理' },
          { title: '美容床 / 水療設備', desc: '定制木架保護，液壓系統防漏處理' },
        ],
        specs: [
          '支援夜間搬遷避開營業時間',
          '提供臨時倉儲服務',
          '全程保險涵蓋精密儀器',
        ],
        badge: '防震運輸',
      },
      {
        id: 'education',
        icon: 'GraduationCap',
        title: '教育機構搬運',
        subtitle: 'Education & Exhibition',
        image:
          'https://public.youware.com/users-website-assets/prod/f723e7d2-dbd0-4b58-bb0d-ff8d15522d3f/3470d9f499ae425ab5854b02a9cb8c78',
        description:
          '從學校鋼琴到實驗室精密儀器，提供教育機構專屬的安全搬運方案，配合學校假期靈活排程。',
        features: [
          { title: '鋼琴及大型樂器', desc: '恆溫恆濕運輸，鋼琴專用吊運設備' },
          { title: '實驗室設備', desc: '化學品安全包裝，精密天平防震運輸' },
          { title: 'IT 機房遷移', desc: '伺服器不停機搬遷，網絡重新部署' },
          { title: '圖書館及展品', desc: '文物級包裝標準，恆溫環境運輸' },
        ],
        specs: [
          '配合學校假期排程',
          '可申請教育機構專屬折扣',
          '提供臨時通行證代辦服務',
        ],
        badge: '專業認證',
      },
    ],
  },
  process: {
    eyebrow: 'Our Process',
    title: '四步完成精密搬遷',
    description: '從預約到完工，每一步都經過嚴謹規劃',
    backgroundImage:
      'https://public.youware.com/users-website-assets/prod/f723e7d2-dbd0-4b58-bb0d-ff8d15522d3f/61b009cda9534ca8aab1ea735b10d375',
    steps: [
      {
        step: '01',
        title: '免費上門評估',
        desc: '專業團隊親臨現場，詳細記錄設備規格與搬遷路線',
        color: 'from-blue-400 to-cyan-400',
      },
      {
        step: '02',
        title: '訂製物流方案',
        desc: '根據設備特性制定防震包裝、運輸路線及時間表',
        color: 'from-violet-400 to-purple-400',
      },
      {
        step: '03',
        title: '專業執行搬遷',
        desc: '持證團隊按計劃執行，全程GPS追蹤及即時回報',
        color: 'from-amber-400 to-orange-400',
      },
      {
        step: '04',
        title: '驗收與保養',
        desc: '設備安裝調試完畢，提供搬後30天免費保養期',
        color: 'from-emerald-400 to-teal-400',
      },
    ],
  },
  cta: {
    title: ['準備為您的企業', '制定專屬搬遷方案'],
    highlight: '制定專屬搬遷方案',
    description:
      '立即預約免費上門評估，我們的資深顧問將親臨貴公司，為您度身訂造最安全高效的搬遷計劃。',
    primaryCta: '立即預約免費上門評估',
    phoneCta: '致電',
  },
  footer: {
    brandDesc: '三十年企業精密搬遷經驗，守護您的每一件珍貴資產。',
    serviceLinks: [
      { label: '醫療診所搬遷', href: '/services' },
      { label: '美容中心物流', href: '/services' },
      { label: '教育機構搬運', href: '/services' },
      { label: '展覽會場佈置', href: '/services' },
    ],
    companyLinks: [
      { label: '關於我們', href: '/' },
      { label: '預約評估', href: '/booking' },
      { label: '服務保障', href: '/services' },
      { label: '合作夥伴', href: '/' },
    ],
  },
};

export function deepMergeDefaults(stored: Partial<CMSData>): CMSData {
  const merged = JSON.parse(JSON.stringify(defaultCMSData)) as CMSData;

  if (stored.site) Object.assign(merged.site, stored.site);
  if (stored.hero) Object.assign(merged.hero, stored.hero);
  if (stored.stats) merged.stats = stored.stats;
  if (stored.trust) {
    Object.assign(merged.trust, stored.trust);
    if (stored.trust.features) merged.trust.features = stored.trust.features;
  }
  if (stored.services) {
    Object.assign(merged.services, stored.services);
    if (stored.services.items) merged.services.items = stored.services.items;
  }
  if (stored.process) {
    Object.assign(merged.process, stored.process);
    if (stored.process.steps) merged.process.steps = stored.process.steps;
  }
  if (stored.cta) Object.assign(merged.cta, stored.cta);
  if (stored.footer) Object.assign(merged.footer, stored.footer);

  return merged;
}
