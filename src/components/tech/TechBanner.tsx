import { getTechnologyById } from '@/lib/portfolio';
import { usePortfolio } from '@/hooks/usePortfolio';
import { TechBadge } from './TechBadge';

type TechBannerProps = {
  technologyIds: string[];
};

export function TechBanner({ technologyIds }: TechBannerProps) {
  const { technologies } = usePortfolio();
  const items = technologyIds
    .map((id) => getTechnologyById(technologies, id))
    .filter((technology) => Boolean(technology));

  if (items.length === 0) return null;

  return (
    <div className="w-full min-w-0">
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border/70 bg-card/40 p-2">
        {items.map((technology) =>
          technology ? (
            <TechBadge key={technology.id} technology={technology} compact />
          ) : null
        )}
      </div>
    </div>
  );
}
