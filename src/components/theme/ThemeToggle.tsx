import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { animateThemeTransition } from '@/lib/theme-view-transition';

const STAR_PATH =
  'M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z';

function ThemeSwitchStar() {
  return (
    <svg className="theme-switch__star" viewBox="0 0 20 20" aria-hidden>
      <path d={STAR_PATH} />
    </svg>
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';
  const nextLabel = isDark ? 'Switch to light theme' : 'Switch to dark theme';
  const labelRef = useRef<HTMLLabelElement>(null);

  return (
    <label
      ref={labelRef}
      className={cn('theme-switch', className)}
      title={nextLabel}
    >
      <input
        type="checkbox"
        className="theme-switch__checkbox sr-only"
        checked={mounted ? isDark : false}
        disabled={!mounted}
        onChange={(event) => {
          const nextDark = event.target.checked;
          void animateThemeTransition(labelRef.current, nextDark, () => {
            setTheme(nextDark ? 'dark' : 'light');
          });
        }}
        aria-label={nextLabel}
      />
      <span className="theme-switch__slider" aria-hidden>
        <span className="theme-switch__sun-moon">
          <span className="theme-switch__light-ray" />
          <span className="theme-switch__light-ray" />
          <span className="theme-switch__light-ray" />
          <span className="theme-switch__moon-dot" />
          <span className="theme-switch__moon-dot" />
          <span className="theme-switch__moon-dot" />
          <span className="theme-switch__cloud theme-switch__cloud--dark" />
          <span className="theme-switch__cloud theme-switch__cloud--dark" />
          <span className="theme-switch__cloud theme-switch__cloud--dark" />
          <span className="theme-switch__cloud theme-switch__cloud--light" />
          <span className="theme-switch__cloud theme-switch__cloud--light" />
          <span className="theme-switch__cloud theme-switch__cloud--light" />
        </span>
        <span className="theme-switch__stars">
          <ThemeSwitchStar />
          <ThemeSwitchStar />
          <ThemeSwitchStar />
          <ThemeSwitchStar />
        </span>
      </span>
    </label>
  );
}
