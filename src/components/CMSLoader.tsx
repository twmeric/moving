import React from 'react';
import { Loader2 } from 'lucide-react';

export const CMSLoader: React.FC = () => (
  <div className="min-h-[50vh] flex items-center justify-center bg-cream-50">
    <Loader2 className="animate-spin text-gold-500" size={32} />
  </div>
);
