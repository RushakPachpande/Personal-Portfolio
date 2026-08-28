import nerdRegular from '@/assets/fonts/jetbrains-mono-nerd/JetBrainsMonoNerdFont-Regular.ttf';
import nerdMedium from '@/assets/fonts/jetbrains-mono-nerd/JetBrainsMonoNerdFont-Medium.ttf';

let injected = false;

export function ensureNerdFont() {
  if (injected || document.getElementById('nerd-font-face')) return;
  injected = true;

  const style = document.createElement('style');
  style.id = 'nerd-font-face';
  style.textContent = `
@font-face {
  font-family: 'JetBrainsMono Nerd Font';
  src: url('${nerdRegular}') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'JetBrainsMono Nerd Font';
  src: url('${nerdMedium}') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
`;
  document.head.appendChild(style);
}
