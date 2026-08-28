import { useEffect, useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { PortfolioContext } from '@/hooks/usePortfolio';
import { PreviewModeContext } from '@/hooks/usePreviewMode';
import type { PortfolioData } from '@/types/portfolio';
import { PreviewRoutes } from './previewRoutes';
import { PreviewToolbar } from './PreviewToolbar';
import { PreviewViewport } from './PreviewViewport';
import type { PreviewDeviceId, PreviewPathOption } from './types';

type PreviewWorkbenchProps = {
  merged: PortfolioData;
  initialPath: string;
  extraPaths: PreviewPathOption[];
  label: string;
  onClose: () => void;
};

export function PreviewWorkbench({
  merged,
  initialPath,
  extraPaths,
  label,
  onClose,
}: PreviewWorkbenchProps) {
  const [device, setDevice] = useState<PreviewDeviceId>('desktop');

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

  return (
    <div className="fixed inset-0 z-100 flex flex-col bg-background">
      <PreviewModeContext.Provider value={true}>
        <PortfolioContext.Provider value={merged}>
          <MemoryRouter initialEntries={[initialPath]}>
            <PreviewToolbar
              label={label}
              device={device}
              onDeviceChange={setDevice}
              initialPath={initialPath}
              extraPaths={extraPaths}
              onClose={onClose}
            />
            <div className="preview-well min-h-0 flex-1">
              <PreviewViewport device={device}>
                <PreviewRoutes />
              </PreviewViewport>
            </div>
          </MemoryRouter>
        </PortfolioContext.Provider>
      </PreviewModeContext.Provider>
    </div>
  );
}
