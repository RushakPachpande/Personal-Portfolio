export function joinMediaPath(prefix: string, name: string) {
  return prefix ? `${prefix.replace(/\/$/, '')}/${name}` : name;
}

export function isStorageFolder(item: {
  id: string | null;
  metadata: Record<string, unknown> | null;
}) {
  return item.metadata == null;
}

export function isImageFileName(name: string) {
  return /\.(avif|bmp|gif|jpe?g|png|svg|webp)$/i.test(name);
}
