import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPublicPortfolio } from '@/services/portfolio-public';
import type { PortfolioData } from '@/types/portfolio';

export const portfolioQueryKey = ['portfolio'] as const;

export const PortfolioContext = createContext<PortfolioData | null>(null);

export function usePublicPortfolioQuery() {
  return useQuery({
    queryKey: portfolioQueryKey,
    queryFn: fetchPublicPortfolio,
    staleTime: 1000 * 60 * 5,
  });
}

export function useOptionalPortfolio() {
  return useContext(PortfolioContext);
}

export function usePortfolio() {
  const value = useOptionalPortfolio();
  if (!value) {
    throw new Error('usePortfolio must be used within PortfolioContext');
  }
  return value;
}
