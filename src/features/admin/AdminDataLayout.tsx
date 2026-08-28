import { AdminLayout } from '@/features/admin/AdminLayout';
import {
  PortfolioContext,
  usePublicPortfolioQuery,
} from '@/hooks/usePortfolio';

export function AdminDataLayout() {
  const query = usePublicPortfolioQuery();

  if (query.isError) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        <p className="text-sm text-muted-foreground">
          Unable to load studio data from Supabase.
        </p>
      </div>
    );
  }

  if (query.isPending || !query.data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6">
        <div className="studio-skeleton h-4 w-48" />
        <div className="studio-skeleton h-32 w-full max-w-md" />
        <p className="font-mono text-sm text-muted-foreground">
          Loading studio...
        </p>
      </div>
    );
  }

  return (
    <PortfolioContext.Provider value={query.data}>
      <AdminLayout />
    </PortfolioContext.Provider>
  );
}
