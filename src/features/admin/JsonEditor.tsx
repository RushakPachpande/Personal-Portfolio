import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

type JsonEditorProps<T> = {
  value: T
  onChange: (value: T) => void
  className?: string
  rows?: number
}

export function JsonEditor<T>({ value, onChange, className, rows = 18 }: JsonEditorProps<T>) {
  const [text, setText] = useState(() => JSON.stringify(value, null, 2))
  const [error, setError] = useState('')

  return (
    <div className={cn('space-y-2', className)}>
      <Textarea
        rows={rows}
        className="font-mono text-xs"
        value={text}
        onChange={(event) => {
          const next = event.target.value
          setText(next)
          try {
            onChange(JSON.parse(next) as T)
            setError('')
          } catch {
            setError('Invalid JSON')
          }
        }}
      />
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  )
}
