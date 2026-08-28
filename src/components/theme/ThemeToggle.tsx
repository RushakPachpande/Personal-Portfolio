import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

const DESCRIPTIONS = {
  light: 'Always use the light palette.',
  dark: 'Always use the dark palette.',
  system: 'Follow the operating system light/dark setting.',
} as const;

function resolveChoice(theme: string | undefined): ThemeChoice {
  if (theme === 'light' || theme === 'system') return theme;
  return 'dark';
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const reduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const current = resolveChoice(theme);
  const appearance = resolvedTheme === 'light' ? 'light' : 'dark';
  const TriggerIcon = ICONS[appearance];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-lg"
          className={cn('size-11', className)}
          aria-label={`Theme menu, currently ${LABELS[current]}`}
          title="Open theme menu. Choose Light, Dark, or System."
          disabled={!mounted}
        >
          <span
            key={appearance}
            className={cn('inline-flex', !reduced && 'theme-icon-in')}
            style={
              reduced
                ? undefined
                : { animation: 'theme-icon-in 200ms ease-out' }
            }
          >
            <TriggerIcon className="size-5" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={current}
            onValueChange={(value) => setTheme(value)}
          >
            {THEME_ORDER.map((choice) => {
              const Icon = ICONS[choice];
              const active = current === choice;
              return (
                <DropdownMenuRadioItem
                  key={choice}
                  value={choice}
                  aria-checked={active}
                  title={DESCRIPTIONS[choice]}
                  className={cn(
                    'theme-menu-item gap-2',
                    active &&
                      'bg-muted text-foreground ring-1 ring-electric-blue/40'
                  )}
                >
                  <Icon />
                  {LABELS[choice]}
                </DropdownMenuRadioItem>
              );
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
