import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { getAdminBasePath } from '@/lib/env'
import { portfolioQueryKey, usePortfolio } from '@/hooks/usePortfolio'
import { deleteCaseStudy, refreshTechnologyUsage, upsertCaseStudy, uploadPortfolioFile } from '@/services/portfolio'
import { MEDIA_BUCKET } from '@/lib/supabase'
import { JsonEditor } from '@/features/admin/JsonEditor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { CaseStudy } from '@/types/portfolio'

const emptyStudy = (): CaseStudy => ({
  slug: '',
  category: 'platform',
  name: '',
  summary: '',
  status: 'Draft',
  technologies: [],
  stack: [],
  businessContext: '',
  problem: '',
  objective: '',
  solution: '',
  architecture: '',
  responsibilities: [],
  decisions: [],
  challenges: [],
  outcome: '',
  learnings: [],
  relatedSlugs: [],
})

export function AdminCaseStudiesPage() {
  const { caseStudies } = usePortfolio()
  const base = getAdminBasePath()
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold">Case studies</h1>
        <Button asChild>
          <Link to={`${base}/case-studies/new`}>New</Link>
        </Button>
      </div>
      <ul className="space-y-2">
        {caseStudies.map((study) => (
          <li key={study.slug} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
            <span>
              {study.name}{' '}
              <span className="text-xs text-muted-foreground">
                {study.category} · {study.status}
              </span>
            </span>
            <Button asChild variant="outline" size="sm">
              <Link to={`${base}/case-studies/${study.slug}`}>Edit</Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function AdminCaseStudyEditPage({ slug }: { slug?: string }) {
  const { caseStudies } = usePortfolio()
  const queryClient = useQueryClient()
  const existing = slug ? caseStudies.find((study) => study.slug === slug) : undefined
  const [study, setStudy] = useState<CaseStudy>(existing ?? { ...emptyStudy(), slug: slug ?? '' })
  const [status, setStatus] = useState('')
  const base = getAdminBasePath()

  async function upload(kind: 'logo' | 'cover' | 'gallery', file: File) {
    const path = `uploads/${study.slug || 'draft'}/${kind}-${Date.now()}-${file.name}`
    const url = await uploadPortfolioFile(MEDIA_BUCKET, path, file)
    if (kind === 'logo') setStudy((current) => ({ ...current, logo: path, coverImage: current.coverImage }))
    if (kind === 'cover') setStudy((current) => ({ ...current, coverImage: path }))
    if (kind === 'gallery') {
      setStudy((current) => ({
        ...current,
        gallery: [...(current.gallery ?? []), { src: path, caption: file.name, type: 'screenshot' }],
      }))
    }
    setStatus(`Uploaded ${kind} (${url ? 'ok' : ''})`)
  }

  async function save() {
    setStatus('')
    try {
      const sortOrder = existing ? caseStudies.findIndex((item) => item.slug === existing.slug) : caseStudies.length
      await upsertCaseStudy(study, sortOrder < 0 ? caseStudies.length : sortOrder)
      await refreshTechnologyUsage()
      await queryClient.invalidateQueries({ queryKey: portfolioQueryKey })
      setStatus('Saved.')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Save failed')
    }
  }

  async function remove() {
    if (!study.slug) return
    await deleteCaseStudy(study.slug)
    await refreshTechnologyUsage()
    await queryClient.invalidateQueries({ queryKey: portfolioQueryKey })
    window.location.href = `${base}/case-studies`
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-semibold">{existing ? 'Edit case study' : 'New case study'}</h1>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Logo</Label>
          <Input type="file" accept="image/*" onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) void upload('logo', file)
          }} />
        </div>
        <div className="space-y-2">
          <Label>Cover</Label>
          <Input type="file" accept="image/*" onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) void upload('cover', file)
          }} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Gallery image</Label>
          <Input type="file" accept="image/*" onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) void upload('gallery', file)
          }} />
        </div>
      </div>
      <JsonEditor value={study} onChange={setStudy} rows={28} />
      <div className="flex gap-2">
        <Button onClick={() => void save()}>Save</Button>
        {existing ? (
          <Button variant="destructive" onClick={() => void remove()}>
            Delete
          </Button>
        ) : null}
      </div>
      {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
    </div>
  )
}
