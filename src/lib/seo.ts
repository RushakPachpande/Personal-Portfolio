export type PageMeta = {
  title: string;
  description: string;
  path?: string;
};

export function buildTitle(name: string, role: string, pageTitle?: string) {
  if (!pageTitle) return `${name} | ${role}`;
  return `${pageTitle} | ${name}`;
}

export function defaultDescription(description: string) {
  return description;
}
