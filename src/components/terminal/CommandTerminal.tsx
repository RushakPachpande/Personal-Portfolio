import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TerminalSquare, X } from 'lucide-react'
import { profile } from '@/content/profile'
import { products } from '@/content/products'
import { initiatives } from '@/content/initiatives'
import { resolveTerminalInput, terminalCommands } from '@/content/terminal'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Line = { type: 'input' | 'output' | 'system'; text: string }

type CommandTerminalProps = {
  open: boolean
  onClose: () => void
}

export function CommandTerminal({ open, onClose }: CommandTerminalProps) {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [history, setHistory] = useState<Line[]>([
    {
      type: 'system',
      text: 'Interactive command terminal ready. Type `help` to begin.',
    },
  ])
  const [value, setValue] = useState('')

  const commandHelp = useMemo(
    () =>
      terminalCommands
        .map((command) => `  ${command.name.padEnd(18)} ${command.description}`)
        .join('\n'),
    [],
  )

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) onClose()
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        if (open) onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, open])

  const push = (lines: Line[]) => setHistory((prev) => [...prev, ...lines])

  const run = (raw: string) => {
    const input = resolveTerminalInput(raw)
    if (!input) return

    push([{ type: 'input', text: `> ${raw}` }])

    if (input === 'clear') {
      setHistory([])
      setValue('')
      return
    }

    if (input === 'help') {
      push([{ type: 'output', text: `Available commands:\n${commandHelp}` }])
    } else if (input === 'about') {
      push([
        {
          type: 'output',
          text: `${profile.name}\n${profile.role}\n${profile.location}\n\n${profile.about.whoIAm}`,
        },
      ])
      navigate('/about')
    } else if (input === 'work' || input === 'projects') {
      push([
        {
          type: 'output',
          text: products.map((product) => `• ${product.name} — ${product.role}`).join('\n'),
        },
      ])
      navigate('/work')
    } else if (input === 'infrastructure') {
      push([
        {
          type: 'output',
          text: initiatives.map((item) => `• ${item.name}`).join('\n'),
        },
      ])
      navigate('/infrastructure')
    } else if (input === 'automation') {
      push([
        {
          type: 'output',
          text: 'Automation: self-hosted n8n, Microsoft integrations, operational improvements.',
        },
      ])
      navigate('/automation')
    } else if (input === 'experience') {
      push([{ type: 'output', text: 'Opening experience timeline…' }])
      navigate('/experience')
    } else if (input === 'philosophy') {
      push([{ type: 'output', text: 'Opening engineering philosophy…' }])
      navigate('/philosophy')
    } else if (input === 'resume') {
      push([
        {
          type: 'output',
          text: `Resume download path: ${profile.resumeUrl}`,
        },
      ])
      window.open(profile.resumeUrl, '_blank')
    } else if (input === 'contact') {
      push([
        {
          type: 'output',
          text: `Email: ${profile.email}\nLinkedIn: ${profile.socials.linkedin}\nGitHub: ${profile.socials.github}`,
        },
      ])
      navigate('/contact')
    } else if (input === 'whoami') {
      push([
        {
          type: 'output',
          text: 'rushak — platform engineer. Builds complete digital platforms from infrastructure to production.',
        },
      ])
    } else if (input === 'deploy') {
      push([
        {
          type: 'output',
          text: [
            'deploy@platform:~$ checking health...',
            'services: healthy',
            'migrations: verified',
            'rollout: progressive',
            'status: deployed with calm confidence.',
          ].join('\n'),
        },
      ])
    } else if (input === 'coffee') {
      push([
        {
          type: 'output',
          text: 'Brewing... productivity +1. Platform ownership remains caffeinated.',
        },
      ])
    } else if (input === 'sudo hire rushak') {
      push([
        {
          type: 'output',
          text: 'Permission granted.\nRecommendation: schedule a conversation.\nExpected outcome: someone who owns the platform end-to-end.',
        },
      ])
      navigate('/contact')
    } else {
      push([
        {
          type: 'output',
          text: `Command not found: ${raw}\nType \`help\` for available commands.`,
        },
      ])
    }

    setValue('')
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-80 flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        aria-label="Close terminal overlay"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command terminal"
        className="relative z-10 flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-[#070b16] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2 font-mono text-sm text-soft-cyan">
            <TerminalSquare className="size-4" />
            rushak@platform:~
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close terminal">
            <X />
          </Button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 font-mono text-sm">
          {history.map((line, index) => (
            <pre
              key={`${line.type}-${index}-${line.text.slice(0, 12)}`}
              className={cn(
                'whitespace-pre-wrap text-pretty',
                line.type === 'input' && 'text-electric-blue',
                line.type === 'system' && 'text-muted-foreground',
                line.type === 'output' && 'text-foreground/90',
              )}
            >
              {line.text}
            </pre>
          ))}
        </div>

        <form
          className="flex items-center gap-2 border-t border-border px-4 py-3"
          onSubmit={(event) => {
            event.preventDefault()
            run(value)
          }}
        >
          <span className="text-electric-blue">{'>'}</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="w-full bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground"
            placeholder="Type a command..."
            aria-label="Terminal command"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  )
}
