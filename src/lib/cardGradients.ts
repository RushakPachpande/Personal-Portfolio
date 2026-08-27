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
    'bg-[radial-gradient(ellipse_80%_60%_at_20%_20%,rgba(59,130,246,0.35),transparent_55%),radial-gradient(ellipse_70%_50%_at_80%_80%,rgba(34,211,238,0.2),transparent_50%),linear-gradient(145deg,rgba(17,24,39,0.95),rgba(11,18,36,0.98))]',
  infrastructure:
    'bg-[radial-gradient(ellipse_80%_60%_at_75%_25%,rgba(124,58,237,0.32),transparent_55%),radial-gradient(ellipse_60%_50%_at_20%_80%,rgba(59,130,246,0.18),transparent_50%),linear-gradient(145deg,rgba(17,24,39,0.95),rgba(11,18,36,0.98))]',
  automation:
    'bg-[radial-gradient(ellipse_80%_60%_at_30%_30%,rgba(34,211,238,0.28),transparent_55%),radial-gradient(ellipse_70%_50%_at_85%_70%,rgba(124,58,237,0.22),transparent_50%),linear-gradient(145deg,rgba(17,24,39,0.95),rgba(11,18,36,0.98))]',
  philosophy:
    'bg-[radial-gradient(ellipse_70%_55%_at_50%_20%,rgba(124,58,237,0.28),transparent_55%),radial-gradient(ellipse_60%_45%_at_80%_85%,rgba(59,130,246,0.15),transparent_50%),linear-gradient(145deg,rgba(17,24,39,0.95),rgba(11,18,36,0.98))]',
  about:
    'bg-[radial-gradient(ellipse_75%_55%_at_25%_25%,rgba(59,130,246,0.25),transparent_55%),radial-gradient(ellipse_65%_50%_at_75%_75%,rgba(34,211,238,0.18),transparent_50%),linear-gradient(145deg,rgba(17,24,39,0.95),rgba(11,18,36,0.98))]',
  stat: 'bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(34,211,238,0.25),transparent_55%),radial-gradient(ellipse_60%_50%_at_20%_80%,rgba(59,130,246,0.2),transparent_50%),linear-gradient(145deg,rgba(17,24,39,0.95),rgba(11,18,36,0.98))]',
  experience:
    'bg-[radial-gradient(ellipse_75%_55%_at_70%_30%,rgba(59,130,246,0.28),transparent_55%),radial-gradient(ellipse_60%_50%_at_15%_75%,rgba(124,58,237,0.18),transparent_50%),linear-gradient(145deg,rgba(17,24,39,0.95),rgba(11,18,36,0.98))]',
  contact:
    'bg-[radial-gradient(ellipse_75%_55%_at_40%_25%,rgba(34,211,238,0.28),transparent_55%),radial-gradient(ellipse_65%_50%_at_80%_80%,rgba(59,130,246,0.2),transparent_50%),linear-gradient(145deg,rgba(17,24,39,0.95),rgba(11,18,36,0.98))]',
  technology:
    'bg-[radial-gradient(ellipse_80%_60%_at_30%_20%,rgba(59,130,246,0.3),transparent_55%),radial-gradient(ellipse_70%_50%_at_85%_75%,rgba(34,211,238,0.2),transparent_50%),linear-gradient(145deg,rgba(17,24,39,0.95),rgba(11,18,36,0.98))]',
  default:
    'bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(59,130,246,0.22),transparent_55%),radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(124,58,237,0.15),transparent_50%),linear-gradient(145deg,rgba(17,24,39,0.95),rgba(11,18,36,0.98))]',
};

export function getCardGradient(key: CardGradientKey = 'default'): string {
  return cardGradients[key];
}
