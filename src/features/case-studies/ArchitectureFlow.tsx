import { useState } from 'react'
import type { ArchitectureNode } from '@/types/portfolio'
import { cn } from '@/lib/utils'

type ArchitectureFlowProps = {
  nodes: ArchitectureNode[]
}

export function ArchitectureFlow({ nodes }: ArchitectureFlowProps) {
  const [activeNode, setActiveNode] = useState<string | null>(null)

  if (nodes.length === 0) return null

  return (
    <div className="min-w-0 rounded-2xl border border-border/70 bg-card/35 p-4">
      <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {nodes.map((node, index) => {
          const isActive = activeNode === node.id
          return (
            <div key={node.id} className="contents">
              <button
                type="button"
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                className={cn(
                  'rounded-xl border p-3 text-left transition-all',
                  isActive
                    ? 'border-soft-cyan/60 bg-secondary/70 shadow-[0_0_20px_rgba(34,211,238,0.15)]'
                    : 'border-border bg-secondary/30 hover:border-soft-cyan/40',
                )}
              >
                <p className="font-display text-sm font-semibold break-words text-foreground">{node.label}</p>
                <p className="mt-1 text-xs text-muted-foreground text-pretty">{node.detail}</p>
              </button>
              {index < nodes.length - 1 ? (
                <div className="hidden items-center justify-center lg:flex">
                  <span
                    className={cn(
                      'h-px w-8 bg-border transition-colors',
                      isActive && 'bg-soft-cyan/70',
                    )}
                  />
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
