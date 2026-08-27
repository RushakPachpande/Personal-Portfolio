import { Input } from '@/components/ui/input';
import { publicMediaUrl } from '@/lib/supabase';
import { Field } from './Field';

type ImageFieldProps = {
  label: string;
  hint?: string;
  value?: string;
  altValue?: string;
  onAltChange?: (value: string) => void;
  onFile: (file: File) => void;
  accept?: string;
};

export function ImageField({
  label,
  hint,
  value,
  altValue,
  onAltChange,
  onFile,
  accept = 'image/*',
}: ImageFieldProps) {
  const preview = value ? publicMediaUrl(value) : '';

  return (
    <Field label={label} hint={hint}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/80 bg-card/50">
          {preview ? (
            <img
              src={preview}
              alt={altValue || label}
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <span className="px-2 text-center font-mono text-[10px] text-muted-foreground">
              No image
            </span>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <Input
            type="file"
            accept={accept}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) onFile(file);
            }}
          />
          {onAltChange ? (
            <Input
              value={altValue ?? ''}
              onChange={(event) => onAltChange(event.target.value)}
              placeholder="Alt text"
            />
          ) : null}
          {value ? (
            <p className="truncate font-mono text-[11px] text-muted-foreground">
              {value}
            </p>
          ) : null}
        </div>
      </div>
    </Field>
  );
}
