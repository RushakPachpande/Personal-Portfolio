import { Monitor, Smartphone, Tablet, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import {
  PREVIEW_DEVICES,
  uniquePreviewPaths,
  type PreviewDeviceId,
  type PreviewPathOption,
} from './types';

const DEVICE_ICONS = {
  mobile: Smartphone,
  tablet: Tablet,
  desktop: Monitor,
} as const;

type PreviewToolbarProps = {
  label: string;
  device: PreviewDeviceId;
  onDeviceChange: (device: PreviewDeviceId) => void;
  initialPath: string;
  extraPaths: PreviewPathOption[];
  onClose: () => void;
};

export function PreviewToolbar({
  label,
  device,
  onDeviceChange,
  initialPath,
  extraPaths,
  onClose,
}: PreviewToolbarProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const pages = uniquePreviewPaths(
    initialPath,
    extraPaths,
    initialPath === '/' ? 'Home' : 'This page'
  );
  const options = pages.some((page) => page.path === pathname)
    ? pages
    : [...pages, { label: pathname, path: pathname }];
  const showPageSelect = extraPaths.length > 0;

  return (
    <header className="grid shrink-0 grid-cols-1 gap-3 border-b border-border/80 bg-card/80 px-4 py-3 backdrop-blur lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center">
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Draft</Badge>
          <h2 className="truncate font-display text-base font-semibold">
            {label} preview
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Not live until you save.
        </p>
      </div>

      <ToggleGroup
        type="single"
        variant="outline"
        spacing={0}
        value={device}
        onValueChange={(value) => {
          if (value) onDeviceChange(value as PreviewDeviceId);
        }}
        aria-label="Viewport"
        className="justify-self-center"
      >
        {PREVIEW_DEVICES.map((item) => {
          const Icon = DEVICE_ICONS[item.id];
          return (
            <ToggleGroupItem
              key={item.id}
              value={item.id}
              title={`Frame at ${item.width}px (${item.label}).`}
              aria-label={item.label}
              className="h-auto min-w-16 flex-col gap-0.5 py-1.5 data-[state=on]:text-electric-blue"
            >
              <Icon />
              <span className="font-mono text-[10px] font-normal text-muted-foreground">
                {item.width}
              </span>
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>

      <div className="flex min-w-0 items-center justify-end gap-2">
        {showPageSelect ? (
          <Select value={pathname} onValueChange={(value) => navigate(value)}>
            <SelectTrigger
              size="sm"
              className="max-w-44"
              aria-label="Public page"
              title="Choose which public page to preview with this draft."
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectGroup>
                {options.map((page) => (
                  <SelectItem key={page.path} value={page.path}>
                    {page.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ) : null}
        <p
          className={cn(
            'max-w-48 truncate font-mono text-[11px] text-muted-foreground',
            extraPaths.length > 0 && 'hidden xl:block'
          )}
        >
          {pathname}
        </p>
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
    </header>
  );
}
