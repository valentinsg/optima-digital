'use client';

import { DNU } from '@/types/dnuSystem';
import React from 'react';

interface DNUVisualEffectsProps {
  activeDNUs: DNU[];
}

const DNUVisualEffects: React.FC<DNUVisualEffectsProps> = ({ activeDNUs }) => {
  if (activeDNUs.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-red-600 text-white px-3 py-2 rounded-lg shadow-lg animate-pulse">
        <div className="flex items-center gap-2">
          <span className="text-lg">⚡</span>
          <span className="font-semibold text-sm">
            {activeDNUs.length} DNU{activeDNUs.length > 1 ? 's' : ''} Activo{activeDNUs.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DNUVisualEffects;
