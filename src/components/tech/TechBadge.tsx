import type { Technology } from '@/types/portfolio';
import { cn } from '@/lib/utils';

type TechBadgeProps = {
  technology: Technology;
  compact?: boolean;
};

export function TechBadge({ technology, compact = false }: TechBadgeProps) {
  return (
    <span
      className={cn(
        'group relative inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/35 px-2.5 py-1.5 text-xs',
        compact && 'px-2 py-1'
      )}
    >
      <img
        src={technology.logo}
        alt={`${technology.name} logo`}
        className={cn(
          'size-4 rounded-sm object-contain',
          compact && 'size-3.5'
        )}
        loading="lazy"
      />
      <span className="font-medium text-foreground">{technology.name}</span>
      <span className="pointer-events-none absolute -top-2 left-1/2 z-20 hidden w-52 -translate-x-1/2 -translate-y-full rounded-md border border-border bg-background/95 p-2 text-xs leading-relaxed text-muted-foreground shadow-lg backdrop-blur group-hover:block sm:text-sm">
        {technology.description}
      </span>
    </span>
  );
}
