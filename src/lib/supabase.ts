import { createClient } from '@supabase/supabase-js'
import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/env'

export const supabase = createClient(getSupabaseUrl(), getSupabaseAnonKey(), {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

export const MEDIA_BUCKET = 'portfolio-media'
export const RESUME_BUCKET = 'portfolio-resume'

export function publicMediaUrl(path: string) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('blob:')) {
    return path
  }
  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export function publicResumeUrl(path = 'resume.pdf') {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const { data } = supabase.storage.from(RESUME_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export function toMediaPath(value: string) {
  const marker = '/object/public/portfolio-media/'
  const index = value.indexOf(marker)
  if (index >= 0) return decodeURIComponent(value.slice(index + marker.length))
  return value
}
