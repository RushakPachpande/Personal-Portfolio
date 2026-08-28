import { useId, type ReactNode } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type FieldProps = {
  label: string;
  hint: string;
  htmlFor?: string;
  className?: string;
  children: ReactNode;
};

export function Field({
  label,
  hint,
  htmlFor,
  className,
  children,
}: FieldProps) {
  const hintId = useId();
  const labelId = useId();

  return (
    <div
      className={cn('flex min-w-0 flex-col gap-1.5', className)}
      role="group"
      aria-labelledby={labelId}
      aria-describedby={hintId}
    >
      <Label
        id={labelId}
        htmlFor={htmlFor}
        className="font-mono text-xs tracking-wide text-soft-cyan uppercase"
      >
        {label}
      </Label>
      {children}
      <p id={hintId} className="text-xs text-muted-foreground">
        {hint}
      </p>
    </div>
  );
}
