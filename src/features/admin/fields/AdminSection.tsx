import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type AdminSectionProps = {
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
};

export function AdminSection({
  title,
  description,
  className,
  children,
}: AdminSectionProps) {
  return (
    <section
      className={cn(
        'glass flex flex-col gap-5 rounded-2xl p-5 sm:p-6',
        className
      )}
    >
      <div>
        <h2 className="font-display text-xl font-semibold">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

type PageHeaderProps = {
  title: string;
  description: string;
  actions?: ReactNode;
};

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="font-mono text-xs tracking-[0.2em] text-soft-cyan uppercase">
          Studio
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      {actions}
    </div>
  );
}
