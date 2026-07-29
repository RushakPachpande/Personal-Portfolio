import { profile } from '@/content/profile'

export type PageMeta = {
  title: string
  description: string
  path?: string
}

export function buildTitle(pageTitle?: string) {
  if (!pageTitle) return `${profile.name} | ${profile.role}`
  return `${pageTitle} | ${profile.name}`
}

export function defaultDescription() {
  return profile.description
}
