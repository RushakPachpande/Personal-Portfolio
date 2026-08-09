export type NavRoute = {
  to: string
  label: string
}

export type NavLinkItem = NavRoute & {
  type: 'link'
}

export type NavGroupItem = {
  type: 'group'
  label: string
  items: NavRoute[]
}

export type NavItem = NavLinkItem | NavGroupItem

export const navStructure: NavItem[] = [
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
]

export const navItems: NavRoute[] = navStructure.flatMap((item) =>
  item.type === 'link' ? [item] : item.items,
)

function isRouteActive(pathname: string, to: string) {
  return to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`)
}

export function isNavGroupActive(pathname: string, group: NavGroupItem) {
  return group.items.some((item) => isRouteActive(pathname, item.to))
}

export function isNavLinkActive(pathname: string, to: string) {
  return isRouteActive(pathname, to)
}
