import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';

type LogoFrameVariant = 'header' | 'gallery' | 'lightbox';

type LogoFrameProps = {
  src: string;
  alt: string;
  variant: LogoFrameVariant;
  className?: string;
  loading?: 'lazy' | 'eager';
};

const variantStyles: Record<
  LogoFrameVariant,
  { container: string; image: string; useAspectRatio?: boolean; ratio?: number }
> = {
  header: {
    container:
      'flex size-28 shrink-0 items-center justify-center rounded-2xl border border-border bg-secondary/40 p-3 sm:size-32',
    image: 'max-h-full max-w-full object-contain',
  },
  gallery: {
    container: 'bg-card/30',
    image: 'max-h-[85%] max-w-[85%] object-contain',
    useAspectRatio: true,
    ratio: 16 / 9,
  },
  lightbox: {
    container:
      'flex max-h-[75vh] items-center justify-center bg-surface/70 p-4 sm:p-6',
    image: 'max-h-[70vh] max-w-full object-contain',
  },
};

export function LogoFrame({
  src,
  alt,
  variant,
  className,
  loading,
}: LogoFrameProps) {
  const styles = variantStyles[variant];

  const image = (
    <img src={src} alt={alt} className={styles.image} loading={loading} />
  );

  if (styles.useAspectRatio && styles.ratio) {
    return (
      <AspectRatio
        ratio={styles.ratio}
        className={cn(styles.container, className)}
      >
        <div className="flex size-full items-center justify-center p-3 sm:p-4">
          {image}
        </div>
      </AspectRatio>
    );
  }

  return <div className={cn(styles.container, className)}>{image}</div>;
}
