import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export function ThemeColorMeta() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const color = resolvedTheme === 'light' ? '#f8fafc' : '#050816';
    const metas = document.querySelectorAll('meta[name="theme-color"]');
    if (metas.length === 0) {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      meta.setAttribute('content', color);
      document.head.appendChild(meta);
      return;
    }
    metas.forEach((meta, index) => {
      if (index === 0) {
        meta.setAttribute('content', color);
      } else {
        meta.remove();
      }
    });
  }, [resolvedTheme]);

  return null;
}
