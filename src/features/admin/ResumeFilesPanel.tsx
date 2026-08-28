import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, type DragEvent } from 'react';
import { ExternalLink, FileText, Trash2, Upload } from 'lucide-react';
import { portfolioQueryKey } from '@/hooks/usePortfolio';
import {
  deleteResumeFile,
  listResumeFiles,
  renameResumeFile,
  setActiveResumeFile,
  uploadResumeFile,
} from '@/services/portfolio-admin';
import { publicResumeUrl } from '@/lib/supabase';
import type { ResumeFile } from '@/types/portfolio';
import { AdminSection, Field } from '@/features/admin/fields';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const resumeFilesQueryKey = ['resume-files'] as const;

function formatBytes(value: number | null) {
  if (value == null) return 'Unknown size';
  if (value < 1024) return `${value} B`;
  const kb = value / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

function fileFromDrop(event: DragEvent<HTMLLabelElement>) {
  event.preventDefault();
  return event.dataTransfer.files[0] ?? null;
}

export function ResumeFilesPanel() {
  const queryClient = useQueryClient();
  const [label, setLabel] = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const query = useQuery({
    queryKey: resumeFilesQueryKey,
    queryFn: listResumeFiles,
  });

  async function refresh() {
    await queryClient.invalidateQueries({ queryKey: resumeFilesQueryKey });
    await queryClient.invalidateQueries({ queryKey: portfolioQueryKey });
  }

  async function run(action: () => Promise<void>, success: string) {
    setBusy(true);
    try {
      await action();
      await refresh();
      setStatus(success);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Action failed');
    } finally {
      setBusy(false);
    }
  }

  async function onUpload(file: File) {
    await run(async () => {
      await uploadResumeFile(label, file);
      setLabel('');
    }, 'Uploaded.');
  }

  const files = query.data ?? [];

  return (
    <AdminSection
      title="Resume PDFs"
      description="Upload versions, then mark one as active. Public download buttons use the active file."
    >
      <Field
        label="Label"
        hint="Shown in this list so you can tell versions apart. Defaults to the file name."
      >
        <Input
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          placeholder="Platform resume — 2026"
        />
      </Field>
      <label
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border px-4 py-8 text-center"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          const file = fileFromDrop(event);
          if (file) void onUpload(file);
        }}
      >
        <Upload className="text-electric-blue" />
        <p className="text-sm text-muted-foreground">
          Drop a PDF here or click to upload
        </p>
        <Input
          type="file"
          accept="application/pdf,.pdf"
          className="sr-only"
          disabled={busy}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void onUpload(file);
            event.target.value = '';
          }}
        />
      </label>
      {query.isPending ? (
        <p className="font-mono text-sm text-muted-foreground">Loading PDFs…</p>
      ) : null}
      {files.length === 0 && !query.isPending ? (
        <p className="text-sm text-muted-foreground">
          No resumes uploaded yet. Public download buttons stay hidden until one
          is marked active.
        </p>
      ) : null}
      <ul className="flex flex-col gap-3">
        {files.map((file) => (
          <ResumeFileRow
            key={file.id}
            file={file}
            busy={busy}
            onActivate={() =>
              void run(
                () => setActiveResumeFile(file.id),
                'Active resume updated.'
              )
            }
            onRename={(next) =>
              void run(() => renameResumeFile(file.id, next), 'Renamed.')
            }
            onDelete={() =>
              void run(() => deleteResumeFile(file.id), 'Deleted.')
            }
          />
        ))}
      </ul>
      {status ? (
        <p className="font-mono text-xs text-muted-foreground">{status}</p>
      ) : null}
    </AdminSection>
  );
}

function ResumeFileRow({
  file,
  busy,
  onActivate,
  onRename,
  onDelete,
}: {
  file: ResumeFile;
  busy: boolean;
  onActivate: () => void;
  onRename: (label: string) => void;
  onDelete: () => void;
}) {
  const [draft, setDraft] = useState(file.label);
  const href = publicResumeUrl(file.storagePath);
  const fileName = file.storagePath.split('/').at(-1) ?? file.storagePath;

  return (
    <li className="studio-enter flex flex-col gap-3 rounded-xl border border-border/80 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <FileText className="mt-0.5 size-5 shrink-0 text-electric-blue" />
          <div className="min-w-0">
            <p className="font-medium">{file.label}</p>
            <p className="truncate font-mono text-[11px] text-muted-foreground">
              {fileName} · {formatBytes(file.sizeBytes)} ·{' '}
              {new Date(file.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        {file.isActive ? <Badge>Active</Badge> : null}
      </div>
      <Field
        label="Rename"
        hint="Updates the studio label only. The stored file name stays the same."
      >
        <Input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
      </Field>
      <div className="flex flex-wrap gap-2">
        {file.isActive ? null : (
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={busy}
            title="Public download buttons will use this PDF."
            onClick={onActivate}
          >
            Set as active
          </Button>
        )}
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={busy}
          title="Save the new label for this PDF."
          onClick={() => onRename(draft)}
        >
          Save name
        </Button>
        <Button type="button" size="sm" variant="outline" asChild>
          <a href={href} target="_blank" rel="noreferrer">
            Open
            <ExternalLink data-icon="inline-end" />
          </a>
        </Button>
        <Button
          type="button"
          size="sm"
          variant="destructive"
          disabled={busy}
          title={
            file.isActive
              ? 'Promote another PDF first, unless this is the last one.'
              : 'Remove this PDF from storage and the list.'
          }
          onClick={onDelete}
        >
          <Trash2 data-icon="inline-start" />
          Delete
        </Button>
      </div>
    </li>
  );
}
