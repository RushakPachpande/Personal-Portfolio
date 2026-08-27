export function moveItem<T>(items: T[], from: number, to: number) {
  if (to < 0 || to >= items.length) return items;
  const next = [...items];
  const [removed] = next.splice(from, 1);
  if (!removed) return items;
  next.splice(to, 0, removed);
  return next;
}
