import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { TerminalSquare, X } from 'lucide-react'
import { SITE_VERSION } from '@/content/profile'
import {
  completeTerminalInput,
  executeTerminalCommand,
  terminalQuickCommands,
  terminalWelcome,
  type TerminalLine,
} from '@/content/terminal'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type CommandTerminalProps = {
  open: boolean
  onClose: () => void
}

const lineStyles: Record<TerminalLine['type'], string> = {
  input: 'text-electric-blue',
  system: 'text-muted-foreground',
  output: 'text-foreground/90',
  success: 'text-soft-cyan',
  error: 'text-destructive',
}

export function CommandTerminal({ open, onClose }: CommandTerminalProps) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const commandHistory = useRef<string[]>([])
  const historyIndex = useRef<number | null>(null)
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'system', text: terminalWelcome },
  ])
  const [value, setValue] = useState('')

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [history, open])

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

  const push = (lines: TerminalLine[]) => setHistory((prev) => [...prev, ...lines])

  const run = (raw: string) => {
    const trimmed = raw.trim()
    if (!trimmed) return

    push([{ type: 'input', text: `> ${raw}` }])

    const result = executeTerminalCommand(raw, { pathname })
    if (!result) return

    if (result.clear) {
      setHistory([])
      setValue('')
      historyIndex.current = null
      return
    }

    if (result.lines.length > 0) {
      push(result.lines)
    }

    if (result.navigate) {
      navigate(result.navigate)
    }

    commandHistory.current = [...commandHistory.current, trimmed]
    historyIndex.current = null
    setValue('')
  }

  const onInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (commandHistory.current.length === 0) return
      const nextIndex =
        historyIndex.current === null
          ? commandHistory.current.length - 1
          : Math.max(0, historyIndex.current - 1)
      historyIndex.current = nextIndex
      setValue(commandHistory.current[nextIndex] ?? '')
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (historyIndex.current === null) return
      const nextIndex = historyIndex.current + 1
      if (nextIndex >= commandHistory.current.length) {
        historyIndex.current = null
        setValue('')
        return
      }
      historyIndex.current = nextIndex
      setValue(commandHistory.current[nextIndex] ?? '')
      return
    }

    if (event.key === 'Tab') {
      event.preventDefault()
      const completed = completeTerminalInput(value)
      if (completed) setValue(completed)
    }
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
        className="relative z-10 flex min-h-[min(520px,80vh)] max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-[#070b16] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-3">
            <div className="flex items-center gap-2 font-mono text-sm text-soft-cyan">
              <TerminalSquare className="size-4 shrink-0" />
              <span className="truncate">rushak@platform:~</span>
            </div>
            <span className="font-mono text-[11px] text-muted-foreground">
              v{SITE_VERSION} · Ctrl+K close · ↑↓ history · Tab complete
            </span>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close terminal">
            <X />
          </Button>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 space-y-3 overflow-y-auto px-4 py-4 font-mono text-sm"
        >
          {history.map((line, index) => (
            <pre
              key={`${line.type}-${index}-${line.text.slice(0, 12)}`}
              className={cn('whitespace-pre-wrap text-pretty', lineStyles[line.type])}
            >
              {line.text}
            </pre>
          ))}
        </div>

        <div className="border-t border-border px-4 py-3">
          <div className="mb-3 flex flex-wrap gap-2">
            {terminalQuickCommands.map((command) => (
              <button
                key={command}
                type="button"
                onClick={() => run(command)}
                className="rounded-md border border-border/80 bg-secondary/30 px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-electric-blue/40 hover:text-foreground"
              >
                {command}
              </button>
            ))}
          </div>

          <form
            className="flex items-center gap-2"
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
              onKeyDown={onInputKeyDown}
              className="w-full bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground"
              placeholder="Try help, resume, certs, open navdrishti…"
              aria-label="Terminal command"
              autoComplete="off"
              spellCheck={false}
            />
          </form>
        </div>
      </div>
    </div>
  )
}
