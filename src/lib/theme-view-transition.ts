/**
 * Circular View Transition for theme switches.
 *
 * Adapted from react-theme-switch-animation
 * https://github.com/MinhOmega/react-theme-switch-animation
 *
 * MIT License
 * Copyright (c) 2024 Võ Ngọc Quang Minh
 */

import { flushSync } from 'react-dom';

const DURATION_MS = 500;
const EASING = 'linear';
const BASE_STYLE_ID = 'theme-switch-base-style';
const ANIM_STYLE_ID = 'theme-switch-vt';

type ViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
};

let inFlight = false;
let baseStylesInjected = false;

function injectBaseStyles() {
  if (baseStylesInjected || document.getElementById(BASE_STYLE_ID)) {
    baseStylesInjected = true;
    return;
  }

  const style = document.createElement('style');
  style.id = BASE_STYLE_ID;
  style.textContent = `
    ::view-transition-group(root),
    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation: none;
      mix-blend-mode: normal;
      backface-visibility: hidden;
      transform: translateZ(0);
    }
  `;
  document.head.appendChild(style);
  baseStylesInjected = true;
}

function removeAnimStyle() {
  document.getElementById(ANIM_STYLE_ID)?.remove();
}

function canAnimate(origin: HTMLElement | null) {
  return Boolean(
    origin &&
    typeof document.startViewTransition === 'function' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function applyHtmlClass(nextDark: boolean) {
  document.documentElement.classList.toggle('dark', nextDark);
}

export async function animateThemeTransition(
  origin: HTMLElement | null,
  nextDark: boolean,
  commitTheme: () => void
): Promise<void> {
  if (inFlight || !canAnimate(origin) || !origin) {
    if (!inFlight) {
      applyHtmlClass(nextDark);
      commitTheme();
    }
    return;
  }

  inFlight = true;
  injectBaseStyles();
  removeAnimStyle();

  const { top, left, width, height } = origin.getBoundingClientRect();
  const x = left + width / 2;
  const y = top + height / 2;
  const maxRadius = Math.max(
    Math.hypot(x, y),
    Math.hypot(window.innerWidth - x, y),
    Math.hypot(x, window.innerHeight - y),
    Math.hypot(window.innerWidth - x, window.innerHeight - y)
  );

  const style = document.createElement('style');
  style.id = ANIM_STYLE_ID;
  style.textContent = `
    ::view-transition-group(root) {
      animation: none;
    }

    ::view-transition-old(root),
    .dark::view-transition-old(root) {
      animation: none;
      z-index: -1;
    }

    ::view-transition-new(root) {
      animation: theme-switch-circle ${DURATION_MS}ms ${EASING} both;
    }

    @keyframes theme-switch-circle {
      from {
        clip-path: circle(0px at ${x}px ${y}px);
      }
      to {
        clip-path: circle(${maxRadius}px at ${x}px ${y}px);
      }
    }
  `;
  document.head.appendChild(style);

  try {
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        applyHtmlClass(nextDark);
      });
    }) as ViewTransition;
    await transition.ready;
    await transition.finished;
  } catch {
    applyHtmlClass(nextDark);
  }

  commitTheme();
  removeAnimStyle();
  inFlight = false;
}
