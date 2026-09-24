import type { Session } from '@supabase/supabase-js';

export function isAdminSession(session: Session | null) {
  return session?.user.app_metadata?.role === 'admin';
}
