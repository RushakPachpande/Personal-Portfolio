import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { portfolioQueryKey, usePortfolio } from '@/hooks/usePortfolio'
import {
  deletePhilosophyPillar,
  deleteTechnology,
  deleteTimelineItem,
  replaceResumeData,
  replaceTerminalCommands,
  upsertPhilosophyPillar,
  upsertTechnology,
  upsertTimelineItem,
  uploadPortfolioFile,
} from '@/services/portfolio'
import { MEDIA_BUCKET } from '@/lib/supabase'
import { JsonEditor } from '@/features/admin/JsonEditor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type {
  PhilosophyPillar,
  ResumeData,
  TerminalCommand,
  TimelineItem,
} from '@/types/portfolio'

function SaveBar({ onSave, status }: { onSave: () => void; status: string }) {
  return (
    <div className="flex items-center gap-3">
      <Button onClick={onSave}>Save</Button>
      {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
    </div>
  )
}

export function AdminTechnologiesPage() {
  const { technologies } = usePortfolio()
  const queryClient = useQueryClient()
  const [items, setItems] = useState(technologies)
  const [status, setStatus] = useState('')

  async function save() {
    try {
      await Promise.all(items.map((item, index) => upsertTechnology(item, index)))
      const removed = technologies.filter((tech) => !items.some((item) => item.id === tech.id))
      await Promise.all(removed.map((tech) => deleteTechnology(tech.id)))
      await queryClient.invalidateQueries({ queryKey: portfolioQueryKey })
      setStatus('Saved.')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Save failed')
    }
  }

  async function uploadLogo(id: string, file: File) {
    const path = `tech/${id}${file.name.slice(file.name.lastIndexOf('.')) || '.svg'}`
    await uploadPortfolioFile(MEDIA_BUCKET, path, file)
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, logoPath: path, logo: path } : item)),
    )
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-semibold">Technologies</h1>
      <div className="space-y-2">
        <Label>Replace logo for id</Label>
        <Input
          type="file"
          accept="image/*,.svg"
          onChange={(event) => {
            const file = event.target.files?.[0]
            const id = window.prompt('Technology id for this logo?')
            if (file && id) void uploadLogo(id, file)
          }}
        />
      </div>
      <JsonEditor value={items} onChange={setItems} />
      <SaveBar onSave={() => void save()} status={status} />
    </div>
  )
}

export function AdminTimelinePage() {
  const { timeline } = usePortfolio()
  const queryClient = useQueryClient()
  const [items, setItems] = useState<TimelineItem[]>(timeline)
  const [status, setStatus] = useState('')

  async function save() {
    try {
      await Promise.all(items.map((item, index) => upsertTimelineItem(item, index)))
      const removed = timeline.filter((item) => !items.some((entry) => entry.id === item.id))
      await Promise.all(removed.map((item) => deleteTimelineItem(item.id)))
      await queryClient.invalidateQueries({ queryKey: portfolioQueryKey })
      setStatus('Saved.')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Save failed')
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-semibold">Timeline</h1>
      <JsonEditor value={items} onChange={setItems} />
      <SaveBar onSave={() => void save()} status={status} />
    </div>
  )
}

export function AdminPhilosophyPage() {
  const { philosophyPillars } = usePortfolio()
  const queryClient = useQueryClient()
  const [items, setItems] = useState<PhilosophyPillar[]>(philosophyPillars)
  const [status, setStatus] = useState('')

  async function save() {
    try {
      await Promise.all(items.map((item, index) => upsertPhilosophyPillar(item, index)))
      const removed = philosophyPillars.filter((item) => !items.some((entry) => entry.id === item.id))
      await Promise.all(removed.map((item) => deletePhilosophyPillar(item.id)))
      await queryClient.invalidateQueries({ queryKey: portfolioQueryKey })
      setStatus('Saved.')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Save failed')
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-semibold">Philosophy</h1>
      <JsonEditor value={items} onChange={setItems} />
      <SaveBar onSave={() => void save()} status={status} />
    </div>
  )
}

export function AdminResumePage() {
  const { resume } = usePortfolio()
  const queryClient = useQueryClient()
  const [data, setData] = useState<ResumeData>(resume)
  const [status, setStatus] = useState('')

  async function save() {
    try {
      await replaceResumeData(data)
      await queryClient.invalidateQueries({ queryKey: portfolioQueryKey })
      setStatus('Saved.')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Save failed')
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-semibold">Resume</h1>
      <JsonEditor value={data} onChange={setData} rows={32} />
      <SaveBar onSave={() => void save()} status={status} />
    </div>
  )
}

export function AdminTerminalPage() {
  const { terminalCommands } = usePortfolio()
  const queryClient = useQueryClient()
  const [commands, setCommands] = useState<TerminalCommand[]>(terminalCommands)
  const [status, setStatus] = useState('')

  async function save() {
    try {
      await replaceTerminalCommands(commands)
      await queryClient.invalidateQueries({ queryKey: portfolioQueryKey })
      setStatus('Saved.')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Save failed')
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-semibold">Terminal commands</h1>
      <JsonEditor value={commands} onChange={setCommands} />
      <SaveBar onSave={() => void save()} status={status} />
    </div>
  )
}
