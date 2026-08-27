import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';
import { ThemeColorMeta } from './ThemeColorMeta';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      storageKey="portfolio-theme"
      disableTransitionOnChange={false}
    >
      <ThemeColorMeta />
      {children}
    </NextThemesProvider>
  );
}
