import type { ReactNode } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type FieldProps = {
  label: string;
  hint?: string;
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
  return (
    <div className={cn('flex min-w-0 flex-col gap-1.5', className)}>
      <Label
        htmlFor={htmlFor}
        className="font-mono text-xs tracking-wide text-soft-cyan uppercase"
      >
        {label}
      </Label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
