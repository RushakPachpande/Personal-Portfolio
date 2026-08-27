import { Button } from '@/components/ui/button';

type SaveBarProps = {
  onSave: () => void;
  onDiscard?: () => void;
  status?: string;
  saving?: boolean;
  destructiveLabel?: string;
  onDestructive?: () => void;
};

export function SaveBar({
  onSave,
  onDiscard,
  status,
  saving,
  destructiveLabel,
  onDestructive,
}: SaveBarProps) {
  return (
    <div className="sticky bottom-0 z-20 mb-[env(safe-area-inset-bottom)] flex flex-wrap items-center gap-3 rounded-xl border border-border/80 bg-background/90 px-4 py-3 backdrop-blur">
      <Button type="button" onClick={onSave} disabled={saving}>
        {saving ? 'Saving…' : 'Save changes'}
      </Button>
      {onDiscard ? (
        <Button
          type="button"
          variant="outline"
          onClick={onDiscard}
          disabled={saving}
        >
          Discard
        </Button>
      ) : null}
      {onDestructive ? (
        <Button
          type="button"
          variant="destructive"
          onClick={onDestructive}
          disabled={saving}
        >
          {destructiveLabel ?? 'Delete'}
        </Button>
      ) : null}
      {status ? (
        <p className="font-mono text-xs text-muted-foreground">{status}</p>
      ) : null}
    </div>
  );
}
