import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { MemoryRouter, useRoutes } from 'react-router-dom';
import { QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { X } from 'lucide-react';
import { PreviewPublicChrome, publicChildRoutes } from '@/app/publicRoutes';
import { Button } from '@/components/ui/button';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { PortfolioContext, usePortfolio } from '@/hooks/usePortfolio';
import { PreviewModeContext } from '@/hooks/usePreviewMode';
import {
  mergePortfolioDraft,
  type PortfolioDraft,
} from '@/lib/mergePortfolioDraft';
import type { PortfolioData } from '@/types/portfolio';

const devices = [
  { id: 'mobile', label: 'Mobile', width: 390 },
  { id: 'tablet', label: 'Tablet', width: 768 },
  { id: 'desktop', label: 'Desktop', width: 1280 },
] as const;

type DeviceId = (typeof devices)[number]['id'];

type PathOption = {
  label: string;
  path: string;
};

type AdminPreviewOverlayProps = {
  open: boolean;
  onClose: () => void;
  draft: PortfolioDraft;
  initialPath: string;
  extraPaths?: PathOption[];
};

function PreviewRoutes() {
  return useRoutes([
    { element: <PreviewPublicChrome />, children: publicChildRoutes },
  ]);
}

function ScaledFrame({
  width,
  children,
}: {
  width: number;
  children: ReactNode;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [innerHeight, setInnerHeight] = useState(0);

  useEffect(() => {
    const host = hostRef.current;
    const inner = innerRef.current;
    if (!host || !inner) return;

    function measure() {
      if (!host || !inner) return;
      setScale(Math.min(1, host.clientWidth / width));
      setInnerHeight(inner.scrollHeight);
    }

    const observer = new ResizeObserver(measure);
    observer.observe(host);
    observer.observe(inner);
    measure();
    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={hostRef} className="flex justify-center overflow-x-hidden">
      <div
        className="overflow-hidden rounded-xl border border-border bg-background shadow-2xl"
        style={{
          width: width * scale,
          height: innerHeight * scale,
        }}
      >
        <div
          ref={innerRef}
          className="origin-top-left"
          style={{
            width,
            transform: `scale(${scale})`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function PreviewOverlayApp({
  merged,
  initialPath,
  extraPaths,
  onClose,
}: {
  merged: PortfolioData;
  initialPath: string;
  extraPaths: PathOption[];
  onClose: () => void;
}) {
  const [device, setDevice] = useState<DeviceId>('desktop');
  const [path, setPath] = useState(initialPath);
  const deviceWidth = devices.find((item) => item.id === device)?.width ?? 1280;

  useEffect(() => {
    setPath(initialPath);
  }, [initialPath]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const paths = [{ label: 'This page', path: initialPath }, ...extraPaths];
  const uniquePaths = paths.filter(
    (item, index) =>
      paths.findIndex((entry) => entry.path === item.path) === index
  );

  return (
    <div className="fixed inset-0 z-100 flex flex-col bg-background">
      <div className="flex shrink-0 flex-col gap-3 border-b border-border/80 bg-card/80 px-4 py-3 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs tracking-wide text-soft-cyan uppercase">
            Draft preview
          </p>
          <p className="text-sm text-muted-foreground">
            Public layout with unsaved form data. Navigation stays inside this
            overlay. Contact submit is disabled.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {uniquePaths.length > 1
            ? uniquePaths.map((item) => (
                <Button
                  key={item.path}
                  type="button"
                  size="sm"
                  variant={path === item.path ? 'default' : 'outline'}
                  title={`Show ${item.path} with the current draft.`}
                  onClick={() => setPath(item.path)}
                >
                  {item.label}
                </Button>
              ))
            : null}
          {devices.map((item) => (
            <Button
              key={item.id}
              type="button"
              size="sm"
              variant={device === item.id ? 'default' : 'outline'}
              title={`Frame the preview at ${item.width}px.`}
              onClick={() => setDevice(item.id)}
            >
              {item.label}
            </Button>
          ))}
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            title="Close preview and return to the editor. Draft is unchanged."
            aria-label="Close preview"
            onClick={onClose}
          >
            <X />
          </Button>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-auto bg-muted/30 p-4">
        <ScaledFrame width={deviceWidth}>
          <PreviewModeContext.Provider value={true}>
            <PortfolioContext.Provider value={merged}>
              <MemoryRouter key={path} initialEntries={[path]}>
                <PreviewRoutes />
              </MemoryRouter>
            </PortfolioContext.Provider>
          </PreviewModeContext.Provider>
        </ScaledFrame>
      </div>
    </div>
  );
}

export function AdminPreviewOverlay({
  open,
  onClose,
  draft,
  initialPath,
  extraPaths = [],
}: AdminPreviewOverlayProps) {
  const live = usePortfolio();
  const queryClient = useQueryClient();
  const merged = useMemo(() => mergePortfolioDraft(live, draft), [live, draft]);
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
          <ThemeProvider>
            <PreviewOverlayApp
              merged={merged}
              initialPath={initialPath}
              extraPaths={extraPaths}
              onClose={onClose}
            />
          </ThemeProvider>
        </HelmetProvider>
      </QueryClientProvider>
    );
  }, [open, merged, initialPath, extraPaths, onClose, queryClient]);

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
