import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { publicMediaUrl } from '@/lib/supabase';
import { Field } from './Field';
import { MediaPicker } from './MediaPicker';

type ImageFieldProps = {
  label: string;
  hint: string;
  value?: string;
  altValue?: string;
  altHint?: string;
  onAltChange?: (value: string) => void;
  onPathChange: (path: string) => void;
  onFile?: (file: File) => void;
  accept?: string;
};

export function ImageField({
  label,
  hint,
  value,
  altValue,
  altHint,
  onAltChange,
  onPathChange,
  onFile,
  accept = 'image/*',
}: ImageFieldProps) {
  const preview = value ? publicMediaUrl(value) : '';
  const [libraryOpen, setLibraryOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

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
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              title="Open the storage library and attach an existing file without uploading a duplicate."
              onClick={() => setLibraryOpen(true)}
            >
              Choose from library
            </Button>
            {onFile ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                title="Upload a new file to a dedicated path for this field, then attach it."
                onClick={() => fileRef.current?.click()}
              >
                Upload new
              </Button>
            ) : null}
            {value ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                title="Detach this image from the field. The file stays in storage."
                onClick={() => onPathChange('')}
              >
                Clear
              </Button>
            ) : null}
          </div>
          <Input
            ref={fileRef}
            type="file"
            accept={accept}
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file && onFile) onFile(file);
              event.target.value = '';
            }}
          />
          {onAltChange ? (
            <Field
              label={`${label} alt text`}
              hint={
                altHint ??
                'Screen-reader and SEO text for this image on the public site.'
              }
            >
              <Input
                value={altValue ?? ''}
                onChange={(event) => onAltChange(event.target.value)}
                placeholder="Alt text"
              />
            </Field>
          ) : null}
          {value ? (
            <p className="truncate font-mono text-[11px] text-muted-foreground">
              {value}
            </p>
          ) : null}
        </div>
      </div>
      <MediaPicker
        open={libraryOpen}
        onOpenChange={setLibraryOpen}
        selectedPath={value}
        onSelect={onPathChange}
      />
    </Field>
  );
}
