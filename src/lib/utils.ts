import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Prevents grid children from forcing horizontal page scroll on mobile. */
export const responsiveCardGridClassName =
  'grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 [&>*]:min-w-0'

export const responsiveCardGridCompactClassName =
  'grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 [&>*]:min-w-0'

export const responsiveCardGridThreeClassName =
  'grid min-w-0 grid-cols-1 gap-4 md:grid-cols-3 [&>*]:min-w-0'
