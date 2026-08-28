import { Button } from '@/components/ui/button';

type SaveBarProps = {
  onSave: () => void;
  onDiscard?: () => void;
  onPreview?: () => void;
  status?: string;
  saving?: boolean;
  destructiveLabel?: string;
  onDestructive?: () => void;
};

export function SaveBar({
  onSave,
  onDiscard,
  onPreview,
  status,
  saving,
  destructiveLabel,
  onDestructive,
}: SaveBarProps) {
  return (
    <div className="sticky bottom-0 z-20 mb-[env(safe-area-inset-bottom)] flex flex-col gap-3 rounded-xl border border-border/80 bg-background/90 px-4 py-3 backdrop-blur">
      <div className="flex flex-wrap items-start gap-3">
        <div className="flex max-w-52 flex-col gap-1">
          <Button type="button" onClick={onSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </Button>
          <p className="text-[11px] text-muted-foreground">
            Writes to the database. The public site shows this after the next
            data fetch.
          </p>
        </div>
        {onPreview ? (
          <div className="flex max-w-52 flex-col gap-1">
            <Button
              type="button"
              variant="outline"
              onClick={onPreview}
              disabled={saving}
              title="Open the public layout with your unsaved draft. Nothing is published."
            >
              Preview
            </Button>
            <p className="text-[11px] text-muted-foreground">
              Exact public look using the current form, including unsaved edits.
            </p>
          </div>
        ) : null}
        {onDiscard ? (
          <div className="flex max-w-52 flex-col gap-1">
            <Button
              type="button"
              variant="outline"
              onClick={onDiscard}
              disabled={saving}
              title="Throw away unsaved edits and restore the last loaded values."
            >
              Discard
            </Button>
            <p className="text-[11px] text-muted-foreground">
              Restores the last saved values in this form. Does not change the
              database.
            </p>
          </div>
        ) : null}
        {onDestructive ? (
          <div className="flex max-w-52 flex-col gap-1">
            <Button
              type="button"
              variant="destructive"
              onClick={onDestructive}
              disabled={saving}
              title={`${destructiveLabel ?? 'Delete'} permanently after this click.`}
            >
              {destructiveLabel ?? 'Delete'}
            </Button>
            <p className="text-[11px] text-muted-foreground">
              Permanently removes this record. Linked media files are not
              deleted from storage.
            </p>
          </div>
        ) : null}
      </div>
      {status ? (
        <p className="font-mono text-xs text-muted-foreground">{status}</p>
      ) : null}
    </div>
  );
}
