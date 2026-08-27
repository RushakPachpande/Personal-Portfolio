import { useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FolderOpen, Mail, Trash2, Upload } from 'lucide-react';
import {
  deleteContactSubmission,
  deleteMediaFile,
  fetchContactSubmissions,
  listMediaFiles,
  uploadPortfolioFile,
} from '@/services/portfolio';
import { MEDIA_BUCKET, publicMediaUrl } from '@/lib/supabase';
import { PageHeader } from '@/features/admin/fields';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AdminSubmissionsPage() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['contact-submissions'],
    queryFn: fetchContactSubmissions,
  });

  if (query.isPending) {
    return (
      <p className="font-mono text-sm text-muted-foreground">Loading inbox…</p>
    );
  }
  if (query.isError) {
    return (
      <p className="text-sm text-destructive">Unable to load submissions.</p>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Inbox"
        description="Messages from the public contact form. Reply from your email client."
      />
      {query.data.length === 0 ? (
        <p className="text-sm text-muted-foreground">No messages yet.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {query.data.map((item) => (
            <li key={item.id} className="glass rounded-2xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-semibold">
                    {item.name}
                  </p>
                  <a
                    href={`mailto:${item.email}`}
                    className="mt-1 inline-flex items-center gap-1.5 text-sm text-electric-blue hover:underline"
                  >
                    <Mail className="size-3.5" />
                    {item.email}
                  </a>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    void deleteContactSubmission(item.id).then(() =>
                      queryClient.invalidateQueries({
                        queryKey: ['contact-submissions'],
                      })
                    );
                  }}
                >
                  <Trash2 data-icon="inline-start" />
                  Delete
                </Button>
              </div>
              <p className="mt-4 whitespace-pre-wrap text-sm text-muted-foreground">
                {item.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function joinPath(prefix: string, name: string) {
  return prefix ? `${prefix.replace(/\/$/, '')}/${name}` : name;
}

function isFolder(item: {
  id: string | null;
  metadata: Record<string, unknown> | null;
}) {
  return item.metadata == null;
}

export function AdminMediaPage() {
  const queryClient = useQueryClient();
  const [prefix, setPrefix] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const query = useQuery({
    queryKey: ['media', prefix],
    queryFn: () => listMediaFiles(prefix),
  });

  const crumbs = useMemo(() => {
    if (!prefix) return [];
    const parts = prefix.split('/').filter(Boolean);
    return parts.map((part, index) => ({
      label: part,
      path: parts.slice(0, index + 1).join('/'),
    }));
  }, [prefix]);

  async function onUpload(file: File) {
    const dest = joinPath(prefix || 'uploads', `${Date.now()}-${file.name}`);
    await uploadPortfolioFile(MEDIA_BUCKET, dest, file);
    await queryClient.invalidateQueries({ queryKey: ['media'] });
  }

  const items = (query.data ?? []).filter(
    (item) => item.name && item.name !== '.emptyFolderPlaceholder'
  );

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Media"
        description="Browse storage folders, preview files, and upload into the current folder."
      />
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
        <Button
          type="button"
          size="sm"
          variant="outline"
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
            onClick={() => setPrefix(crumb.path)}
          >
            / {crumb.label}
          </Button>
        ))}
      </div>
      <label
        className={`glass flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed px-6 py-10 text-center ${dragOver ? 'border-electric-blue bg-secondary/40' : 'border-border'}`}
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragOver(false);
          const file = event.dataTransfer.files[0];
          if (file) void onUpload(file);
        }}
      >
        <Upload className="size-6 text-electric-blue" />
        <p className="text-sm text-muted-foreground">
          Drop a file here or click to upload into this folder
        </p>
        <Input
          type="file"
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void onUpload(file);
          }}
        />
      </label>
      {query.isPending ? (
        <p className="font-mono text-sm text-muted-foreground">
          Loading files…
        </p>
      ) : null}
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => {
          const folder = isFolder(item);
          const path = joinPath(prefix, item.name);
          return (
            <li
              key={path}
              className="glass flex flex-col gap-3 rounded-2xl p-4"
            >
              {folder ? (
                <button
                  type="button"
                  className="text-left"
                  onClick={() => setPrefix(path)}
                >
                  <FolderOpen className="size-10 text-electric-blue" />
                  <p className="mt-3 font-medium">{item.name}</p>
                  <p className="font-mono text-xs text-muted-foreground">
                    Folder
                  </p>
                </button>
              ) : (
                <>
                  <div className="flex h-32 items-center justify-center overflow-hidden rounded-xl bg-card">
                    <img
                      src={publicMediaUrl(path)}
                      alt=""
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <p className="truncate font-mono text-xs">{item.name}</p>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => void navigator.clipboard.writeText(path)}
                    >
                      Copy path
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        void deleteMediaFile(path).then(() =>
                          queryClient.invalidateQueries({ queryKey: ['media'] })
                        );
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
