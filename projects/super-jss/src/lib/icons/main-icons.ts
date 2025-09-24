export interface SjIconRenderOptions {
  fill?: string;
  stroke?: string;
  fillOpacity?: number;
  strokeOpacity?: number;
}

const defaultFill = 'currentColor';
const defaultStroke = 'currentColor';
const defaultFillOpacity = 0.6;
const defaultStrokeOpacity = 1;

const toOpacity = (value: number | undefined, fallback: number): string =>
  (value ?? fallback).toString();

const toColor = (value: string | undefined, fallback: string): string =>
  value ?? fallback;

export const renderSunIcon = (options: SjIconRenderOptions = {}): string => {
  const fill = toColor(options.fill, defaultFill);
  const stroke = toColor(options.stroke, defaultStroke);
  const fillOpacity = toOpacity(options.fillOpacity, defaultFillOpacity);
  const strokeOpacity = toOpacity(options.strokeOpacity, defaultStrokeOpacity);

  return `
<svg width="24" height="24" viewBox="0 0 24 24" role="img" aria-label="Sun" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="5" fill="${fill}" opacity="${fillOpacity}"></circle>
  <g fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="${strokeOpacity}">
    <line x1="12" y1="2" x2="12" y2="5"></line>
    <line x1="12" y1="19" x2="12" y2="22"></line>
    <line x1="2" y1="12" x2="5" y2="12"></line>
    <line x1="19" y1="12" x2="22" y2="12"></line>
    <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"></line>
    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"></line>
    <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"></line>
    <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"></line>
  </g>
</svg>
`;
};

export const renderMoonIcon = (options: SjIconRenderOptions = {}): string => {
  const fill = toColor(options.fill, defaultFill);
  const fillOpacity = toOpacity(options.fillOpacity, defaultFillOpacity);

  return `
<svg width="24" height="24" viewBox="0 0 24 24" role="img" aria-label="Moon" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <mask id="sj-icon-moon-crescent">
      <rect width="24" height="24" fill="#fff"></rect>
      <circle cx="15" cy="9" r="8" fill="#000"></circle>
    </mask>
  </defs>
  <circle cx="12" cy="12" r="9" fill="${fill}" opacity="${fillOpacity}" mask="url(#sj-icon-moon-crescent)"></circle>
</svg>
`;
};
