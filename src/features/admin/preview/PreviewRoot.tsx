import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

type PreviewRootProps = {
  open: boolean;
  queryClient: QueryClient;
  children: ReactNode;
};

export function PreviewRoot({ open, queryClient, children }: PreviewRootProps) {
  const rootRef = useRef<Root | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!open) {
      rootRef.current?.unmount();
      rootRef.current = null;
      containerRef.current?.remove();
      containerRef.current = null;
      return;
    }

    if (!containerRef.current) {
      const node = document.createElement('div');
      node.setAttribute('data-admin-preview-root', '');
      document.body.appendChild(node);
      containerRef.current = node;
      rootRef.current = createRoot(node);
    }

    const root = rootRef.current;
    if (!root) return;

    root.render(
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </HelmetProvider>
      </QueryClientProvider>
    );
  }, [open, queryClient, children]);

  useEffect(() => {
    return () => {
      rootRef.current?.unmount();
      rootRef.current = null;
      containerRef.current?.remove();
      containerRef.current = null;
    };
  }, []);

  return null;
}
