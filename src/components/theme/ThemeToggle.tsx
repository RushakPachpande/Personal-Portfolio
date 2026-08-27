import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

const THEME_ORDER = ['light', 'dark', 'system'] as const;

type ThemeChoice = (typeof THEME_ORDER)[number];

const ICONS = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const;

const LABELS = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
} as const;

function resolveChoice(theme: string | undefined): ThemeChoice {
  if (theme === 'light' || theme === 'system') return theme;
  return 'dark';
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const reduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const current = resolveChoice(theme);
  const Icon = ICONS[current];

  function cycle() {
    const index = THEME_ORDER.indexOf(current);
    const next = THEME_ORDER[(index + 1) % THEME_ORDER.length];
    setTheme(next);
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-lg"
      className={cn('size-11', className)}
      aria-label={`Switch theme, currently ${LABELS[current]}`}
      title={`Theme: ${LABELS[current]}`}
      onClick={cycle}
      disabled={!mounted}
    >
      <span
        key={current}
        className={cn('inline-flex', !reduced && 'theme-icon-in')}
        style={
          reduced ? undefined : { animation: 'theme-icon-in 200ms ease-out' }
        }
      >
        <Icon className="size-5" />
      </span>
    </Button>
  );
}
