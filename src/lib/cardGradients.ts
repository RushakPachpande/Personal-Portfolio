export type CardGradientKey =
  | 'platform'
  | 'infrastructure'
  | 'automation'
  | 'philosophy'
  | 'about'
  | 'stat'
  | 'experience'
  | 'contact'
  | 'technology'
  | 'default';

export const cardGradients: Record<CardGradientKey, string> = {
  platform:
    'bg-[radial-gradient(ellipse_80%_60%_at_20%_20%,color-mix(in_srgb,var(--electric-blue)_35%,transparent),transparent_55%),radial-gradient(ellipse_70%_50%_at_80%_80%,color-mix(in_srgb,var(--soft-cyan)_20%,transparent),transparent_50%),linear-gradient(145deg,var(--card-surface-from),var(--card-surface-to))]',
  infrastructure:
    'bg-[radial-gradient(ellipse_80%_60%_at_75%_25%,color-mix(in_srgb,var(--deep-purple)_32%,transparent),transparent_55%),radial-gradient(ellipse_60%_50%_at_20%_80%,color-mix(in_srgb,var(--electric-blue)_18%,transparent),transparent_50%),linear-gradient(145deg,var(--card-surface-from),var(--card-surface-to))]',
  automation:
    'bg-[radial-gradient(ellipse_80%_60%_at_30%_30%,color-mix(in_srgb,var(--soft-cyan)_28%,transparent),transparent_55%),radial-gradient(ellipse_70%_50%_at_85%_70%,color-mix(in_srgb,var(--deep-purple)_22%,transparent),transparent_50%),linear-gradient(145deg,var(--card-surface-from),var(--card-surface-to))]',
  philosophy:
    'bg-[radial-gradient(ellipse_70%_55%_at_50%_20%,color-mix(in_srgb,var(--deep-purple)_28%,transparent),transparent_55%),radial-gradient(ellipse_60%_45%_at_80%_85%,color-mix(in_srgb,var(--electric-blue)_15%,transparent),transparent_50%),linear-gradient(145deg,var(--card-surface-from),var(--card-surface-to))]',
  about:
    'bg-[radial-gradient(ellipse_75%_55%_at_25%_25%,color-mix(in_srgb,var(--electric-blue)_25%,transparent),transparent_55%),radial-gradient(ellipse_65%_50%_at_75%_75%,color-mix(in_srgb,var(--soft-cyan)_18%,transparent),transparent_50%),linear-gradient(145deg,var(--card-surface-from),var(--card-surface-to))]',
  stat: 'bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,color-mix(in_srgb,var(--soft-cyan)_25%,transparent),transparent_55%),radial-gradient(ellipse_60%_50%_at_20%_80%,color-mix(in_srgb,var(--electric-blue)_20%,transparent),transparent_50%),linear-gradient(145deg,var(--card-surface-from),var(--card-surface-to))]',
  experience:
    'bg-[radial-gradient(ellipse_75%_55%_at_70%_30%,color-mix(in_srgb,var(--electric-blue)_28%,transparent),transparent_55%),radial-gradient(ellipse_60%_50%_at_15%_75%,color-mix(in_srgb,var(--deep-purple)_18%,transparent),transparent_50%),linear-gradient(145deg,var(--card-surface-from),var(--card-surface-to))]',
  contact:
    'bg-[radial-gradient(ellipse_75%_55%_at_40%_25%,color-mix(in_srgb,var(--soft-cyan)_28%,transparent),transparent_55%),radial-gradient(ellipse_65%_50%_at_80%_80%,color-mix(in_srgb,var(--electric-blue)_20%,transparent),transparent_50%),linear-gradient(145deg,var(--card-surface-from),var(--card-surface-to))]',
  technology:
    'bg-[radial-gradient(ellipse_80%_60%_at_30%_20%,color-mix(in_srgb,var(--electric-blue)_30%,transparent),transparent_55%),radial-gradient(ellipse_70%_50%_at_85%_75%,color-mix(in_srgb,var(--soft-cyan)_20%,transparent),transparent_50%),linear-gradient(145deg,var(--card-surface-from),var(--card-surface-to))]',
  default:
    'bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,color-mix(in_srgb,var(--electric-blue)_22%,transparent),transparent_55%),radial-gradient(ellipse_60%_50%_at_80%_80%,color-mix(in_srgb,var(--deep-purple)_15%,transparent),transparent_50%),linear-gradient(145deg,var(--card-surface-from),var(--card-surface-to))]',
};

export function getCardGradient(key: CardGradientKey = 'default'): string {
  return cardGradients[key];
}
