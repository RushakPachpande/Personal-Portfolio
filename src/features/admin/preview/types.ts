import type { PortfolioDraft } from '@/lib/mergePortfolioDraft';

export const PREVIEW_DEVICES = [
  { id: 'mobile', label: 'Mobile', width: 390 },
  { id: 'tablet', label: 'Tablet', width: 768 },
  { id: 'desktop', label: 'Desktop', width: 1280 },
] as const;

export type PreviewDeviceId = (typeof PREVIEW_DEVICES)[number]['id'];

export type PreviewPathOption = {
  label: string;
  path: string;
};

export type StudioPreviewProps = {
  open: boolean;
  onClose: () => void;
  draft: PortfolioDraft;
  initialPath: string;
  extraPaths?: PreviewPathOption[];
  label?: string;
};

export function uniquePreviewPaths(
  initialPath: string,
  extraPaths: PreviewPathOption[],
  thisPageLabel: string
): PreviewPathOption[] {
  const paths: PreviewPathOption[] = [
    { label: thisPageLabel, path: initialPath },
    ...extraPaths,
  ];
  return paths.filter(
    (item, index) =>
      paths.findIndex((entry) => entry.path === item.path) === index
  );
}
