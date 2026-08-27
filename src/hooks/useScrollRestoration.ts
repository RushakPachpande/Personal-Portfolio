import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const scrollCache = new Map<string, number>();

function restoreScroll(pathname: string) {
  const y = scrollCache.get(pathname) ?? 0;
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  window.scrollTo(0, y);
  root.style.scrollBehavior = previous;
}

export function useScrollRestoration() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    return () => {
      scrollCache.set(pathname, window.scrollY);
    };
  }, [pathname]);

  useLayoutEffect(() => {
    restoreScroll(pathname);
  }, [pathname]);

  useEffect(() => {
    const saved = scrollCache.get(pathname) ?? 0;
    if (saved <= 0) return;

    const frame = window.requestAnimationFrame(() => {
      restoreScroll(pathname);
    });

    const timeout = window.setTimeout(() => {
      restoreScroll(pathname);
    }, 120);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [pathname]);
}

export function rememberScrollPosition(pathname: string, y = window.scrollY) {
  scrollCache.set(pathname, y);
}
