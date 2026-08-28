import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { PREVIEW_DEVICES, type PreviewDeviceId } from './types';

type PreviewViewportProps = {
  device: PreviewDeviceId;
  children: ReactNode;
};

export function PreviewViewport({ device, children }: PreviewViewportProps) {
  const { pathname } = useLocation();
  const hostRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ width: 0, height: 0 });
  const deviceWidth =
    PREVIEW_DEVICES.find((item) => item.id === device)?.width ?? 1280;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    function measure() {
      if (!host) return;
      setBox({ width: host.clientWidth, height: host.clientHeight });
    }

    const observer = new ResizeObserver(measure);
    observer.observe(host);
    measure();
    return () => observer.disconnect();
  }, []);

  const pad = 32;
  const availableWidth = Math.max(0, box.width - pad * 2);
  const availableHeight = Math.max(0, box.height - pad * 2);
  const scale =
    deviceWidth > 0 && availableWidth > 0
      ? Math.min(1, availableWidth / deviceWidth)
      : 1;
  const outerWidth = deviceWidth * scale;
  const innerHeight = scale > 0 ? availableHeight / scale : availableHeight;
  const displayPath = `rushak.dev${pathname === '/' ? '' : pathname}`;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div ref={hostRef} className="relative min-h-0 flex-1">
        {availableHeight > 0 ? (
          <div
            className="absolute overflow-hidden"
            style={{
              top: pad,
              left: (box.width - outerWidth) / 2,
              width: outerWidth,
              height: availableHeight,
            }}
          >
            <div
              className="origin-top-left will-change-transform"
              style={{
                width: deviceWidth,
                height: innerHeight,
                transform: `scale(${scale})`,
              }}
            >
              <DeviceChrome device={device} url={displayPath}>
                {children}
              </DeviceChrome>
            </div>
          </div>
        ) : null}
      </div>
      {availableHeight > 0 ? (
        <p className="shrink-0 pb-3 text-center font-mono text-[11px] text-muted-foreground">
          {deviceWidth} × {Math.round(innerHeight)} · Fit{' '}
          {Math.round(scale * 100)}%
        </p>
      ) : null}
    </div>
  );
}

function DeviceChrome({
  device,
  url,
  children,
}: {
  device: PreviewDeviceId;
  url: string;
  children: ReactNode;
}) {
  if (device === 'desktop') {
    return (
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
        <div className="flex h-10 shrink-0 items-center gap-2 border-b border-border/80 px-3">
          <span aria-hidden className="size-2 rounded-full bg-muted" />
          <span aria-hidden className="size-2 rounded-full bg-muted" />
          <span aria-hidden className="size-2 rounded-full bg-muted" />
          <p className="min-w-0 flex-1 truncate rounded-md bg-muted/80 px-2 py-0.5 text-center font-mono text-[11px] text-muted-foreground">
            {url}
          </p>
        </div>
        <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto bg-background">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex h-full flex-col border border-border bg-card shadow-2xl',
        device === 'mobile' ? 'rounded-[2rem] p-2' : 'rounded-[1.5rem] p-2.5'
      )}
    >
      {device === 'mobile' ? (
        <div
          aria-hidden
          className="mx-auto mb-2 h-4 w-24 shrink-0 rounded-full bg-muted"
        />
      ) : (
        <div
          aria-hidden
          className="mx-auto mb-2 h-2 w-16 shrink-0 rounded-full bg-muted"
        />
      )}
      <div
        className={cn(
          'min-h-0 flex-1 overflow-x-hidden overflow-y-auto bg-background',
          device === 'mobile' ? 'rounded-[1.35rem]' : 'rounded-xl'
        )}
      >
        {children}
      </div>
      {device === 'mobile' ? (
        <div
          aria-hidden
          className="mx-auto mt-2 h-1 w-20 shrink-0 rounded-full bg-muted"
        />
      ) : null}
    </div>
  );
}
