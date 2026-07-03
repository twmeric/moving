import {
  Shield,
  Award,
  Clock,
  TrendingUp,
  Stethoscope,
  Sparkles,
  GraduationCap,
  Truck,
  Package,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Award,
  Clock,
  TrendingUp,
  Stethoscope,
  Sparkles,
  GraduationCap,
  Truck,
  Package,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Shield;
}
