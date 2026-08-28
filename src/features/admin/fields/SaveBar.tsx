import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type SaveBarProps = {
  onSave: () => void;
  onDiscard?: () => void;
  onPreview?: () => void;
  status?: string;
  saving?: boolean;
  destructiveLabel?: string;
  onDestructive?: () => void;
};

function Action({ hint, children }: { hint: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      {children}
      <p className="hidden text-[11px] text-muted-foreground @min-[48rem]:block">
        {hint}
      </p>
    </div>
  );
}

export function SaveBar({
  onSave,
  onDiscard,
  onPreview,
  status,
  saving,
  destructiveLabel,
  onDestructive,
}: SaveBarProps) {
  const actionCount =
    1 + (onPreview ? 1 : 0) + (onDiscard ? 1 : 0) + (onDestructive ? 1 : 0);

  return (
    <div className="@container sticky bottom-0 z-20 flex flex-col gap-2 rounded-xl border border-border/80 bg-background/90 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur @min-[48rem]:gap-3 @min-[48rem]:px-4 @min-[48rem]:pt-3 @min-[48rem]:pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div
        className={cn(
          'grid gap-2 @min-[36rem]:flex @min-[36rem]:flex-wrap @min-[36rem]:items-start',
          actionCount <= 3 ? 'grid-cols-3' : 'grid-cols-2'
        )}
      >
        <Action hint="Writes to the database. The public site shows this after the next data fetch.">
          <Button
            type="button"
            className="w-full @min-[48rem]:w-auto"
            onClick={onSave}
            disabled={saving}
            title="Writes to the database. The public site shows this after the next data fetch."
          >
            {saving ? 'Saving…' : 'Save changes'}
          </Button>
        </Action>
        {onPreview ? (
          <Action hint="Exact public look using the current form, including unsaved edits.">
            <Button
              type="button"
              variant="outline"
              className="w-full @min-[48rem]:w-auto"
              onClick={onPreview}
              disabled={saving}
              title="Open the public layout with your unsaved draft. Nothing is published."
            >
              Preview
            </Button>
          </Action>
        ) : null}
        {onDiscard ? (
          <Action hint="Restores the last saved values in this form. Does not change the database.">
            <Button
              type="button"
              variant="outline"
              className="w-full @min-[48rem]:w-auto"
              onClick={onDiscard}
              disabled={saving}
              title="Throw away unsaved edits and restore the last loaded values."
            >
              Discard
            </Button>
          </Action>
        ) : null}
        {onDestructive ? (
          <Action hint="Permanently removes this record. Linked media files are not deleted from storage.">
            <Button
              type="button"
              variant="destructive"
              className="w-full @min-[48rem]:w-auto"
              onClick={onDestructive}
              disabled={saving}
              title={`${destructiveLabel ?? 'Delete'} permanently after this click.`}
            >
              {destructiveLabel ?? 'Delete'}
            </Button>
          </Action>
        ) : null}
      </div>
      {status ? (
        <p className="truncate font-mono text-xs text-muted-foreground">
          {status}
        </p>
      ) : null}
    </div>
  );
}
