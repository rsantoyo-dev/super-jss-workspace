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
<svg width="100%" height="100%" viewBox="0 0 24 24" role="img" aria-label="Sun" xmlns="http://www.w3.org/2000/svg">
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
<svg width="100%" height="100%" viewBox="0 0 24 24" role="img" aria-label="Moon" xmlns="http://www.w3.org/2000/svg">
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

export const renderSuperJsonIcon = (options: SjIconRenderOptions = {}): string => {
  const fill = toColor(options.fill, defaultFill);
  const stroke = toColor(options.stroke, defaultStroke);
  const fillOpacity = toOpacity(options.fillOpacity, 0.15);
  const strokeOpacity = toOpacity(options.strokeOpacity, defaultStrokeOpacity);

  // Shield with a stylized J in the center
  return `
<svg width="100%" height="100%" viewBox="0 0 24 24" role="img" aria-label="Super JSON" xmlns="http://www.w3.org/2000/svg">
  <!-- Shield background -->
  <path d="M12 2 L19 6.5 V12.5 C19 16.2 16.5 19.2 12 21 C7.5 19.2 5 16.2 5 12.5 V6.5 Z"
        fill="${fill}" opacity="${fillOpacity}" stroke="${stroke}" stroke-opacity="${strokeOpacity}" stroke-width="1.5"/>
  <!-- Stylized J -->
  <path d="M14 6.75 V13.5 C14 15.5 12.5 17 10.5 17 H9"
        fill="none" stroke="${stroke}" stroke-opacity="${strokeOpacity}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
};

// ---- Common line icon helpers (24x24 viewBox) ----
const svgOpen = (label: string) =>
  `<svg width="100%" height="100%" viewBox="0 0 24 24" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">`;
const svgClose = `</svg>`;

// Basic stroke-only icon (no fill)
const strokeAttrs = (stroke: string, strokeOpacity: string) =>
  `fill="none" stroke="${stroke}" stroke-opacity="${strokeOpacity}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;

export const renderPlusIcon = (o: SjIconRenderOptions = {}): string => {
  const s = toColor(o.stroke, defaultStroke);
  const so = toOpacity(o.strokeOpacity, defaultStrokeOpacity);
  return `
${svgOpen('Plus')}
  <line x1="12" y1="5" x2="12" y2="19" ${strokeAttrs(s, so)} />
  <line x1="5" y1="12" x2="19" y2="12" ${strokeAttrs(s, so)} />
${svgClose}`;
};

export const renderMinusIcon = (o: SjIconRenderOptions = {}): string => {
  const s = toColor(o.stroke, defaultStroke);
  const so = toOpacity(o.strokeOpacity, defaultStrokeOpacity);
  return `
${svgOpen('Minus')}
  <line x1="5" y1="12" x2="19" y2="12" ${strokeAttrs(s, so)} />
${svgClose}`;
};

export const renderXIcon = (o: SjIconRenderOptions = {}): string => {
  const s = toColor(o.stroke, defaultStroke);
  const so = toOpacity(o.strokeOpacity, defaultStrokeOpacity);
  return `
${svgOpen('Close')}
  <line x1="5" y1="5" x2="19" y2="19" ${strokeAttrs(s, so)} />
  <line x1="19" y1="5" x2="5" y2="19" ${strokeAttrs(s, so)} />
${svgClose}`;
};

export const renderCheckIcon = (o: SjIconRenderOptions = {}): string => {
  const s = toColor(o.stroke, defaultStroke);
  const so = toOpacity(o.strokeOpacity, defaultStrokeOpacity);
  return `
${svgOpen('Check')}
  <polyline points="4 12 9 17 20 6" ${strokeAttrs(s, so)} />
${svgClose}`;
};

export const renderEditIcon = (o: SjIconRenderOptions = {}): string => {
  const s = toColor(o.stroke, defaultStroke);
  const so = toOpacity(o.strokeOpacity, defaultStrokeOpacity);
  return `
${svgOpen('Edit')}
  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" ${strokeAttrs(s, so)} />
  <path d="M14.06 6.19l1.77-1.77a1.5 1.5 0 1 1 2.12 2.12l-1.77 1.77" ${strokeAttrs(s, so)} />
${svgClose}`;
};

export const renderTrashIcon = (o: SjIconRenderOptions = {}): string => {
  const s = toColor(o.stroke, defaultStroke);
  const so = toOpacity(o.strokeOpacity, defaultStrokeOpacity);
  return `
${svgOpen('Trash')}
  <polyline points="3 7 21 7" ${strokeAttrs(s, so)} />
  <path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" ${strokeAttrs(s, so)} />
  <path d="M9 7V4h6v3" ${strokeAttrs(s, so)} />
${svgClose}`;
};

export const renderDownloadIcon = (o: SjIconRenderOptions = {}): string => {
  const s = toColor(o.stroke, defaultStroke);
  const so = toOpacity(o.strokeOpacity, defaultStrokeOpacity);
  return `
${svgOpen('Download')}
  <path d="M12 3v12" ${strokeAttrs(s, so)} />
  <polyline points="8 11 12 15 16 11" ${strokeAttrs(s, so)} />
  <path d="M5 19h14" ${strokeAttrs(s, so)} />
${svgClose}`;
};

export const renderUploadIcon = (o: SjIconRenderOptions = {}): string => {
  const s = toColor(o.stroke, defaultStroke);
  const so = toOpacity(o.strokeOpacity, defaultStrokeOpacity);
  return `
${svgOpen('Upload')}
  <path d="M12 21V9" ${strokeAttrs(s, so)} />
  <polyline points="8 13 12 9 16 13" ${strokeAttrs(s, so)} />
  <path d="M5 5h14" ${strokeAttrs(s, so)} />
${svgClose}`;
};

export const renderRefreshIcon = (o: SjIconRenderOptions = {}): string => {
  const s = toColor(o.stroke, defaultStroke);
  const so = toOpacity(o.strokeOpacity, defaultStrokeOpacity);
  return `
${svgOpen('Refresh')}
  <path d="M20 12a8 8 0 1 1-8-8" ${strokeAttrs(s, so)} />
  <polyline points="20 4 20 12 12 12" ${strokeAttrs(s, so)} />
${svgClose}`;
};

export const renderExternalLinkIcon = (o: SjIconRenderOptions = {}): string => {
  const s = toColor(o.stroke, defaultStroke);
  const so = toOpacity(o.strokeOpacity, defaultStrokeOpacity);
  return `
${svgOpen('External link')}
  <path d="M14 3h7v7" ${strokeAttrs(s, so)} />
  <path d="M10 14L21 3" ${strokeAttrs(s, so)} />
  <path d="M21 14v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" ${strokeAttrs(s, so)} />
${svgClose}`;
};

export const renderLinkIcon = (o: SjIconRenderOptions = {}): string => {
  const s = toColor(o.stroke, defaultStroke);
  const so = toOpacity(o.strokeOpacity, defaultStrokeOpacity);
  return `
${svgOpen('Link')}
  <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" ${strokeAttrs(s, so)} />
  <path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1" ${strokeAttrs(s, so)} />
${svgClose}`;
};

const arrow = (lbl: string, pts: string) => (o: SjIconRenderOptions = {}) => {
  const s = toColor(o.stroke, defaultStroke);
  const so = toOpacity(o.strokeOpacity, defaultStrokeOpacity);
  return `
${svgOpen(lbl)}
  <polyline points="${pts}" ${strokeAttrs(s, so)} />
${svgClose}`;
};

export const renderArrowLeftIcon = arrow('Arrow left', '15 6 9 12 15 18');
export const renderArrowRightIcon = arrow('Arrow right', '9 6 15 12 9 18');
export const renderArrowUpIcon = arrow('Arrow up', '6 15 12 9 18 15');
export const renderArrowDownIcon = arrow('Arrow down', '6 9 12 15 18 9');

export const renderChevronLeftIcon = arrow('Chevron left', '14 6 8 12 14 18');
export const renderChevronRightIcon = arrow('Chevron right', '10 6 16 12 10 18');
export const renderChevronUpIcon = arrow('Chevron up', '6 14 12 8 18 14');
export const renderChevronDownIcon = arrow('Chevron down', '6 10 12 16 18 10');

export const renderMenuIcon = (o: SjIconRenderOptions = {}) => {
  const s = toColor(o.stroke, defaultStroke);
  const so = toOpacity(o.strokeOpacity, defaultStrokeOpacity);
  return `
${svgOpen('Menu')}
  <line x1="4" y1="6" x2="20" y2="6" ${strokeAttrs(s, so)} />
  <line x1="4" y1="12" x2="20" y2="12" ${strokeAttrs(s, so)} />
  <line x1="4" y1="18" x2="20" y2="18" ${strokeAttrs(s, so)} />
${svgClose}`;
};

export const renderSearchIcon = (o: SjIconRenderOptions = {}) => {
  const s = toColor(o.stroke, defaultStroke);
  const so = toOpacity(o.strokeOpacity, defaultStrokeOpacity);
  return `
${svgOpen('Search')}
  <circle cx="11" cy="11" r="6" ${strokeAttrs(s, so)} />
  <line x1="16.5" y1="16.5" x2="21" y2="21" ${strokeAttrs(s, so)} />
${svgClose}`;
};

export const renderFilterIcon = (o: SjIconRenderOptions = {}) => {
  const s = toColor(o.stroke, defaultStroke);
  const so = toOpacity(o.strokeOpacity, defaultStrokeOpacity);
  return `
${svgOpen('Filter')}
  <path d="M3 5h18l-7 7v5l-4 2v-7L3 5z" ${strokeAttrs(s, so)} />
${svgClose}`;
};

export const renderListIcon = (o: SjIconRenderOptions = {}) => {
  const s = toColor(o.stroke, defaultStroke);
  const so = toOpacity(o.strokeOpacity, defaultStrokeOpacity);
  return `
${svgOpen('List')}
  <line x1="8" y1="6" x2="20" y2="6" ${strokeAttrs(s, so)} />
  <line x1="8" y1="12" x2="20" y2="12" ${strokeAttrs(s, so)} />
  <line x1="8" y1="18" x2="20" y2="18" ${strokeAttrs(s, so)} />
  <circle cx="5" cy="6" r="1" fill="${s}" stroke="${s}" stroke-opacity="${so}" />
  <circle cx="5" cy="12" r="1" fill="${s}" stroke="${s}" stroke-opacity="${so}" />
  <circle cx="5" cy="18" r="1" fill="${s}" stroke="${s}" stroke-opacity="${so}" />
${svgClose}`;
};

export const renderGridIcon = (o: SjIconRenderOptions = {}) => {
  const s = toColor(o.stroke, defaultStroke);
  const so = toOpacity(o.strokeOpacity, defaultStrokeOpacity);
  return `
${svgOpen('Grid')}
  <rect x="4" y="4" width="7" height="7" ${strokeAttrs(s, so)} />
  <rect x="13" y="4" width="7" height="7" ${strokeAttrs(s, so)} />
  <rect x="4" y="13" width="7" height="7" ${strokeAttrs(s, so)} />
  <rect x="13" y="13" width="7" height="7" ${strokeAttrs(s, so)} />
${svgClose}`;
};

export const renderMoreHorizontalIcon = (o: SjIconRenderOptions = {}) => {
  const s = toColor(o.stroke, defaultStroke);
  const so = toOpacity(o.strokeOpacity, defaultStrokeOpacity);
  return `
${svgOpen('More horizontal')}
  <circle cx="6" cy="12" r="1" fill="${s}" stroke="${s}" stroke-opacity="${so}" />
  <circle cx="12" cy="12" r="1" fill="${s}" stroke="${s}" stroke-opacity="${so}" />
  <circle cx="18" cy="12" r="1" fill="${s}" stroke="${s}" stroke-opacity="${so}" />
${svgClose}`;
};

export const renderMoreVerticalIcon = (o: SjIconRenderOptions = {}) => {
  const s = toColor(o.stroke, defaultStroke);
  const so = toOpacity(o.strokeOpacity, defaultStrokeOpacity);
  return `
${svgOpen('More vertical')}
  <circle cx="12" cy="6" r="1" fill="${s}" stroke="${s}" stroke-opacity="${so}" />
  <circle cx="12" cy="12" r="1" fill="${s}" stroke="${s}" stroke-opacity="${so}" />
  <circle cx="12" cy="18" r="1" fill="${s}" stroke="${s}" stroke-opacity="${so}" />
${svgClose}`;
};
