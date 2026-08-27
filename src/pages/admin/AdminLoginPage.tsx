import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { getAdminBasePath } from '@/lib/env'
import { isAdminSession } from '@/features/admin/AdminGuard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setPending(true)
    setError('')
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: String(form.get('email') ?? ''),
      password: String(form.get('password') ?? ''),
    })
    setPending(false)
    if (authError) {
      setError(authError.message)
      return
    }
    if (!isAdminSession(data.session)) {
      await supabase.auth.signOut()
      setError('This account is not authorized for studio access.')
      return
    }
    navigate(getAdminBasePath())
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={(event) => void onSubmit(event)}
        className="glass w-full max-w-sm space-y-4 rounded-2xl p-6"
      >
        <h1 className="font-display text-2xl font-semibold">Studio sign in</h1>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required autoComplete="username" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required autoComplete="current-password" />
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </div>
  )
}
