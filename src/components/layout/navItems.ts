import type { NavItem, NavGroupItem, NavRoute } from '@/types/site-config';

export type { NavRoute, NavLinkItem, NavGroupItem, NavItem } from '@/types/site-config';

/** Fallback nav when site config has not loaded yet. */
export const defaultNavStructure: NavItem[] = [
  { type: 'link', to: '/', label: 'Home' },
  {
    type: 'group',
    label: 'Work',
    items: [
      { to: '/platforms', label: 'Platforms' },
      { to: '/infrastructure', label: 'Infrastructure' },
      { to: '/automation', label: 'Automation' },
      { to: '/technology-library', label: 'Technology Library' },
    ],
  },
  {
    type: 'group',
    label: 'Profile',
    items: [
      { to: '/about', label: 'About' },
      { to: '/philosophy', label: 'Philosophy' },
      { to: '/experience', label: 'Experience' },
      { to: '/resume', label: 'Resume' },
    ],
  },
  { type: 'link', to: '/contact', label: 'Contact' },
];

/** @deprecated Prefer siteConfig.nav from portfolio data. */
export const navStructure = defaultNavStructure;

export const navItems: NavRoute[] = defaultNavStructure.flatMap((item) =>
  item.type === 'link' ? [item] : item.items
);

export function flattenNav(structure: NavItem[]): NavRoute[] {
  return structure.flatMap((item) =>
    item.type === 'link' ? [item] : item.items
  );
}

function isRouteActive(pathname: string, to: string) {
  return to === '/'
    ? pathname === '/'
    : pathname === to || pathname.startsWith(`${to}/`);
}

export function isNavGroupActive(pathname: string, group: NavGroupItem) {
  return group.items.some((item) => isRouteActive(pathname, item.to));
}

export function isNavLinkActive(pathname: string, to: string) {
  return isRouteActive(pathname, to);
}
