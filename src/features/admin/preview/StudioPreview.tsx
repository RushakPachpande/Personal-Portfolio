import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { usePortfolio } from '@/hooks/usePortfolio';
import { mergePortfolioDraft } from '@/lib/mergePortfolioDraft';
import { PreviewRoot } from './PreviewRoot';
import { PreviewWorkbench } from './PreviewWorkbench';
import type { StudioPreviewProps } from './types';

export function StudioPreview({
  open,
  onClose,
  draft,
  initialPath,
  extraPaths = [],
  label = 'Public',
}: StudioPreviewProps) {
  const live = usePortfolio();
  const queryClient = useQueryClient();
  const merged = useMemo(() => mergePortfolioDraft(live, draft), [live, draft]);

  return (
    <PreviewRoot open={open} queryClient={queryClient}>
      <PreviewWorkbench
        merged={merged}
        initialPath={initialPath}
        extraPaths={extraPaths}
        label={label}
        onClose={onClose}
      />
    </PreviewRoot>
  );
}
