import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import githubLight from '@/assets/tech/github-light.svg';
import githubDark from '@/assets/tech/github-dark.svg';

/** Bundled light/dark pairs when Storage still has a single file. */
const LOCAL_THEME_LOGOS: Record<string, { light: string; dark: string }> = {
  github: { light: githubLight, dark: githubDark },
};

export function resolveThemedLogoSrc(options: {
  technologyId?: string;
  logo: string;
  logoDark?: string;
  theme: string | undefined;
}): string {
  const local = options.technologyId
    ? LOCAL_THEME_LOGOS[options.technologyId]
    : undefined;
  const isDark = options.theme === 'dark';
  if (local) {
    return isDark ? local.dark : local.light;
  }
  if (options.logoDark) {
    return isDark ? options.logoDark : options.logo;
  }
  return options.logo;
}

type TechLogoProps = {
  technologyId?: string;
  logo: string;
  logoDark?: string;
  name: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  title?: string;
};

export function TechLogo({
  technologyId,
  logo,
  logoDark,
  name,
  className,
  loading = 'lazy',
  title,
}: TechLogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = mounted ? resolvedTheme : undefined;
  const src = resolveThemedLogoSrc({
    technologyId,
    logo,
    logoDark,
    theme,
  });

  return (
    <img
      src={src}
      alt={`${name} logo`}
      title={title}
      className={cn('object-contain', className)}
      loading={loading}
    />
  );
}
