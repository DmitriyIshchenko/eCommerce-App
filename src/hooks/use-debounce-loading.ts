import { useRouterState } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useLoading } from './use-loading';

export default function useDebounceLoading(delay = 500) {
  const { isLoading: isRouterLoad, isTransitioning } = useRouterState();
  const { loading } = useLoading();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let id: NodeJS.Timeout | null = null;
    if (isRouterLoad || loading || isTransitioning) {
      if (id) clearTimeout(id);
      setIsLoading(true);
    } else {
      id = setTimeout(() => {
        setIsLoading(false);
      }, delay);
    }
    return () => {
      if (id) clearTimeout(id);
    };
  }, [isRouterLoad, loading, isTransitioning, delay]);
  return isLoading;
}
