import { useQueryClient } from '@tanstack/react-query'
import { usePortfolio, portfolioQueryKey } from '@/hooks/usePortfolio'
import { upsertSiteProfile, upsertSiteSettings } from '@/services/portfolio'
import { JsonEditor } from '@/features/admin/JsonEditor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import type { Profile } from '@/types/portfolio'

export function AdminDashboardPage() {
  const { caseStudies, technologies, timeline, philosophyPillars, resume } = usePortfolio()
  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-semibold">Dashboard</h1>
      <ul className="grid gap-3 sm:grid-cols-2">
        <li className="rounded-xl border border-border p-4">Case studies: {caseStudies.length}</li>
        <li className="rounded-xl border border-border p-4">Technologies: {technologies.length}</li>
        <li className="rounded-xl border border-border p-4">Timeline items: {timeline.length}</li>
        <li className="rounded-xl border border-border p-4">Philosophy: {philosophyPillars.length}</li>
        <li className="rounded-xl border border-border p-4">Resume projects: {resume.keyProjects.length}</li>
      </ul>
    </div>
  )
}

export function AdminProfilePage() {
  const { profile: initialProfile, siteVersion: initialVersion } = usePortfolio()
  const queryClient = useQueryClient()
  const [status, setStatus] = useState('')
  const [profile, setProfile] = useState<Profile>(initialProfile)
  const [siteVersion, setSiteVersion] = useState(initialVersion)

  async function save() {
    setStatus('')
    try {
      await upsertSiteProfile(profile)
      await upsertSiteSettings(siteVersion)
      await queryClient.invalidateQueries({ queryKey: portfolioQueryKey })
      setStatus('Saved.')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Save failed')
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-semibold">Profile</h1>
      <div className="space-y-2">
        <Label htmlFor="site-version">Site version</Label>
        <Input id="site-version" value={siteVersion} onChange={(event) => setSiteVersion(event.target.value)} />
      </div>
      <JsonEditor value={profile} onChange={setProfile} />
      <Button onClick={() => void save()}>Save profile</Button>
      {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
    </div>
  )
}
