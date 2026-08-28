const LAST_LOAD_KEY = 'portfolio-last-load';
const STALE_MS = 30 * 60 * 1000;

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function navigationEntry() {
  const entries = performance.getEntriesByType('navigation');
  return entries[0] as PerformanceNavigationTiming | undefined;
}

function isHardReload() {
  const nav = navigationEntry();
  if (!nav || nav.type !== 'reload') {
    return false;
  }
  return nav.transferSize > 0;
}

function isBackForward() {
  return navigationEntry()?.type === 'back_forward';
}

function lastLoadAt() {
  const raw = localStorage.getItem(LAST_LOAD_KEY);
  if (!raw) {
    return null;
  }
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

export function shouldShowBootSequence() {
  if (prefersReducedMotion()) {
    return false;
  }
  if (isBackForward()) {
    return false;
  }
  if (isHardReload()) {
    return true;
  }
  const last = lastLoadAt();
  if (last === null) {
    return true;
  }
  return Date.now() - last >= STALE_MS;
}

export function rememberDocumentLoad() {
  localStorage.setItem(LAST_LOAD_KEY, String(Date.now()));
}
