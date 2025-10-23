// Minimal theming helper: sets CSS custom properties on :root.
export function applyTheme(vars) {
  const root = document.documentElement;
  if (!vars || typeof vars !== 'object') return;
  for (const k in vars) {
    if (!Object.prototype.hasOwnProperty.call(vars, k)) continue;
    root.style.setProperty(`--${k}`, String(vars[k]));
  }
}

