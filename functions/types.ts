export interface Env {
  DB: D1Database;
  CMS_KV: KVNamespace;
  JWT_SECRET: string;
}

export interface JWTPayload {
  username: string;
  iat: number;
  exp: number;
}

export interface CMSData {
  site: {
    name: string;
    tagline: string;
    phone: string;
    whatsappNumber: string;
    email: string;
    address: string;
    licenseNumber: string;
    copyright: string;
  };
  hero: {
    eyebrow: string;
    title: string[];
    highlight: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    backgroundImage: string;
  };
  stats: {
    value: string;
    label: string;
  }[];
  trust: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    badge: string;
    features: {
      icon: string;
      title: string;
      desc: string;
      color: string;
    }[];
  };
  services: {
    eyebrow: string;
    title: string;
    items: ServiceItem[];
  };
  process: {
    eyebrow: string;
    title: string;
    description: string;
    backgroundImage: string;
    steps: {
      step: string;
      title: string;
      desc: string;
      color: string;
    }[];
  };
  cta: {
    title: string[];
    highlight: string;
    description: string;
    primaryCta: string;
    phoneCta: string;
  };
  footer: {
    brandDesc: string;
    serviceLinks: { label: string; href: string }[];
    companyLinks: { label: string; href: string }[];
  };
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  features: { title: string; desc: string }[];
  specs: string[];
  badge: string;
}

export interface Client {
  id: string;
  company: string;
  status: 'active' | 'inactive';
  specialNotes: string[];
  branches: Branch[];
}

export interface Branch {
  id: string;
  clientId: string;
  name: string;
  address: string;
  contact: string;
  phone: string;
}

export interface Order {
  id: string;
  clientId: string;
  company: string;
  type: string;
  status: 'pending' | 'quoted' | 'confirmed' | 'completed';
  date: string;
  amount: string;
  notes: string;
}

export interface Booking {
  id?: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  relocationType: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  createdAt?: string;
}
