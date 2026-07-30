import { getTechnologyById } from '@/content/technologies'
import { TechBadge } from './TechBadge'

type TechBannerProps = {
  technologyIds: string[]
}

export function TechBanner({ technologyIds }: TechBannerProps) {
  const items = technologyIds
    .map((id) => getTechnologyById(id))
    .filter((technology) => Boolean(technology))

  if (items.length === 0) return null

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex min-w-max items-center gap-2 rounded-xl border border-border/70 bg-card/40 p-2">
        {items.map((technology) =>
          technology ? <TechBadge key={technology.id} technology={technology} compact /> : null,
        )}
      </div>
    </div>
  )
}
