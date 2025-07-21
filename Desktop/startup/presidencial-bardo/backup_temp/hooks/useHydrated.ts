import { useEffect, useState } from 'react';

/**
 * Hook para detectar si el componente se ha hidratado en el cliente
 * Útil para evitar errores de hidratación con contenido dinámico
 */
export const useHydrated = (): boolean => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
};

export default useHydrated;
