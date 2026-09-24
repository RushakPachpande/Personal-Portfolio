import { useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FolderOpen, Upload } from 'lucide-react';
import {
  listMediaFiles,
  uploadPortfolioFile,
} from '@/services/portfolio-admin';
import { MEDIA_BUCKET, publicMediaUrl } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { isImageFileName, isStorageFolder, joinMediaPath } from './media';

type MediaPickerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPath?: string;
  onSelect: (path: string) => void;
};

export function MediaPicker({
  open,
  onOpenChange,
  selectedPath,
  onSelect,
}: MediaPickerProps) {
  const queryClient = useQueryClient();
  const [prefix, setPrefix] = useState('');
  const [pastedPath, setPastedPath] = useState('');
  const query = useQuery({
    queryKey: ['media', prefix],
    queryFn: () => listMediaFiles(prefix),
    enabled: open,
  });

  const crumbs = useMemo(() => {
    if (!prefix) return [];
    const parts = prefix.split('/').filter(Boolean);
    return parts.map((part, index) => ({
      label: part,
      path: parts.slice(0, index + 1).join('/'),
    }));
  }, [prefix]);

  const items = (query.data ?? []).filter(
    (item) => item.name && item.name !== '.emptyFolderPlaceholder'
  );

  async function onUpload(file: File) {
    const dest = joinMediaPath(
      prefix || 'uploads',
      `${Date.now()}-${file.name}`
    );
    await uploadPortfolioFile(MEDIA_BUCKET, dest, file);
    await queryClient.invalidateQueries({ queryKey: ['media'] });
    onSelect(dest);
    onOpenChange(false);
  }

  function applyPath(path: string) {
    const next = path.trim().replace(/^\/+/, '');
    if (!next) return;
    onSelect(next);
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-[min(100vw,28rem)] flex-col gap-0 sm:w-[min(100vw,36rem)]"
      >
        <SheetHeader className="shrink-0 border-b border-border/80 pr-12">
          <SheetTitle>Media library</SheetTitle>
          <SheetDescription>
            Reuse a file already in storage, upload into this folder, or paste a
            known storage path. Selecting a file links it - it does not copy a
            new upload.
          </SheetDescription>
        </SheetHeader>
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <Button
              type="button"
              size="sm"
              variant="outline"
              title="Show the bucket root folder."
              onClick={() => setPrefix('')}
            >
              Root
            </Button>
            {crumbs.map((crumb) => (
              <Button
                key={crumb.path}
                type="button"
                size="sm"
                variant="ghost"
                title={`Open folder ${crumb.path}.`}
                onClick={() => setPrefix(crumb.path)}
              >
                / {crumb.label}
              </Button>
            ))}
          </div>
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border px-4 py-6 text-center">
            <Upload className="text-electric-blue" />
            <p className="text-sm text-muted-foreground">
              Upload a new file into this folder, then attach it
            </p>
            <Input
              type="file"
              accept="image/*,.svg"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void onUpload(file);
                event.target.value = '';
              }}
            />
          </label>
          <div className="flex gap-2">
            <Input
              value={pastedPath}
              onChange={(event) => setPastedPath(event.target.value)}
              placeholder="Paste storage path"
              aria-label="Paste storage path"
            />
            <Button
              type="button"
              variant="outline"
              title="Attach the pasted storage path without uploading."
              onClick={() => applyPath(pastedPath)}
            >
              Use path
            </Button>
          </div>
          {query.isPending ? (
            <p className="font-mono text-sm text-muted-foreground">
              Loading files…
            </p>
          ) : null}
          <ul className="grid gap-3 sm:grid-cols-2">
            {items.map((item) => {
              const folder = isStorageFolder(item);
              const path = joinMediaPath(prefix, item.name);
              const selected = selectedPath === path;
              return (
                <li key={path}>
                  {folder ? (
                    <button
                      type="button"
                      className="studio-enter glass w-full rounded-xl p-3 text-left"
                      title={`Open folder ${item.name}.`}
                      onClick={() => setPrefix(path)}
                    >
                      <FolderOpen className="size-8 text-electric-blue" />
                      <p className="mt-2 truncate font-medium">{item.name}</p>
                      <p className="font-mono text-[11px] text-muted-foreground">
                        Folder
                      </p>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={cn(
                        'studio-enter glass flex w-full flex-col gap-2 rounded-xl p-3 text-left',
                        selected &&
                          'ring-2 ring-electric-blue/70 ring-offset-2 ring-offset-background'
                      )}
                      title={`Use ${path} on this field. The file stays in storage and is reused.`}
                      onClick={() => applyPath(path)}
                    >
                      <div className="flex h-24 items-center justify-center overflow-hidden rounded-lg bg-card">
                        {isImageFileName(item.name) ? (
                          <img
                            src={publicMediaUrl(path)}
                            alt=""
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <span className="px-2 font-mono text-[10px] text-muted-foreground">
                            File
                          </span>
                        )}
                      </div>
                      <p className="truncate font-mono text-[11px]">
                        {item.name}
                      </p>
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
