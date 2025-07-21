'use client';

import { useHydrated } from '@/hooks/useHydrated';
import { ReactNode } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Componente que solo renderiza sus children después de la hidratación
 * Útil para contenido que puede causar diferencias entre servidor y cliente
 */
const ClientOnly = ({ children, fallback = null }: ClientOnlyProps) => {
  const hydrated = useHydrated();

  if (!hydrated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default ClientOnly;
