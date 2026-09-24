import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { getAdminBasePath } from '@/lib/env';
import { isAdminSession } from '@/features/admin/adminSession';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPending(true);
    setError('');
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: String(form.get('email') ?? ''),
      password: String(form.get('password') ?? ''),
    });
    setPending(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    if (!isAdminSession(data.session)) {
      await supabase.auth.signOut();
      setError('This account is not authorized for studio access.');
      return;
    }
    navigate(getAdminBasePath());
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,var(--bg-glow-blue),transparent_42%)]" />
      <form
        onSubmit={(event) => void onSubmit(event)}
        className="glass relative w-full max-w-md rounded-2xl p-8"
      >
        <p className="font-mono text-xs tracking-[0.22em] text-soft-cyan uppercase">
          rushak@studio
        </p>
        <div className="mt-2 flex items-start justify-between gap-3">
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            Sign in
          </h1>
          <ThemeToggle />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Private control plane for portfolio content, media, and inbox.
        </p>
        <div className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
            />
            <p className="text-xs text-muted-foreground">
              The admin account email. Submitting authenticates this browser
              session.
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
            <p className="text-xs text-muted-foreground">
              Account password. A successful sign-in opens Studio; a non-admin
              account is signed back out.
            </p>
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button
            type="submit"
            disabled={pending}
            className="w-full"
            size="lg"
            title="Sign in. Only accounts with the admin role can enter Studio."
          >
            {pending ? 'Authenticating…' : 'Enter studio'}
          </Button>
        </div>
      </form>
    </div>
  );
}
