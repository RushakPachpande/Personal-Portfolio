import { useEffect, useState, type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { getAdminBasePath } from '@/lib/env';
import { isAdminSession } from '@/features/admin/adminSession';

export function AdminGuard({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    void supabase.auth
      .getSession()
      .then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, next) =>
      setSession(next)
    );
    return () => data.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center font-mono text-sm text-muted-foreground">
        Checking session...
      </div>
    );
  }

  if (!isAdminSession(session)) {
    return (
      <Navigate
        to={`${getAdminBasePath()}/login`}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}
