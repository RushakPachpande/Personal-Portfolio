import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Prevents grid children from forcing horizontal page scroll on mobile. */
export const responsiveCardGridClassName =
  'grid min-w-0 auto-rows-fr grid-cols-1 gap-5 md:grid-cols-2 [&>*]:min-w-0';

export const responsiveCardGridCompactClassName =
  'grid min-w-0 auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 [&>*]:min-w-0';

export const responsiveCardGridThreeClassName =
  'grid min-w-0 auto-rows-fr grid-cols-1 gap-4 md:grid-cols-3 [&>*]:min-w-0';

/** Fills columns from a min card width so items wrap instead of stretching full-row.
 *  A direct child with `.featured-card-span` claims a full row on md+. */
export const responsiveCardGridAutoClassName =
  'grid min-w-0 auto-rows-fr [grid-template-columns:repeat(auto-fill,minmax(min(100%,18rem),1fr))] gap-5 md:[&>.featured-card-span]:col-span-full [&>*]:min-w-0';
