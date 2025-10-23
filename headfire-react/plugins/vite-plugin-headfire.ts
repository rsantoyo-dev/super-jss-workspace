import type { Plugin } from 'vite'
import fs from 'fs'

export default function headfireVite(): Plugin {
  let root = process.cwd().replace(/\\/g, '/')
  return {
    name: 'headfire-vite-dsl',
    enforce: 'pre',
    configResolved(cfg) {
      if (cfg.root) root = cfg.root.replace(/\\/g, '/')
    },
    load(id) {
      const file = id.split('?')[0]
      if (!file.endsWith('.hf.css')) return null
      try {
        const css = fs.readFileSync(file, 'utf-8')
        const cssJSON = JSON.stringify(css)
        const key = JSON.stringify(file.replace(/\\/g, '/'))
        const js = `// Inject Headfire DSL style for ${file} and trigger recompile\n`+
`(function(){\n  const css = ${cssJSON};\n  const attr = ${key};\n  // Replace any existing style for this source\n  const prev = document.querySelector('style[data-headfire-src="'+attr+'"]');\n  if (prev) { try { document.head.removeChild(prev) } catch {} }\n  const style = document.createElement('style');\n  style.setAttribute('data-headfire','');\n  style.setAttribute('data-headfire-src', attr);\n  style.textContent = css;\n  document.head.appendChild(style);\n  // Try immediate recompile; fallback after DOM ready\n  if (!(window).Headfire?.recompile) {\n    document.addEventListener('DOMContentLoaded', ()=> (window).Headfire?.recompile?.(), { once: true });\n  } else { (window).Headfire?.recompile?.() }\n  if (import.meta.hot) {\n    import.meta.hot.accept();\n    import.meta.hot.dispose(() => { try { document.head.removeChild(style); (window).Headfire?.recompile?.(); } catch {} });\n  }\n})();\nexport default true;`
        return js
      } catch { return null }
    },
  }
}
